import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import MongoClient from "mongodb";
const auth: Object = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPassword
};

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      let puppy = ({ id: Number, name: String, saying: String } = req.body);
      var db = database.db("admin");
      db.collection("Puppies").insertOne(
        {
          id: puppy.id,
          name: puppy.name,
          saying: puppy.saying
        },
        (err, result) => {
          if (err) throw err;
          context.res = {
            body: puppy
          };
          database.close();
          context.done();
        }
      );
    }
  );
};

export default httpTrigger;
