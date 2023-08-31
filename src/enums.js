const AppEnum = {
    NoteType: {
        PERSONAL: 'personal',
        WORK: 'work',
    },
    ResponseMessage: {
        UNAUTHORIZED: "Unauthorized: Invalid jwt token",
        INVALID_USERNAME_PASSWORD: "Invalid username or password",
        PASSWORD_NOT_SET: "Password not set",
        SUCCESS: "Success",
        CREATED_SUCESSFULLY: "Created successfully",
        UPDATED_SUCESSFULLY: "Updated successfully",
        NOT_EXIST: "Does not exist",
        USER_ALREADY_EXIST: "User with same email already exist"
    },
    ResponseStatus: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        INTERNAL_ERROR: 500
    }
};

module.exports = Object.freeze(AppEnum);