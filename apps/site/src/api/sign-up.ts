import { server } from "@/configs/server";
import { commonValidations } from "@/lib/validations";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const signUpSchema = z.object({
	email: commonValidations.email,
	password: commonValidations.password,
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export async function signUpWithEmailAndPassWord(data: SignUpInput): Promise<
	ApiResponse<{
		accessToken: string;
		user: User;
	}>
> {
	const response = await fetch(server.path.auth.signUp, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.json();
}

export function useSignUpMutation() {
	return useMutation({
		mutationFn: signUpWithEmailAndPassWord,
		onSuccess: () => {
			//   queryClient.setQueryData(userQueryKey, data.user);
		},
		onError: (error: Error) => {
			console.error(error);
		},
	});
}
