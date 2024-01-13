import { z } from 'zod';

const createTaskSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  date: z.string().datetime().optional(),
});

export default createTaskSchema;
