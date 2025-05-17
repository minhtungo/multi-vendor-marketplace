import { env } from "@/configs/env";
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Tailwind, Text } from "@react-email/components";
import React from "react";

interface VerificationEmailProps {
	username: string;
	otp: string;
}

const VerificationEmail = ({ username, otp }: VerificationEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Verify your email address</Preview>
			<Tailwind>
				<Body className="bg-white font-sans">
					<Container className="mx-auto py-5 px-4 max-w-[600px]">
						<Heading className="text-2xl font-semibold text-gray-800 my-0">Welcome to {env.APP_ORIGIN}!</Heading>
						<Text className="text-gray-700 text-base leading-6 mt-4">Hi {username},</Text>
						<Text className="text-gray-700 text-base leading-6">
							Thank you for signing up! Please verify your email address by clicking the button below:
						</Text>
						<Section className="text-center my-8">
							<Text className="text-gray-700 text-base leading-6">Your OTP is: {otp}</Text>
						</Section>
						<Text className="text-gray-700 text-base leading-6">This verification link will expire in 24 hours.</Text>
						<Text className="text-gray-700 text-base leading-6">
							If you didn't create an account, you can safely ignore this email.
						</Text>
						<Hr className="border-gray-200 my-6" />
						<Text className="text-gray-500 text-sm">This is an automated message, please do not reply.</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default VerificationEmail;
