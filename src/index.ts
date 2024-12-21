import express, { Express } from "express";
import dotenv from "dotenv";
import {
  authRouter,
  rolesRouter,
  userRouter,
  moduleRouter,
  permissionRouter,
  profileRouter,
  institutionRouter
} from "@routes";
import {
  globalErrorHandler,
  jwtmiddleware,
  loggerMiddleware,
} from "@middleware";
import { sequelizeConnect } from "./db/sequelize";
import { syncAllTables } from "@db";
import http from "http";
import { Server } from "socket.io";
import { socketOperations } from "@utils";
import bodyParser from "body-parser";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });
console.log(process.env.NODE_ENV);
const app: Express = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    allowedHeaders: ["Authorization"],
  },
  maxHttpBufferSize: 1e8,
  pingInterval: 60 * 1000 * 60,
  pingTimeout: 60 * 1000 * 60,
  // upgradeTimeout: 100000,
});

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // Wait for the Sequelize connection to the database
    await sequelizeConnect();
    await syncAllTables();
    //Logger Middleware
    app.use(loggerMiddleware);

    app.use(bodyParser.json());
    // Routes
    app.use("/api/v1/user", jwtmiddleware, userRouter);
    app.use("/api/v1/user-profile", jwtmiddleware, profileRouter);
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/module", jwtmiddleware, moduleRouter);
    app.use("/api/v1/role", jwtmiddleware, rolesRouter);
    app.use("/api/v1/permission", permissionRouter);
    app.use("/institue", institutionRouter);

    // Global Error Handler
    app.use(globalErrorHandler);

    // Setup Socket.io connection
    socketOperations();

    // Start the server
    httpServer.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(
      "Failed to start the server due to database connection error:",
      error
    );
    process.exit(1); // Exit the process if there is a failure
  }
};

startServer();
export { io };
