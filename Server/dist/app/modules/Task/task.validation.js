"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskValidation = void 0;
const zod_1 = require("zod");
const createTaskValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        description: zod_1.z.string({ required_error: 'Description is required' }),
        status: zod_1.z.string().optional(),
        priority: zod_1.z.string({ required_error: 'Priority is required' }),
        deadline: zod_1.z
            .string()
            .datetime({ message: 'Invalid deadline format' })
            .or(zod_1.z.date()),
        points: zod_1.z
            .number({ required_error: 'Points are required' }),
        category: zod_1.z.string({ required_error: 'Category is required' }),
    }),
});
const updateTaskValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
        description: zod_1.z
            .string({ required_error: 'Description is required' })
            .optional(),
        status: zod_1.z.string().optional(),
        priority: zod_1.z.string().optional(),
        points: zod_1.z
            .number({ required_error: 'Points are required' })
            .optional(),
        deadline: zod_1.z
            .string()
            .datetime({ message: 'Invalid deadline format' })
            .or(zod_1.z.date())
            .optional(),
        category: zod_1.z.string().optional(),
    }),
});
exports.TaskValidation = {
    createTaskValidationSchema,
    updateTaskValidationSchema,
};
