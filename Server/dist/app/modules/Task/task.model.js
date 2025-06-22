"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String },
    points: { type: Number },
    deadline: { type: Date, required: true },
    priority: { type: String },
    category: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Task = (0, mongoose_1.model)('Task', taskSchema);
