const jwt = require("jsonwebtoken");
require('dotenv').config();

class JwtService {
    /**
      * Generate jwt against user id
      * @param id 
      * @returns 
      */
    static generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });
    };

    /**
     * Generate jwt
     * @param id 
     * @returns 
     */
    static verify = (token) => {
        return jwt.verify(token, process.env.JWT_SECRET);
    };
}


module.exports = JwtService;