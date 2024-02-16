import path from 'path';

export const swaggerOptions = {
    swaggerDefinition: {
        spoonacularApi : '2023',
        info : {
            title : 'API Recette',
            version : '1.0.0',
            description : 'Documentation de l\'API recette',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur local',
            },
        ],
    },
    apis: [path.resolve(__dirname, './controllers/*.ts'),]
};