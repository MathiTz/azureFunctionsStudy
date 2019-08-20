import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const azure = require("azure-storage");
const connectionString: String = process.env.AzureStorageConnectionString;
const tableService = azure.createTableService(connectionString);
const tableName = "mytable";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("StartItemDelete");

  const id: String = req.params.id;
  if (id) {
    let item = { PartitionKey: "Partition", RowKey: id };
    await tableService.deleteEntity(tableName, item, function(
      error,
      result,
      response
    ) {
      if (!error) {
        context.res.status(204).send({ body: "Successfully Deleted" });
      } else {
        context.res.status(500).json({ error: error });
      }
    });
  } else {
    context.res = {
      status: 400,
      body: "Please pass an item in the request params"
    };
  }
};

export default httpTrigger;
