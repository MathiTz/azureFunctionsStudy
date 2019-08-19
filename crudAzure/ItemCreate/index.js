const azure = require("azure-storage");

const uuid = require("uuid/v1");

const connectionString = process.env.StorageConnectionString;

const tableService = azure.createTableService(connectionString);

const tableName = "mytable";

module.exports = function(context, req) {
  context.log("StartItemCreate");

  if (req.body) {
    const item = req.body;
    item["PartitionKey"] = "Partition";
    item["RowKey"] = uuid();

    tableService.insertEntity(tableName, item, { echoContent: true }, function(
      error,
      result,
      response
    ) {
      if (!error) {
        context.res.status(201).json({ body: "Item successfully created" });
      } else {
        context.res.status(500).json({ error: error.message });
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
