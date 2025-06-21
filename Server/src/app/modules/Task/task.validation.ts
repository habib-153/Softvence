import { z } from 'zod';

const createTaskValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    status: z.string().optional(),
    priority: z.string({ required_error: 'Priority is required' }),
    deadline: z
      .string()
      .datetime({ message: 'Invalid deadline format' })
      .or(z.date()),
    category: z.string({ required_error: 'Category is required' }),
  }),
});

const updateTaskValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    description: z
      .string({ required_error: 'Description is required' })
      .optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    deadline: z
      .string()
      .datetime({ message: 'Invalid deadline format' })
      .or(z.date())
      .optional(),
    category: z.string().optional(),
  }),
});

export const TaskValidation = {
  createTaskValidationSchema,
  updateTaskValidationSchema,
};