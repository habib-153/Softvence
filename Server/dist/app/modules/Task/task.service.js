"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const task_model_1 = require("./task.model");
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const createTaskIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the task deadline has expired
        const currentTime = new Date();
        const taskDeadline = new Date(payload.deadline);
        if (currentTime > taskDeadline) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Task deadline has already expired');
        }
        const result = yield task_model_1.Task.create(payload);
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create task');
    }
});
const getAllTasksFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['title'];
    const products = new QueryBuilder_1.QueryBuilder(task_model_1.Task.find(), query)
        .search(searchableFields)
        .filter();
    const result = yield products.modelQuery;
    return result;
});
const getSingleTaskFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.findById(id);
    return result;
});
const updateTaskIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.findByIdAndUpdate(id, { $set: payload }, { new: true });
    return result;
});
const deleteTaskFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.findByIdAndDelete(id);
    return result;
});
exports.TaskServices = {
    createTaskIntoDB,
    getAllTasksFromDB,
    getSingleTaskFromDB,
    updateTaskIntoDB,
    deleteTaskFromDB
};
