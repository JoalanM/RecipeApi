import { Request, Response, NextFunction } from "express";
import { API_ERROR_CODE, UNKNOWN_ERROR } from "../Constants/errorCodes";
import { CustomError } from "../Errors/CustomError";




export function errorHandler(err : Error, req: Request, res : Response, next: NextFunction){
    console.error(err.stack);

    if(err instanceof CustomError){
        res.status(500).json({ error: err.message, errorCode: API_ERROR_CODE})
    }else {
        res.status(500).json({ error: "Une erreur inattendue s'est produite." , errorCode: UNKNOWN_ERROR})
    }
}