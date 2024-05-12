const protectedRoute = (req, res, next) => {
    if (req.session.user) {
        // User is logged in, proceed to the next middleware
        next();
    } else {
        res.status(401).send({"Error": "Unauthorized"});
    }
};

module.exports = protectedRoute;
