const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Fix missing quotes
    next();
};

module.exports = logger;
