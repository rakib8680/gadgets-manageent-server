import { z } from "zod";

const createUserValidationSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(3, {
        message: "Name must be atleast 3 characters",
      })
      .max(255, {
        message: "Name must not exceed 255 characters",
      }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email format",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(4, {
        message: "Password must be atleast 6 characters",
      })
      .max(20, {
        message: "Password must not exceed 20 characters",
      }),
  })
  .strict();

const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  loginValidationSchema,
};
