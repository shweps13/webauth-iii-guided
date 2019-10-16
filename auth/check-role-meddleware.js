module.exports = role => {
    return (req, res, next) => {
        // check that hte role that was in the token is the role passed as an argument
        if (role === req.user.role) {
            next();
        } else {
            res.status(403).json({ you: "cannot touch that" });
        }
    };
}