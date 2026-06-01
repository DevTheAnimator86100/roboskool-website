const { MongoClient } = require("mongodb");

// We keep the cache empty at first
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  // 1. GRAB PASSWORD AT RUNTIME (This fixes your error!)
  const uri =
    "mongodb+srv://devgamerz1111_db_user:Roboskool2026@roboskool.waimvni.mongodb.net/?appName=RoboSkool";

  // 2. Failsafe just in case Netlify still can't find it
  if (!uri) {
    throw new Error(
      "Wait! The MongoDB password is missing from Netlify Environment Variables.",
    );
  }

  // 3. Connect and save to cache
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const databaseClient = await connectToDatabase();

    const db = databaseClient.db("roboskool_db");
    const collection = db.collection("contact_submissions");

    const result = await collection.insertOne({
      ...data,
      submittedAt: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data secured in MongoDB!",
        id: result.insertedId,
      }),
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save data to the cloud." }),
    };
  }
};
