import axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../Errors/ApiError";
import { RECIPE_API_BASE_URL } from "../Constants/config";
import { API_ERROR_MESSAGE } from "../Constants/errorMessages";
import { MinimalRecipeData } from "../Interfaces/MinimalRecipeData";

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

    public async getRandomRecipe(req : Request, res : Response, next: NextFunction): Promise<void> {
        try{
            const response : AxiosResponse = await axios.get(
                `${RECIPE_API_BASE_URL}/random?apiKey=${this.API_KEY}`
            );

            // const data = response.data;
            // res.json(data);

            // console.log(data.recipes[0].title);

            const miniMalData : MinimalRecipeData = {
                title : response.data.recipes[0].title,
                image : response.data.recipes[0].image,
                readyInMinutes : response.data.recipes[0].readyInMinutes,
                summary: response.data.recipes[0].summary, 
                servings : response.data.recipes[0].extendedIngredients,
                instructions : response.data.recipes[0].extendedIngredients,
                extendedIngredients : response.data.recipes[0].extendedIngredients,
            }

            res.json(miniMalData);
        }catch (error){
            next(new ApiError(API_ERROR_MESSAGE))
        }
    }
}