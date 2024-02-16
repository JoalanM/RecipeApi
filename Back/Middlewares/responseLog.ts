import { Request, Response, NextFunction } from "express";
import { createLogger, transports, format } from "winston";

const loggerOut = createLogger({
    transports: [
      new transports.File({
        dirname: "logs",
        filename: "responseLog.log",
      }),
    ],
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, message }) => {
        return `[${timestamp}] => ${message}`;
      })
    )
});

export function logOut(req: Request, res: Response, next: NextFunction) {
   
    const resStatus = res.statusCode;
    // const timeOut = res.header;
    loggerOut.info(`Status : ${resStatus}`);
    next();
}