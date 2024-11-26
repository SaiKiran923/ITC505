const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from the "public" folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Regular expressions for validating each word type
const nounPattern = /^[a-zA-Z]{2,}$/; // Noun: at least 2 alphabetic characters
const verbPattern = /^[a-zA-Z]{2,}$/; // Verb: at least 2 alphabetic characters
const adjectivePattern = /^[a-zA-Z]{2,}$/; // Adjective: at least 2 alphabetic characters
const pluralNounPattern = /^[a-zA-Z]{2,}s$/; // Plural Noun: at least 2 alphabetic characters and ends with 's'
const placePattern = /^[a-zA-Z\s]{2,}$/; // Place: at least 2 alphabetic characters or spaces (for multi-word places)

// Route to handle Mad Libs form submission
server.post('/ITC505/lab-7', (req, res) => {
    const { noun, verb, adjective, pluralNoun, place } = req.body;

    // Check if all fields are filled
    if (!noun || !verb || !adjective || !pluralNoun || !place) {
        return res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out all fields! All fields are required.</p>
            <a href="/ITC505/lab-7">Go Back to Form</a>
        `);
    }

    // Validate the Noun field
    if (!nounPattern.test(noun)) {
        return res.send(`
            <h1>Invalid Noun</h1>
            <p>The Noun you entered is invalid. A valid Noun should be at least 3-6 alphabetic characters long (e.g., 'dog', 'cat').</p>
            <a href="/ITC505/lab-7">Go Back to Form</a>
        `);
    }

    // Validate the Verb field
    if (!verbPattern.test(verb)) {
        return res.send(`
            <h1>Invalid Verb</h1>
            <p>The Verb you entered is invalid. A valid Verb should be at least 3-5 alphabetic characters long (e.g., 'run', 'eat').</p>
            <a href="/ITC505/lab-7">Go Back to Form</a>
        `);
    }

    // Validate the Adjective field
    if (!adjectivePattern.test(adjective)) {
        return res.send(`
            <h1>Invalid Adjective</h1>
            <p>The Adjective you entered is invalid. A valid Adjective should be at least 5-7 alphabetic characters long (e.g., 'happy', 'fast').</p>
            <a href="/ITC505/lab-7">Go Back to Form</a>
        `);
    }

    // Validate the Plural Noun field
    if (!pluralNounPattern.test(pluralNoun)) {
        return res.send(`
            <h1>Invalid Plural Noun</h1>
            <p>The Plural Noun you entered is invalid. A valid Plural Noun should be at least 5-7 alphabetic characters and end with an 's' (e.g., 'dogs', 'cats').</p>
            <a href="/ITC505/lab-7">Go Back to Form</a>
        `);
    }

    // Validate the Place field
    if (!placePattern.test(place)) {
        return res.send(`
            <h1>Invalid Place</h1>
            <p>The Place you entered is invalid. A valid Place should be at least 5-10 alphabetic characters long or a multi-word name like 'New York' (e.g., 'park', 'beach').</p>
            <a href="/ITC505/lab-7">Go Back to Form</a>
        `);
    }

    // If all fields are valid, generate the Mad Lib
    const madLib = `Once upon a time, there was a ${adjective} ${noun} who loved to ${verb} near the ${pluralNoun} in the ${place}.`;

    res.send(`
        <h1>Mad Lib Result</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7">Go Back to Form</a>
    `);
});

// Random number route
server.get('/do_a_random', (req, res) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Start the server
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));











