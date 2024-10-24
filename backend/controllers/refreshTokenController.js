const User = require('../model/User');
const jwt = require('jsonwebtoken');

const HTTP_STATUS = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    SUCCESS: 200
};


const handleRefreshToken = async (req, res) => {

    const refreshToken = req.cookies.jwt || req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });


    try {
        const foundUser = await User.findOne({ refreshToken }).exec();

        // Detected refresh token reuse!
        if (!foundUser) {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, decoded) => {
                    if (err) return res.sendStatus(HTTP_STATUS.FORBIDDEN); //Forbidden
                    // Delete refresh tokens of hacked user
                    const hackedUser = await User.findById({ _id: decoded._id });
                    hackedUser.refreshToken = [];
                    const result = await hackedUser.save();
                }
            )
            return res.sendStatus(HTTP_STATUS.FORBIDDEN); //Forbidden
        }

        const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

        // evaluate jwt 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    // expired refresh token
                    foundUser.refreshToken = [...newRefreshTokenArray];
                    const result = await foundUser.save();
                }
                if (err || foundUser._id !== decoded._id) return res.sendStatus(HTTP_STATUS.FORBIDDEN);

                // Refresh token was still valid
                const accessToken = foundUser.generateAccessToken()

                const newRefreshToken = foundUser.generateRefreshToken()

                // Saving refreshToken with current user
                foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                const result = await foundUser.save();

                const loggedInUser = await User.findById(foundUser._id).select("-password -refreshToken");

                // Creates Secure Cookie with refresh token
                res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });

                res.status(HTTP_STATUS.SUCCESS).json({ user: loggedInUser, accessToken })
            }
        );
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

module.exports = { handleRefreshToken }
