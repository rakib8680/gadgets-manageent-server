import { z } from "zod";

const featuresValidationSchema = z
  .object({
    cameraResolution: z.string().optional(),
    storageCapacity: z.string().optional(),
    screenSize: z.string().optional(),
    // Additional features can be added dynamically
  })
  .passthrough();

const dimensionsValidationSchema = z.object({
  width: z.number().optional(),
  height: z.number().optional(),
  depth: z.number().optional(),
});

const createProductValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  price: z.number().min(1, {
    message: "Price must be greater than 0",
  }),
  imageURL: z.string({ required_error: "Image URL is required" }),
  quantity: z
    .number()
    .nonnegative({ message: "Quantity must be greater than or equal to 0" }),
  brand: z.string({ required_error: "Brand is required" }),
  modelNo: z.string({ required_error: "Model number is required" }),
  category: z.string({ required_error: "Category is required" }),
  operatingSystem: z
    .string()
    .max(50, {
      message: "Operating system must be less than 50 characters",
    })
    .optional(),
  connectivity: z.array(z.string()).default([]).optional(),
  powerSource: z.string().max(50).optional().nullable(),
  features: featuresValidationSchema.optional(),
  weight: z.number().optional().nullable(),
  dimensions: dimensionsValidationSchema.optional(),
  compatibility: z.array(z.string()).default([]).optional(),
});

export const productValidations = {
  createProductValidationSchema,
};
