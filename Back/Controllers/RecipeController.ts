import axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../Errors/ApiError";
import { RECIPE_API_BASE_URL } from "../Constants/config";
import { API_ERROR_MESSAGE } from "../Constants/errorMessages";

export class RecipeController{
    private API_KEY : string;

    constructor(apiKey: string){
        this.API_KEY = apiKey;
    }

    public async getRecipeByName(req : Request, res : Response, next: NextFunction): Promise<void> {
        const recipe: string = req.params.recipe;
        try{
            const response : AxiosResponse = await axios.get(
                `${RECIPE_API_BASE_URL}/complexSearch?apiKey=${this.API_KEY}&query=${recipe}`
            );

            const data = response.data;
            res.json(data);
        }catch (error){
            next(new ApiError(API_ERROR_MESSAGE))
        }
    }
}