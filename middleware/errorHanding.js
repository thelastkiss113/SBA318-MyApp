/**
 * Handles any errors that may occur during the execution of the program.
 * Logs the error to the console and returns a 500 Internal Server Error response.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

module.exports = errorHandler;
