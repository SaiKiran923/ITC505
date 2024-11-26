document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const fields = {
        noun: document.getElementById("noun"),
        verb: document.getElementById("verb"),
        adjective: document.getElementById("adjective"),
        pluralNoun: document.getElementById("pluralNoun"),
        place: document.getElementById("place")
    };

    const patterns = {
        noun: /^[a-zA-Z]{2,}$/,
        verb: /^[a-zA-Z]{2,}$/,
        adjective: /^[a-zA-Z]{2,}$/,
        pluralNoun: /^[a-zA-Z]{2,}s$/,
        place: /^[a-zA-Z\s]{2,}$/
    };

    // Real-time validation
    Object.keys(fields).forEach((key) => {
        fields[key].addEventListener("input", function () {
            validateField(fields[key], patterns[key]);
        });
    });

    // Form submission event
    form.addEventListener("submit", function (event) {
        let valid = true;

        // Validate all fields before submission
        Object.keys(fields).forEach((key) => {
            if (!validateField(fields[key], patterns[key])) {
                valid = false;
            }
        });

        if (!valid) {
            event.preventDefault();
            alert("Please fix the highlighted errors before submitting the form.");
        }
    });

    // Function to validate individual fields
    function validateField(field, pattern) {
        if (pattern.test(field.value)) {
            field.style.borderColor = "green";
            field.setCustomValidity(""); // Clear any custom error message
            return true;
        } else {
            field.style.borderColor = "red";
            field.setCustomValidity("Invalid input.");
            return false;
        }
    }
});
