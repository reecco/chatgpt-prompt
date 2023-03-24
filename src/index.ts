import { writeFile, readdir, mkdir } from "fs";
import chalk from "chalk";
import readline from 'readline';

import { completion } from "./utils";
import { configCompletion as config } from "./config";

function main(): void {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question(`\n${chalk.blue.bold('Enter: ')}`, async (text) => {
    if (text.toLowerCase() === 'quit' || text.toLowerCase() === 'exit') {
      console.log(chalk.blue.bold('\nBye\n'));
      rl.close();
      return;
    }

    console.log(chalk.magenta.bold('\nProcessing...\n'));
    await output(text).then(res => console.log(res)).catch(error => console.log(error));

    rl.close();
    main();
  })
}

async function output(text: string): Promise<string> {
  const res = await completion(text);
  const data = config.file_extension === 'txt' ? String(res.data.choices[0].text) : JSON.stringify(res.data.choices[0]);
  const pathWrite = `output/${config.file_extension}/${text.replace(/[ ]/g, '_')}-${Date.now()}.${config.file_extension}`;
  const pathFolder = `output/${config.file_extension}`;

  readdir(pathFolder, (error) => {
    if (error) {
      mkdir(`output/${config.file_extension}`, (error) => {
        if (error) {
          throw `${chalk.red.bold('An error occurred while creating the folder: ')} ${error}`;
        }
      });
    }
    writeFile(pathWrite, data, (error) => {
      if (error)
        throw `${chalk.red.bold('An error occurred while writing the file: ')} ${error}`;
    });
  });

  return chalk.green.bold(`File ${chalk.underline(`'${text}.${config.file_extension}'`)} successfully created.`);
}

main();