import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const azure = require("azure-storage");

const connectionString = process.env.AzureStorageConnectionString;

const tableService = azure.createTableService(connectionString);

const tableName = "mytable";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("StartItemRead");

  const id = req.params.id;
  if (id) {
    await tableService.retrieveEntity(
      tableName,
      "Partition",
      id,
      (error, result, response) => {
        if (!error) {
          context.res.status(200).json(response.body);
        } else {
          context.res.status(500).send();
        }
      }
    );
  } else {
    let query = new azure.TableQuery().top(100);
    await tableService.queryEntities(
      tableName,
      query,
      null,
      (error, result, response) => {
        if (!error) {
          context.res = {
            body: response.value
          };
        } else {
          context.res.status(500).send();
        }
      }
    );
  }
};

export default httpTrigger;
