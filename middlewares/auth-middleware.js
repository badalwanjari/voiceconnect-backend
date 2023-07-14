const tokenService = require('../services/token-service');

module.exports = async function (req, res, next) {
    return next();
    try {
        console.log("Hello From Auth")
        const { accessToken } = req.cookies;
        console.log("accesstoken : " , accessToken)
        if (!accessToken) {
            throw new Error();
        }
        const userData = await tokenService.verifyAccessToken(accessToken);
        console.log("accesstoken" , accessToken, "\nUserData",  userData)
        if (!userData) {
            throw new Error();
        }
        req.user = userData;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
