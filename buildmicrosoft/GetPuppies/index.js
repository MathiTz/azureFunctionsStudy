const MongoClient = require("mongodb").MongoClient;

module.exports = function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request");
  context.res = {
    body: context.bindings.allPuppies
  };

  context.done();
  // MongoClient.connect(
  //   process.env.CosmosDBURL,
  //   { useNewUrlParser: true },
  //   (err, database) => {
  //     if (err) throw err;
  //     console.log("Connected sucessfully");
  //     const db = database.db("admin");
  //     db.collection("Puppies")
  //       .find()
  //       .toArray((err, result) => {
  //         if (err) throw err;
  //         context.log("This is a happy moment");
  //         result.forEach(puppy => delete puppy._id);
  //         context.res = {
  //           //status: 200,
  //           body: result
  //         };
  //         database.close();
  //         context.done();
  //       });
  //   }
  // );
};

// "route": "puppies",
// "methods": ["get"]
// "CosmosDBUser": "demo-serveless",
//     "CosmosDBPassword": "",
//     "CosmosDBURL": ""

// module.exports = function(context, req) {
//   context.log("JavaScript HTTP trigger function processed a request.");

//   context.res = {
//     body: context.bindings.allPuppies
//   };

//   context.done();
// };
