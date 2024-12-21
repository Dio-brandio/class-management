// Import the 'morgan' library for request logging.
import morgan from "morgan";

// Define a custom token for displaying status colors.
morgan.token("status-color", (req, res) => {
  const status = res.statusCode;
  // Use ANSI color codes for success (green) and error (red).
  if (status >= 200 && status < 300) {
    return "\x1b[32m"; // Green
  } else if (status >= 400) {
    return "\x1b[31m"; // Red
  }
  return "\x1b[0m"; // Reset color
});

// Define a custom log format.
const logFormat =
  ":status-color:date[iso] :remote-addr :remote-user :method :url HTTP/:http-version :status :response-time ms :referrer";

// Create a logging middleware using the defined log format.
export const loggerMiddleware = morgan(logFormat);
