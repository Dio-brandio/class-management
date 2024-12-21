import { MESSAGES, STATUSCODES } from "@constants";
import { jwtTokenVerifier } from "@libs";
import { CustomError } from "@utils";
import { io } from "@src";
const socketOperations = function () {
  io.on("connection", async (socket) => {
    try {
      console.log("Connected to socket", socket.id);
      const authorization = socket.handshake.headers?.authorization ?? "";
      console.log(authorization);
      if (authorization?.includes("Bearer")) {
        const jwtToken = authorization.split(" ")[1];
        const {
          payload = "",
          success,
          message,
        } = await jwtTokenVerifier(jwtToken);
        if (success) {
          socket.emit("socketId", socket.id);
        }
      }
      // Example event: listen to "message" events from the client
      socket.on("message", (message) => {
        console.log(`Message received: ${message}`);
        // Broadcast the message to all connected clients
        io.emit("message", message);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    } catch (error) {
      throw new CustomError(
        STATUSCODES.INTERNAL_SERVER,
        false,
        MESSAGES.SERVER_ERROR_MESSAGE
      );
    }
  });
};

export { socketOperations };
