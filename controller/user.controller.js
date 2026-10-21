const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS } = require('../utils/constants');

const usersModel = require("../model/user.model");

const registerUser = async (user) => {
    // Generate a salt for password hashing
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    // Hash the user's password using the generated salt
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Create a new user object with the provided user data and hashed password
    const newUser = new usersModel({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        preferences: user.preferences || [] // Set preferences to an empty array if not provided
    });

    // Save the new user to the database and return the saved user object
    try {
        const dbUser = await newUser.save();
        const response = {
            _id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email,
            preferences: dbUser.preferences
        };
        return response;
    }
    // Handle any errors that occur during user registration
    catch (error) {
        if (error.code === 11000) {
            throw new Error("Email already exists", error);
        }
        throw new Error("Error occurred while registering user");
    }
};

const loginUser = async (email, password) => {
    try {
        // Find the user in the database by email
        const dbUser = await usersModel.findOne({ email: email });
        if (!dbUser) {
            throw new Error("User not found");
        }

        // Compare the provided password with the hashed password stored in the database
        const isSamePassword = bcrypt.compareSync(password, dbUser.password);
        if (!isSamePassword) {
            throw new Error("Invalid Password");
        }

        // Create a payload for the JWT token with the user's ID and role
        const payload = {
            id: dbUser._id,
            role: dbUser.role
        };

        // Generate a JWT token with the payload and a secret key, set to expire in 1 hour
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

// const loginUser = async (email, password) => {
//     const body = {
//         email: email
//     };
//     const dbUser = await usersModel.findOne(body);
//     if (!dbUser) {
//         throw new Error("User not found");
//     }
//     const isSamePassword = bcrypt.compareSync(password, dbUser.password);

//     const payload = {
//         id: dbUser._id,
//         role: dbUser.role
//     }

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

//     if (!isSamePassword) {
//         throw new Error("Invalid Password");
//     }


//     return { status: "ok", token };
// }


module.exports = { registerUser, loginUser };