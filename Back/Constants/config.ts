import dotenv from "dotenv";

dotenv.config();

export const API_KEY = process.env.RECIPE_API_KEY || "default_api_key";
export const RECIPE_API_BASE_URL = "https://api.spoonacular.com/recipes";