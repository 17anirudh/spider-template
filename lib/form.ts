import z from "zod";
import type { Schema } from "@/components/form/data";

export const loginSchema: Schema[] = [
  {
    name: "login",
    label: "Login",
    schema: z.object({
      email: z.email(),
      password: z.string().min(6).max(20),
    }),
    render: "text",
    description: "Login",
  },
  {
    name: "password",
    label: "Password",
    schema: z.string().min(6).max(20),
    render: "text",
    description: "Password",
  }
]