import * as dotenv from 'dotenv';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export class ConfigService {
  constructor() {
    dotenv.config({
      path: `.env`,
    });

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
    if (this.nodeEnv === 'development') {
      console.info(process.env);
    }
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get winstonConfig(): winston.LoggerOptions {
    return {
      transports: [
        new DailyRotateFile({
          level: 'debug',
          filename: `./logs/${this.nodeEnv}/debug-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new DailyRotateFile({
          level: 'error',
          filename: `./logs/${this.nodeEnv}/error-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '20m',
          maxFiles: '30d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
              format: 'DD-MM-YYYY HH:mm:ss',
            }),
            winston.format.simple(),
          ),
        }),
      ],
      exitOnError: false,
    };
  }
}
