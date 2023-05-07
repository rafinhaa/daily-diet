import { z } from "zod";

export const createMealBodySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10).max(254),
  eatedAt: z.string().datetime(),
  onTheDiet: z.boolean(),
});

export const createMealParamsSchema = z.object({
  userId: z.string().uuid(),
});

export const deleteMealParamsSchema = z.object({
  mealId: z.string().uuid(),
});

export const updateMealParamsSchema = z.object({
  mealId: z.string().uuid(),
});

export const getAllMealsParamsSchema = z.object({
  userId: z.string().uuid(),
});

export const getMealParamsSchema = z.object({
  mealId: z.string().uuid(),
});
