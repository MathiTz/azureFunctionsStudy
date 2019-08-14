import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const MongoClient = require("mongodb");

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const mongo = await MongoClient.connect(process.env.CosmosDBURL, {
    useNewUrlParser: true
  });

  let id: String;

  let name: String;

  let saying: String;

  const puppyId = ({ id } = req.params);

  const puppyStats = ({ id, name, saying } = req.body);

  const db = mongo.db("admin");

  const puppy = await db.collection("Puppies").updateOne(
    { id: puppyId.id },
    {
      $set: {
        id: puppyStats.id,
        name: puppyStats.name,
        saying: puppyStats.saying
      }
    }
  );

  context.res = {
    body: puppy.result.ok === 1 ? "Updated Successfully" : "Error Occurred"
  };

  context.done();
};

export default httpTrigger;
