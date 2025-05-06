import { env } from "@/configs/env";

export const tokenConfig = {
	accessToken: {
		length: 32,
		maxAgeInSeconds: 1000 * 60 * 60 * 24 * 30,
		secret: env.ACCESS_TOKEN_SECRET,
	},
	refreshToken: {
		length: 32,
		maxAgeInSeconds: 1000 * 60 * 60 * 24 * 15,
		cookieName: "refreshToken",
		secret: env.REFRESH_TOKEN_SECRET,
	},
	verificationToken: {
		length: 32,
		maxAgeInSeconds: 1000 * 60 * 60 * 24,
	},
	resetPasswordToken: {
		length: 32,
		maxAgeInSeconds: 1000 * 60 * 60 * 24,
	},
};
