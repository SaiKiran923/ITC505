document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM has been loaded and parsed successfully.");
    
    // Selecting the form element from the DOM
    const formElement = document.querySelector('form');

    // Handling the form submission
    formElement.addEventListener('submit', (event) => {
        event.preventDefault(); // Preventing default form submission behavior

        console.log("Form has been submitted.");

        // Retrieving user input values and removing extra spaces
        const nounInput = document.getElementById('noun').value.trim();
        const adjectiveInput = document.getElementById('adjective').value.trim();
        const verbInput = document.getElementById('verb').value.trim();
        const pluralNounInput = document.getElementById('pluralNoun').value.trim();
        const placeInput = document.getElementById('place').value.trim();

        // Checking if all fields are filled out
        if (!nounInput || !adjectiveInput || !verbInput || !pluralNounInput || !placeInput) {
            alert("Please make sure all fields are filled out.");
            return;
        }

        // Constructing the story string
        const madLibStory = `
            <h1>Your Mad Lib Adventure</h1>
            <p>
                In the land of <strong>${placeInput}</strong>, a <strong>${adjectiveInput}</strong> <strong>${nounInput}</strong>
                had a passion for <strong>${verbInput}</strong> alongside a team of <strong>${pluralNounInput}</strong>.
            </p>
            <button onclick="window.close()">Close Window</button>
        `;

        // Creating a new browser window
        const newWindowInstance = window.open("", "_blank", "width=600,height=400");

        // Writing the generated story to the new window
        if (newWindowInstance) {
            newWindowInstance.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Mad Libs Story</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            line-height: 1.6;
                            text-align: center;
                        }
                        button {
                            margin-top: 20px;
                            padding: 10px 20px;
                            font-size: 16px;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    ${madLibStory}
                </body>
                </html>
            `);
            newWindowInstance.document.close(); // Finalizing the content in the new window
        } else {
            alert("Popup was blocked. Please allow popups to see your story.");
        }
    });
});
