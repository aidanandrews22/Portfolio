import https from 'https';

const CORRECT_PASSWORD = process.env.CORRECT_PASSWORD;

const CONTENT_REPO = 'aidanandrews22/website-data';

export const handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let content, title, category, password, contentId, contentType;

    try {
        if (event.httpMethod) {
            if (event.httpMethod !== 'POST') {
                return formatResponse(405, { error: "Method Not Allowed" });
            }
            ({ content, title, category, password, contentId, contentType } = JSON.parse(event.body));
        } else {
            ({ content, title, category, password, contentId, contentType } = event);
        }

        if (!contentType) {
            throw new Error('Content type is undefined');
        }

        console.log('Parsed content, title, category, password, contentId, and contentType:', { content, title, category, password: '******', contentId, contentType });

        // Verify the password
        if (password !== CORRECT_PASSWORD) {
            console.log('Incorrect password provided');
            return formatResponse(401, { error: "Unauthorized: Incorrect password" });
        }

        if (!contentId) {
            contentId = `${contentType}${Date.now()}`;
        }

        console.log(`Attempting to save ${contentType} content`);
        try {
            await createOrUpdateFile(`content/${contentType}s/${contentId}.md`, content, `Update ${contentType}: ${title}`);
            console.log(`${contentType} content saved successfully`);
        } catch (error) {
            console.error(`Error saving ${contentType} content:`, error);
            throw new Error(`Failed to save ${contentType} content: ${error.message}`);
        }

        console.log(`Attempting to update ${contentType}s.json`);
        try {
            const jsonFile = await getFileContent(`content/${contentType}s.json`);
            console.log(`Retrieved ${contentType}s.json content:`, jsonFile);
            let jsonContent = JSON.parse(Buffer.from(jsonFile.content, 'base64').toString());
            console.log(`Parsed ${contentType}s.json content:`, jsonContent);

            const existingItemIndex = jsonContent.findIndex(item => item.id === contentId);
            if (existingItemIndex !== -1) {
                // Update existing item
                jsonContent[existingItemIndex] = {
                    ...jsonContent[existingItemIndex],
                    title: title,
                    category: category,
                    date: new Date().toISOString().split('T')[0]
                };
            } else {
                // Add new item
                jsonContent.push({
                    id: contentId,
                    title: title,
                    category: category,
                    date: new Date().toISOString().split('T')[0]
                });
            }

            await createOrUpdateFile(`content/${contentType}s.json`, JSON.stringify(jsonContent, null, 2), `Update ${contentType}s.json for ${contentType}: ${title}`);
            console.log(`${contentType}s.json updated successfully`);
        } catch (error) {
            console.error(`Error updating ${contentType}s.json:`, error);
            throw new Error(`Failed to update ${contentType}s.json: ${error.message}`);
        }

        return formatResponse(200, { message: `${contentType} saved successfully` });
    } catch (error) {
        console.error('Error in Lambda function:', error);
        return formatResponse(500, { 
            error: `Failed to save ${contentType}`, 
            details: error.message, 
            stack: error.stack,
            event: JSON.stringify(event)
        });
    }
};

function formatResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        body: JSON.stringify(body)
    };
}

async function createOrUpdateFile(path, content, commitMessage) {
    console.log(`Creating/Updating file: ${path}`);
    const options = {
        hostname: 'api.github.com',
        path: `/repos/${CONTENT_REPO}/contents/${path}`,
        method: 'PUT',
        headers: {
            'User-Agent': 'AWS Lambda Function',
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        }
    };

    let sha;
    try {
        const existingFile = await getFileContent(path);
        sha = existingFile.sha;
        console.log(`Existing file found. SHA: ${sha}`);
    } catch (error) {
        console.log(`File ${path} does not exist yet. Creating new file.`);
    }

    const requestBody = JSON.stringify({
        message: commitMessage,
        content: Buffer.from(content).toString('base64'),
        sha: sha // This will be undefined for new files, which is correct
    });

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 201) {
                    console.log(`File ${path} created/updated successfully`);
                    resolve(JSON.parse(data));
                } else {
                    console.error(`GitHub API responded with status code ${res.statusCode} for ${path}. Response: ${data}`);
                    reject(new Error(`GitHub API responded with status code ${res.statusCode}. Response: ${data}`));
                }
            });
        });

        req.on('error', (error) => {
            console.error(`Error in HTTPS request for ${path}:`, error);
            reject(new Error(`HTTPS request failed: ${error.message}`));
        });

        console.log(`Request body for ${path}:`, requestBody);
        req.write(requestBody);
        req.end();
    });
}

async function getFileContent(path) {
    console.log(`Getting file content: ${path}`);
    const options = {
        hostname: 'api.github.com',
        path: `/repos/${CONTENT_REPO}/contents/${path}`,
        method: 'GET',
        headers: {
            'User-Agent': 'AWS Lambda Function',
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const fileData = JSON.parse(data);
                    console.log(`File ${path} retrieved successfully`);
                    resolve(fileData);
                } else if (res.statusCode === 404) {
                    console.log(`File ${path} not found. Returning empty content.`);
                    resolve({ content: Buffer.from('[]').toString('base64') });
                } else {
                    console.error(`GitHub API responded with status code ${res.statusCode} for ${path}. Response: ${data}`);
                    reject(`GitHub API responded with status code ${res.statusCode}. Response: ${data}`);
                }
            });
        });

        req.on('error', (error) => {
            console.error(`Error in HTTPS request for ${path}:`, error);
            reject(error);
        });
        req.end();
    });
}