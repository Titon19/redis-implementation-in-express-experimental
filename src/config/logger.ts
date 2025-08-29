import pino from "pino";
import path from "path";
import fs from "fs";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logPath = path.join(logDir, "app.log");

if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, "");
}
const logger = pino({
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
        },
        level: process.env.NODE_ENV === "development" ? "debug" : "info",
      },
      {
        target: "pino-pretty",
        options: {
          colorize: false,
          translateTime: "SYS:standard",
          destination: logPath,
        },
        level: process.env.NODE_ENV === "development" ? "debug" : "info",
      },
    ],
  },
});

export default logger;
