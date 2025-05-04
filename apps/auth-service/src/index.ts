import { hello } from './../../../packages/server/src/index';
import { env } from "@/configs/env";
import { closeRedisConnection, getRedisClient } from "@/db/redis";
import { app } from "@/server";
import { logger } from "@/utils/logger";

const server = app.listen(env.PORT, () => {
	const { NODE_ENV, HOST, PORT } = env;
	logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
	// Initialize Redis connection
	hello();
	getRedisClient();
});

const onCloseSignal = async () => {
	logger.info("sigint received, shutting down");

	await closeRedisConnection();
	server.close(() => {
		logger.info("server closed");
		process.exit();
	});
	setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
