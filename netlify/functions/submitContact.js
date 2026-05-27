const { MongoClient } = require("mongodb");

// This tells the file to look for your secret link when it's online
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// We use a cached connection so it runs lightning fast
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  await client.connect();
  cachedClient = client;
  return client;
}

exports.handler = async (event, context) => {
  // Only allow POST requests (when the form is submitted)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const databaseClient = await connectToDatabase();

    // This creates a database called 'roboskool_db' and a folder inside called 'contact_submissions'
    const db = databaseClient.db("roboskool_db");
    const collection = db.collection("contact_submissions");

    // Save the data to the cloud!
    const result = await collection.insertOne({
      ...data,
      submittedAt: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data successfully saved!",
        id: result.insertedId,
      }),
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save data." }),
    };
  }
};
