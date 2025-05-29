// hooks/useLoginStart
import customFetch from "@/fundamental/customFetch";
import { ILoginStart } from "@/fundamental/models/loginStart";
import { useMutation } from "@tanstack/react-query";


export const useLoginStart = () => {
    return useMutation({
        mutationFn: ({ text }: ILoginStart) =>
            customFetch<ILoginStart>('/auth/start', { text }, { method: "POST" })
    });
};