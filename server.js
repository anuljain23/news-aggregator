const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err, data) => {   // Start the server
    if (err) {  // Error starting the server
        console.error('Failed to start server:', error);
        process.exitCode = 1;
    } else {    // Server started successfully
        console.log(`Server is listening on ${PORT}`);
    }
});