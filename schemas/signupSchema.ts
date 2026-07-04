import z from "zod";

const signUpSchema = z.object({
    username: z.string()
        .min(8, "Username must contain minimum 8 characters")
        .max(15, "Username must contain maximum 15 characters"),
    email: z.email(),
    password: z.string()
        .min(8, "Password must contain minimum 8 characters")
        .max(15, "Password must contain maximum 15 characters"),
    confirmPassword: z.string().min(8).max(15)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});

export default signUpSchema;