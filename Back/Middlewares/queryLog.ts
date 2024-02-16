import { Request, Response, NextFunction } from "express";
import { createLogger, transports, format } from "winston";

const loggerIn = createLogger({
    transports: [
      new transports.File({
        dirname: "logs",
        filename: "queryLog.log",
      }),
    ],
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, message }) => {
        return `[${timestamp}] => ${message}`;
      })
    )
});

export function log(req: Request, res: Response, next: NextFunction) {
    const methodUsed = req.method;
    const urlUsed = req.url;
    const ipUser = req.ip;
    loggerIn.info(`Methode : ${methodUsed} // url : ${urlUsed} // by : ${ipUser}`);
    next();
}