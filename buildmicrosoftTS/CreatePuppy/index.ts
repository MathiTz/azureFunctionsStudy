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
  const puppy = await db.collection("Puppies").insertOne({
    id: req.body.id,
    name: req.body.name,
    saying: req.body.saying
  });

  context.res = {
    body: puppy.ops
  };

  // db.close();
  context.done();

  // MongoClient.connect(
  //   process.env.CosmosDBURL,
  //   { auth: auth },
  //   (err, database) => {
  //     if (err) throw err;
  //     let puppy = ({ id: String, name: String, saying: String } = req.body);
  //     var db = database.db("admin");
  //     db.collection("Puppies").insertOne(
  //       {
  //         id: puppy.id,
  //         name: puppy.name,
  //         saying: puppy.saying
  //       },
  //       (err, result) => {
  //         if (err) throw err;
  //         context.res = {
  //           body: puppy
  //         };
  //         database.close();
  //         context.done();
  //       }
  //     );
  //   }
  // );
};

export default httpTrigger;
