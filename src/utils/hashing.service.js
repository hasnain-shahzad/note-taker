const bcrypt = require("bcrypt");

class HashingService {
    static make = async (plainText) => {
        const salt = await bcrypt.genSalt();
        return bcrypt.hashSync(plainText, salt);
    }

    static compare = async (plainText, hash) => {
        return await bcrypt.compare(plainText, hash);
    }
};

module.exports = HashingService;