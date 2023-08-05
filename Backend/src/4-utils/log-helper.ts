import { createLogger, transports, format} from "winston";

const logger = createLogger({
    level: "info",
    transports: [
        new transports.File({ filename: "./logs/logger.log" })
    ],
    format: format.combine(
        format.timestamp({format: "YYYY-MM-DD hh:mm:ss"}),
        format.printf(log => `${log.level}\t${log.timestamp}\t${log.message}`))
});

export default logger;


