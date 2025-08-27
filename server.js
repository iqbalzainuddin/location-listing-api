require('module-alias/register');

const express = require("express");
const helmet = require("helmet");

const routes = require("@/routes");
const errorHandler = require("@/middleware/errorhandler");
const { app: app_env } = require("@/config/environment");


const startServer = async () => {
  try {
    const app = express();

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use("/", routes);

    app.use(errorHandler);
    
    app.listen(app_env.port , () => {
      console.log(`Server is running on port ${app_env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error.message);
    process.exit(1);
  }
}

startServer();
