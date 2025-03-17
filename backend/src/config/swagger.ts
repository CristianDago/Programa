import swaggerJsDoc from "swagger-jsdoc";

// Opciones de configuración de Swagger
const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0", // Especificación de OpenAPI
    info: {
      title: "API REST Alumnos EDC",
      version: "1.0.0",
      description: "Documentación API",
    },
  },
  apis: ["swagger.yml"], // Rutas de los archivos con la documentación de Swagger
};

// Generar la documentación de Swagger
const openapiSpecification = swaggerJsDoc(options);

export default openapiSpecification;
