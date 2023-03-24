import { openai, configCompletion as config } from '../config';

export async function completion(prompt: string) {
  return await openai.createCompletion({ 
    model: config.model, 
    prompt, 
    max_tokens: config.max_tokens
  });
}