//catch all for any routes that don't exist
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    //calls the next piece of middleware and passes the error in
    next(error);
}

//catch all for any errors that occur in our routes
//writing err as the first variable express acknowledges this is custom middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === `CastError` && err.kind === 'ObjectId'){
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export { notFound, errorHandler}