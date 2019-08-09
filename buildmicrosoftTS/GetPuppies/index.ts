import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const MongoClient = require("mongodb");
const auth: Object = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPassword
};

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const mongo = await MongoClient.connect(process.env.CosmosDBURL, {
    useNewUrlParser: true
  });

  const db = mongo.db("admin");
  const puppies = await db
    .collection("Puppies")
    .find()
    .toArray();

  puppies.forEach(e => {
    delete e._id;
  });
  context.res = {
    //status 200
    body: puppies
  };
  // db.close();
  context.done();

  // context.log("HTTP trigger function processed a request.");
  // await MongoClient.connect(
  //   process.env.CosmosDBURL2,
  //   { useNewUrlParser: true },
  //   async (err, database) => {
  //     if (err) throw err;
  //     console.log("Connected Successufully");
  //     var db = database.db("admin");
  //     const puppies = await db
  //       .collection("Puppies")
  //       .find()
  //       .toArray((err, result) => {
  //         if (err) throw err;
  //         context.log("This is a happy moment!");
  //         result.forEach(puppy => delete puppy._id);
  //       });
  //     context.res = {
  //       //status 200
  //       body: puppies
  //     };
  //     database.close();
  //     context.done();
  //   }
  // );
};

export default httpTrigger;
