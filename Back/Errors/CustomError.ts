import { CUSTOM_ERROR_NAME } from "../Constants/errorNames";

export class CustomError extends Error {
    constructor(message: string, errorCode: number){
        super(message);
        this.name = CUSTOM_ERROR_NAME;
        this.errorCode = errorCode;
    }

    errorCode: number;
}