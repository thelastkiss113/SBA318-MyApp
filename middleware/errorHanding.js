// middleware/errorHanding.js
/**
 * Handles any errors that may occur during the execution of the program.
 * Returns a 500 Internal Server Error response.
 *
 */
const errorHandler = (error, request, response, next) => {
    response.status(500).send('Internal Server Error');
};

module.exports = errorHandler;
