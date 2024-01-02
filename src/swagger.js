import swaggerJsdoc from "swagger-jsdoc";

const rootSpec = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "CharacterAI RestAPI",
      version: "1.0.0",
      description: "CharacterAI RestAPI suitable for home project.",
      license: {
        name: "MIT License",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Dianudi",
        url: "https://github.com/dianudi",
        // email: "info@mail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Production or staging server description, e.g. Internal staging server for testing",
      },
    ],
  },
  apis: ["src/routes/*.js"],
});

export { rootSpec };
