const express = require("express");
const router = express.Router();
const {
    BadRequestErrorResponse,
    ErrorResponse,
} = require("../utils/response");
const { isAuthorized } = require("../middleware/auth.middleware");
const { getNews } = require("../controller/news.controller");

router.get("/news", isAuthorized, async (req, res) => {
    const userId = req.decodedToken.id;
    // Validate user ID
    if (!userId) {
        return res.status(400).json(
            BadRequestErrorResponse('User ID is required'),
        );
    }
    const requestBody = req.body || {};
    // Call the getNews function and handle the response
    try {
        const news = await getNews(userId, requestBody);
        return res.status(200).json(
            { news: news }
        );
    }
    // Handle errors
    catch (error) {
        console.error(error);
        return res.status(500).json(
            ErrorResponse('Error occurred while fetching news'),
        );
    }
});

module.exports = {
    newsRoutes: router,
};