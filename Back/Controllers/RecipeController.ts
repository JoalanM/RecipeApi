import axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../Errors/ApiError";
import { RECIPE_API_BASE_URL } from "../Constants/config";
import { API_ERROR_MESSAGE } from "../Constants/errorMessages";
import { MinimalRecipeData } from "../Interfaces/MinimalRecipeData";

/**
 * @swagger
 * tags:
 *  name: Recipe
 *  description: Opération liées aux recettes de cuisine
 */

export class RecipeController{
    private API_KEY : string;

    constructor(apiKey: string){
        this.API_KEY = apiKey;
    }

    /**
     * @swagger
     * /research/{recipeName}:
     *  get: 
     *      summary: Obtient une liste de recettes.
     *      description: Recupérer les recette dont le nom est identique au nom fournie.
     *      tags: [Recipe]
     *      parameters:
     *          - in: path
     *            name: recipeName
     *            required: true
     *            description: Nom de la recette.
     *            schema:
     *              type: string
     *      responses:
     *          200: 
     *            description: Succès. Retourne les données recettes.
     *          400:
     *            description: Erreur lors de la récupération des données des recettes.
     * 
     */
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

    /**
     * @swagger
     * /recipe/random:
     *  get: 
     *      summary: Obtient une recette aléatoirement.
     *      description: Laisser le système choisir une recette aléatoirement pour vous.
     *      tags: [Recipe]
     *      responses:
     *          200: 
     *            description: Succès. Retourne les données recettes.
     *          400:
     *            description: Erreur lors de la récupération des données des recettes.
     * 
     */
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


    /**
     * @swagger
     * /recipe/similar/{idRecipe}:
     *  get: 
     *      summary: Obtient une liste de recettes similaire .
     *      description: Recupérer les recette qui sont similaire a une recette donnner.
     *      tags: [Recipe]
     *      parameters:
     *          - in: path
     *            name: idRecipe
     *            required: true
     *            description: id de la recette principale
     *            schema:
     *              type: number
     *      responses:
     *          200: 
     *            description: Succès. Retourne les données recettes.
     *          400:
     *            description: Erreur lors de la récupération des données des recettes.
     * 
     */
    public async getSimilarRecipe(req : Request, res : Response, next: NextFunction): Promise<void> {
        const idRecipe: string = req.params.idRecipe;
        try{
            const response : AxiosResponse = await axios.get(
                `${RECIPE_API_BASE_URL}/${idRecipe}/similar?apiKey=${this.API_KEY}`
            );

            const data = response.data;
            res.json(data);


        }catch (error){
            next(new ApiError(API_ERROR_MESSAGE))
        }
    }
}