import { s3, lambda } from '../App';

const BUCKET_NAME = 'aidanandrews-content';

export const fetchAllData = async () => {
  try {
    const [postsResponse, notesResponse] = await Promise.all([
      s3.getObject({ Bucket: BUCKET_NAME, Key: 'content/posts.json' }).promise(),
      s3.getObject({ Bucket: BUCKET_NAME, Key: 'content/notes.json' }).promise()
    ]);

    const posts = JSON.parse(postsResponse.Body.toString());
    const notes = JSON.parse(notesResponse.Body.toString());

    return { posts, notes };
  } catch (error) {
    console.error('Error fetching data from S3:', error);
    throw new Error('Failed to fetch data');
  }
};

export const fetchContent = async (contentType, contentId) => {
  try {
    const response = await s3.getObject({
      Bucket: BUCKET_NAME,
      Key: `content/${contentType}s/${contentId}.md`
    }).promise();

    return response.Body.toString();
  } catch (error) {
    console.error(`Error fetching ${contentType} from S3:`, error);
    throw new Error(`Failed to fetch ${contentType}`);
  }
};

export const saveContent = async (contentType, contentId, content, title, category, password) => {
  console.log('Attempting to save content...');
  try {
    const payload = {
      content,
      title,
      category,
      password,
      contentId,
      contentType
    };
    console.log('Lambda payload:', JSON.stringify(payload, null, 2));

    const response = await lambda.invoke({
      FunctionName: 'arn:aws:lambda:us-east-1:387060174954:function:saveContentFunction',
      Payload: JSON.stringify(payload),
      InvocationType: 'RequestResponse'
    }).promise();

    console.log('Raw Lambda response:', JSON.stringify(response, null, 2));

    if (response.FunctionError) {
      throw new Error(`Lambda execution failed: ${response.FunctionError}`);
    }

    const result = JSON.parse(response.Payload);
    console.log('Parsed Lambda result:', result);

    if (result.statusCode !== 200) {
      const errorBody = JSON.parse(result.body);
      throw new Error(errorBody.error || 'An unknown error occurred');
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving content:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error(`Failed to save ${contentType}: ${error.message}`);
  }
};