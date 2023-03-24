import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import chalk from 'chalk';

config();

const configJsonFile = () => {
  try {
    return JSON.parse(readFileSync('src/config/static/config.json', { encoding: 'utf-8' }));
  } catch (error) {
    throw `${chalk.red.bold('An error occurred while reading configuration file (config.json): ')} \n${error}`;
  }
}

export const configCompletion = configJsonFile();

export const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_KEY }));