import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const rabbitMQConfigSchema = z.object({
  url: z.string(),
  reconnectTimeInSeconds: z.number().default(5),
});

export const rabbitMQConfig = rabbitMQConfigSchema.parse({
  url: process.env.RABBITMQ_URL || 'amqp://username:password@localhost:5672',
  reconnectTimeInSeconds: 5,
});

export type RabbitMQConfig = z.infer<typeof rabbitMQConfigSchema>;
