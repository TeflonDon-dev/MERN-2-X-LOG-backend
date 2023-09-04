const jwt = require("jsonwebtoken");

const genAuthToken =(user) => {
    const secretKey = process.env.SUPER_SECRET_KEY;

    const token = jwt.sign({
        _id:user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        image:user.image,
    }, secretKey);

    return token;
}

module.exports = genAuthToken;