import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
import { readFileSync } from 'fs';

config();

export const configCompletion = JSON.parse(readFileSync('src/config/static/config.json', { encoding: 'utf-8' }));

export const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_KEY }));