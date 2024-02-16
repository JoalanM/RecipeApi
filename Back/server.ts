import express, {NextFunction, Request, Response} from "express";
import { RecipeController } from "./Controllers/RecipeController";
import { errorHandler } from "./Middlewares/errorHandlers";
import {API_KEY} from "./Constants/config"
import { log } from "./Middlewares/queryLog";
import { logOut } from "./Middlewares/responseLog";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./swaggerOptions";
import swaggerUi from "swagger-ui-express"

const app = express();

const PORT: number =  process.env.PORT ? parseInt(process.env.PORT) : 3000;
const recipeController = new RecipeController(API_KEY)

app.use(log);
app.use(logOut);

app.get("/testMyApi", (req: Request, res : Response) => {
    res.send("Coucou, l'api recette est active")
})

app.get("/research/:recipe", async (req: Request, res: Response, next: NextFunction)=> {
    await recipeController.getRecipeByName(req, res, next);
});

app.get("/recipe/random", async (req: Request, res: Response, next: NextFunction)=> {
    await recipeController.getRandomRecipe(req, res, next);
});

app.get("/recipe/similar/:idRecipe", async (req: Request, res: Response, next: NextFunction)=> {
    await recipeController.getSimilarRecipe(req, res, next);
});

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d\'execution sur le port ${PORT}`);
})