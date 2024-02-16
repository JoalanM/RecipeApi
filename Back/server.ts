import express, {NextFunction, Request, Response} from "express";
import { RecipeController } from "./Controllers/RecipeController";
import { errorHandler } from "./Middlewares/errorHandlers";
import {API_KEY} from "./Constants/config"

const app = express();

const PORT: number =  process.env.PORT ? parseInt(process.env.PORT) : 3000;
const recipeController = new RecipeController(API_KEY)


app.get("/testMyApi", (req: Request, res : Response) => {
    res.send("Coucou, l'api recette est active")
})

app.get("/research/:recipe", async (req: Request, res: Response, next: NextFunction)=> {
    await recipeController.getRecipeByName(req, res, next);
});

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d\'execution sur le port ${PORT}`);
})