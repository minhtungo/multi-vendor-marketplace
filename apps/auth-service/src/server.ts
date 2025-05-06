import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { env } from "@/configs/env";
import { openAPIRouter } from "@/docs/openAPIRouter";
import errorHandler from "@repo/server/middlewares/error-handler";
import rateLimiter from "@/middlewares/rateLimiter";
import { authRouter } from "@/routes/auth.route";
import { healthCheckRouter } from "@/routes/health-check.route";
import { createRequestLogger } from "@repo/server/middlewares/request-logger";
import cookieParser from "cookie-parser";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(createRequestLogger(env));

// Routes
app.use("/api/health-check", healthCheckRouter);
app.use("/api/auth", authRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
