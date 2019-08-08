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
      console.log("Connected Successufully");
      var db = database.db("admin");
      db.collection("Puppies")
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          context.log("This is a happy moment!");
          result.forEach(puppy => delete puppy._id);
          context.res = {
            //status 200
            body: result
          };
          database.close();
          context.done();
        });
    }
  );
};

export default httpTrigger;
