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

  const puppyId = ({ id } = req.params);

  const db = mongo.db("admin");

  const puppy = await db.collection("Puppies").deleteOne({ id: puppyId.id });

  context.res = {
    body: puppy.result.ok === 1 ? "Deleted Successfully" : "Error Occurred"
  };

  context.done();
};

export default httpTrigger;
