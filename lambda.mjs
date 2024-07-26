// Lambda function (saveNoteFunction)
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const CORRECT_PASSWORD = process.env.CORRECT_PASSWORD;
const BUCKET_NAME = 'aidanandrews-content';

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const { content, title, category, password, contentId, contentType } = JSON.parse(event.body);

    if (password !== CORRECT_PASSWORD) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: "Unauthorized: Incorrect password" })
        };
    }

    const key = `content/${contentType}s/${contentId || `${contentType}${Date.now()}`}.md`;

    try {
        // Save the content
        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: content,
            ContentType: 'text/markdown'
        }).promise();

        // Update the index file (posts.json or notes.json)
        const indexKey = `content/${contentType}s.json`;
        const indexData = await s3.getObject({ Bucket: BUCKET_NAME, Key: indexKey }).promise();
        let index = JSON.parse(indexData.Body.toString());

        const newItem = {
            id: contentId || `${contentType}${Date.now()}`,
            title,
            category,
            date: new Date().toISOString().split('T')[0]
        };

        const existingItemIndex = index.findIndex(item => item.id === newItem.id);
        if (existingItemIndex !== -1) {
            index[existingItemIndex] = newItem;
        } else {
            index.push(newItem);
        }

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: indexKey,
            Body: JSON.stringify(index, null, 2),
            ContentType: 'application/json'
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Content saved successfully" })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to save content" })
        };
    }
};