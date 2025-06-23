"use server";

import { improveListing, suggestCategories } from "@/ai/flows";
import { z } from "zod";

const improveListingSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string().optional(),
});

export async function getImprovedListing(data: z.infer<typeof improveListingSchema>) {
  try {
    const result = await improveListing({
        ...data,
        category: data.category || 'General'
    });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to improve listing." };
  }
}

const suggestCategoriesSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export async function getSuggestedCategories(data: z.infer<typeof suggestCategoriesSchema>) {
    try {
        const result = await suggestCategories(data);
        return { success: true, data: result.categories };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to suggest categories." };
    }
}
