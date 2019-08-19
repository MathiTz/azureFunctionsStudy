const azure = require("azure-storage");

const connectionString = process.env.StorageConnectionString;

const tableService = azure.createTableService(connectionString);
const tableName = "mytable";

module.exports = function(context, req) {
  context.log("Start ItemUpdate");

  const id = req.params.id;

  if (req.body) {
    const item = req.body;
    item.RowKey = id;

    tableService.insertOrReplaceEntity(tableName, item, function(
      error,
      result,
      response
    ) {
      if (!error) {
        context.res.status(202).json(result);
      } else {
        context.res.status(500).json({ error: error });
      }
    });
  } else {
    context.res = {
      status: 400,
      body: "Please pass an item in the request body"
    };
    context.done();
  }
};
