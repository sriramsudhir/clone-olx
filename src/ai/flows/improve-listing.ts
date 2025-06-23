'use server';

/**
 * @fileOverview An AI agent that suggests improvements to a listing's title and description.
 *
 * - improveListing - A function that handles the listing improvement process.
 * - ImproveListingInput - The input type for the improveListing function.
 * - ImproveListingOutput - The return type for the improveListing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveListingInputSchema = z.object({
  title: z.string().describe('The current title of the listing.'),
  description: z.string().describe('The current description of the listing.'),
  category: z.string().describe('The category of the listing.'),
});
export type ImproveListingInput = z.infer<typeof ImproveListingInputSchema>;

const ImproveListingOutputSchema = z.object({
  improvedTitle: z.string().describe('The improved title for the listing.'),
  improvedDescription: z.string().describe('The improved description for the listing.'),
  suggestedCategory: z.string().describe('A suggested category for the listing.'),
});
export type ImproveListingOutput = z.infer<typeof ImproveListingOutputSchema>;

export async function improveListing(input: ImproveListingInput): Promise<ImproveListingOutput> {
  return improveListingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveListingPrompt',
  input: {schema: ImproveListingInputSchema},
  output: {schema: ImproveListingOutputSchema},
  prompt: `You are an expert in online marketplaces, skilled at writing compelling titles and descriptions that attract buyers.

  Given the following listing details, suggest an improved title, description, and category to maximize its visibility and appeal.

  Current Title: {{{title}}}
  Current Description: {{{description}}}
  Current Category: {{{category}}}

  Provide the output in JSON format.
`,
});

const improveListingFlow = ai.defineFlow(
  {
    name: 'improveListingFlow',
    inputSchema: ImproveListingInputSchema,
    outputSchema: ImproveListingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
