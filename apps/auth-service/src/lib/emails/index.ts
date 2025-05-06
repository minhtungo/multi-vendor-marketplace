import VerificationEmail from "@/lib/emails/templates/VerificationEmail";
import PasswordResetEmail from "@/lib/emails/templates/PasswordResetEmail";
import { env } from "@/configs/env";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { logger } from "@/utils/logger";

// Configure MailHog transport
const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: false,
	service: env.SMTP_SERVICE,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASSWORD,
	},
});

interface EmailOptions {
	to: string | string[];
	subject: string;
	html: string;
}

export const emailService = {
	async sendEmail({ to, subject, html }: EmailOptions) {
		try {
			const info = await transporter.sendMail({
				from: env.EMAIL_FROM,
				to: Array.isArray(to) ? to.join(", ") : to,
				subject,
				html,
			});

			logger.info(`Email sent to ${to}`);

			return { success: true, messageId: info.messageId };
		} catch (error) {
			logger.error("Error sending email:", error);
			throw error;
		}
	},

	async verifyConnection() {
		try {
			await transporter.verify();
			return true;
		} catch (error) {
			console.error("Error verifying email connection:", error);
			return false;
		}
	},

	async sendVerificationEmail({
		to,
		username,
		otp,
	}: {
		to: string;
		username: string;
		otp: string;
	}) {
		const html = await render(
			VerificationEmail({
				username,
				otp,
			}),
		);
		return this.sendEmail({
			to,
			subject: "Verify Your Email Address",
			html,
		});
	},

	async sendPasswordResetEmail(to: string, username: string, token: string) {
		const html = await render(
			PasswordResetEmail({
				username,
				token,
			}),
		);
		return this.sendEmail({
			to,
			subject: "Reset Your Password",
			html,
		});
	},
};
