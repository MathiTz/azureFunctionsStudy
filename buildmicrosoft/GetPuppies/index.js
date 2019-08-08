const MongoClient = require("mongodb").MongoClient;
const auth = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPassword
};

module.exports = function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request");
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      console.log("Connected sucessfully");
      const db = database.db("admin");
      db.collection("Puppies")
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          context.log("This is a happy moment");
          result.forEach(puppy => delete puppy._id);
          context.res = {
            //status: 200,
            body: result
          };
          database.close();
          context.done();
        });
    }
  );
};

// "CosmosDBUser": "demo-serveless",
//     "CosmosDBPassword": "9PuiahEH1okZkF48bwY2T8Athsj1iD8GqeaUTjOc39X6tQb2IQH96kbT1iZ2s3A0oQiUSZOY3LYW0f18jcywGg==",
//     "CosmosDBURL": "mongodb://demo-serveless.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"

// module.exports = function(context, req) {
//   context.log("JavaScript HTTP trigger function processed a request.");

//   context.res = {
//     body: context.bindings.allPuppies
//   };

//   context.done();
// };
