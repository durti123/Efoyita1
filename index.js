document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formResult = document.getElementById("formResult");

    // Only run if the contact form exists on the page
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the page from reloading/refreshing

            // 1. Show immediate loading state
            formResult.innerHTML = "Sending your message...";
            formResult.style.color = "#4a5568"; // Neutral gray text

            // 2. Package the form data
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // 3. Send data to Web3Forms securely in the background
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                
                if (response.status === 200) {
                    // Success state
                    formResult.innerHTML = "✓ Message sent successfully! Our team will contact you shortly.";
                    formResult.style.color = "#0a5c53"; // Brand Teal Green
                    contactForm.reset(); // Clear the form fields
                } else {
                    // API Error state
                    formResult.innerHTML = jsonResponse.message || "An error occurred. Please try again.";
                    formResult.style.color = "#e07a5f"; // Terracotta Red
                }
            })
            .catch(error => {
                // Connection/Network Error state
                console.error(error);
                formResult.innerHTML = "Could not reach server. Please check your internet connection.";
                formResult.style.color = "#e07a5f";
            });
        });
    }
});
