// hooks/useVerifyOtp
import customFetch from "@/fundamental/customFetch";
import { useMutation } from "@tanstack/react-query";

interface VerifyOtpPayload {
    phone: string;
    otp: string;
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: ({ phone, otp }: VerifyOtpPayload) =>
            customFetch<VerifyOtpPayload>(`/auth/verify-otp`, { phone, otp }, { method: "POST" }),
    });
};