"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage = __importStar(require("azure-storage"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class Storage {
    constructor() {
        this.tableName = "default";
        this.tableService = new storage.TableService();
    }
    static Create(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            let me = new Storage();
            me.tableName = tableName;
            yield me.CreateIfDoesntExistTable();
            return me;
        });
    }
    CreateIfDoesntExistTable() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    this.tableService.createTableIfNotExists(this.tableName, (err, result) => {
                        if (err)
                            throw err;
                        resolve(result);
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    AddOrMergeRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const tr = this.convertToTableRecord(record);
                    this.tableService.insertOrMergeEntity(this.tableName, tr, err => {
                        if (err)
                            throw err;
                        resolve(record);
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    convertToTableRecord(entity) {
        let result = {};
        Object.keys(entity).forEach(k => {
            let prop = Object.getOwnPropertyDescriptor(entity, k);
            if (prop) {
                result[k] = new storage.TableUtilities.entityGenerator.EntityProperty(prop.value);
            }
        });
        return result;
    }
    GetRecord(partitionKey, rowKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.tableService.retrieveEntity(this.tableName, partitionKey, rowKey, (err, entity) => {
                    if (err)
                        throw err;
                    resolve(this.tableRecordToJavascript(entity));
                });
            });
        });
    }
    tableRecordToJavascript(entity) {
        let result = {};
        Object.keys(entity).forEach(k => {
            // we do not want to decode metadata
            if (k !== ".metadata") {
                let prop = Object.getOwnPropertyDescriptor(entity, k);
                if (prop) {
                    result[k] = prop.value["_"];
                }
            }
        });
        return result;
    }
}
exports.Storage = Storage;
