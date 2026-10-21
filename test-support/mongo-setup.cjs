
require('dotenv').config({ path: '.env.test' });

const tap = require('tap');
const mongoose = require('mongoose');

tap.before(async () => {
    const uri = process.env.MONGODB_TEST_URI;

    if (!uri) {
        throw new Error(
            'MONGODB_TEST_URI is missing from .env.test'
        );
    }

    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
    });

    const dbName = mongoose.connection.name;

    // Safety check: only use a database ending in "test".
    if (!/(?:^|[_-])test$/i.test(dbName)) {
        await mongoose.disconnect();

        throw new Error(
            `Refusing to run tests against database: ${dbName}`
        );
    }

    // Remove data left by earlier test runs while preserving indexes.
    const collections = await mongoose.connection.db
        .listCollections()
        .toArray();

    for (const collection of collections) {
        if (collection.type !== 'view' &&
            !collection.name.startsWith('system.')) {
            await mongoose.connection.db
                .collection(collection.name)
                .deleteMany({});
        }
    }

    console.log(`Connected to test database: ${dbName}`);
});

tap.teardown(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
});
