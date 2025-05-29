// hooks/useVerifyPassword
import customFetch from "@/fundamental/customFetch";
import { useMutation } from "@tanstack/react-query";

interface VerifyPasswordPayload {
    username: string
    password: string
}

export const useVerifyPassword = () => {
    return useMutation({
        mutationFn: ({ username, password }: VerifyPasswordPayload) =>
            customFetch<VerifyPasswordPayload>(`/auth/verify-password`, { username, password }, { method: "POST" }),
    });
};