const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    try {
        const cookies = req.cookies;

        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser) return res.sendStatus(401); //Unauthorized 
        // evaluate password 
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.sendStatus(401); // Unauthorized
            
        // create JWTs
        const accessToken = foundUser.generateAccessToken()

        const newRefreshToken = foundUser.generateRefreshToken()

        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RefressToken and does not logout 
                2) RefreshToken is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();

        const loggedInUser = await User.findById(foundUser._id).select("-password -refreshToken")

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });

        // Send access token to user
        res.json({ user: loggedInUser, accessToken });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

module.exports = { handleLogin };

