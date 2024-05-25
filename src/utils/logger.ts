import { createLogger, format, transports } from 'winston'; // Import necessary modules from the 'winston' logging library

// Create a logger instance using the 'winston' library
const logger = createLogger({
    // Set the logging level to 'info'. This means that logs with level 'info' and higher (e.g., 'warn', 'error') will be logged.
    level: 'info',
    // Define the format for log messages
    format: format.combine(
        format.timestamp(), // Add a timestamp to each log entry
        format.errors({ stack: true }), // Ensure that stack traces are included in the logs for errors
        // Customize the log message format
        format.printf(({ timestamp, level, message, stack }) =>
            // If a stack trace is present, include it in the log message; otherwise, just log the message
            stack ? `${timestamp} [${level}]: ${message} - ${stack}` : `${timestamp} [${level}]: ${message}`
        )
    ),
    // Define the transports (i.e., the destinations where log messages are sent)
    transports: [
        new transports.Console(), // Log messages to the console
        new transports.File({ filename: 'combined.log' }) // Log messages to a file named 'combined.log'
    ]
});

// Export the logger instance for use in other parts of the application
export default logger;
