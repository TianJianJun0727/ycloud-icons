import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import type z from 'zod';

interface AiClient {
  provider: string;
  model: string;
  completeJson<T>(input: string, schemaName: string, schema: z.ZodType<T>): Promise<T>;
}

export function createAiClient() {
  if (process.env.OPENAI_API_KEY) {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    return {
      model: process.env.AI_MODEL ?? 'gpt-5-mini',
      provider: 'OpenAI',
      async completeJson<T>(input: string, schemaName: string, schema: z.ZodType<T>) {
        const response = await client.responses.create({
          model: process.env.AI_MODEL ?? 'gpt-5-mini',
          input,
          text: {
            format: zodTextFormat(schema, schemaName),
          },
        });

        return schema.parse(JSON.parse(response.output_text));
      },
    } satisfies AiClient;
  }

  if (process.env.GITHUB_TOKEN) {
    const client = new OpenAI({
      apiKey: process.env.GITHUB_TOKEN,
      baseURL: 'https://models.github.ai/inference',
    });

    return {
      model: process.env.AI_MODEL ?? 'openai/gpt-4.1-mini',
      provider: 'GitHub Models',
      async completeJson<T>(input: string, _schemaName: string, schema: z.ZodType<T>) {
        const response = await client.chat.completions.create({
          model: process.env.AI_MODEL ?? 'openai/gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content: 'Return only a valid JSON object. Do not wrap it in Markdown.',
            },
            {
              role: 'user',
              content: input,
            },
          ],
          response_format: {
            type: 'json_object',
          },
          temperature: 0,
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
          throw new Error('AI response did not include JSON content.');
        }

        return schema.parse(JSON.parse(content));
      },
    } satisfies AiClient;
  }

  return null;
}
