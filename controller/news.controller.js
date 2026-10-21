const getNews = async (userId, requestBody = {}) => {
    try {
        // Fetch user preferences from the database
        const user = await usersModel.findById(userId).select('preferences');
        if (!user) {
            throw new Error("User not found");
        }
    }
    //
    catch (error) {

    }
};

module.exports = {
    getNews,
};