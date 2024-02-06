import { createLogger, format, transports } from "winston";
import process from "process";
import { resolve } from "path";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()} : ${message}`;
});
const log = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(timestamp(), myFormat),
  transports: [
    // new transports.File({ filename: path.resolve("logs/app.log") })
    new DailyRotateFile({
      filename: resolve("storage/logs/app-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d",
    }),
  ],
});

if (process.env.NODE_ENV !== "production" || process.env.ENV === "local") {
  log.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}
export default log;
