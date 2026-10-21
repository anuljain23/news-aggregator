const express = require("express");
const router = express.Router();
const { registerUser } = require("../controller/user.controller");
const {
    BadRequestErrorResponse,
    CreatedResponse,
    ErrorResponse,
} = require("../utils/response");

router.post("/signup", async (req, res) => {
    const user = req.body || {};
    if (!user.name || !user.email || !user.password) {
        return res.status(400).json(
            BadRequestErrorResponse('Missing required fields: name, email, password'),
        );
    }

    try {
        const dbUser = await registerUser(user);
        return res.status(201).json(CreatedResponse(dbUser));
    } catch (error) {
        console.error(error);
        if (error.message === "Email already exists") {
            return res.status(409).json(BadRequestErrorResponse(error.message));
        }
        return res.status(500).json(
            ErrorResponse('Error occurred while registering user'),
        );
    }
});

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const token = await loginUser(email, password);
//     return res.status(200).send({ token: token });
// });

module.exports = {
    userRoutes: router,
};