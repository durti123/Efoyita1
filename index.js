document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formResult = document.getElementById("formResult");
    const contactMessage = document.getElementById("contactMessage");
    const volunteerTriggers = document.querySelectorAll(".volunteer-trigger");

    // 1. When "Apply to Volunteer" is clicked: scroll and pre-fill the form
    volunteerTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            // If you have the textarea field in your contact form, pre-fill it
            if (contactMessage) {
                contactMessage.value = "Hello ERSI Team,\n\nI am interested in becoming a volunteer! I would love to help out with [mentoring / community outreach / events].\n\nPlease let me know how I can get started.\n\nBest regards,";
                contactMessage.focus(); // Places the user's cursor inside the box
            }
        });
    });

    // 2. Handle Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent page reload

            formResult.innerHTML = "Sending your message...";
            formResult.style.color = "#4a5568";

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

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
                    formResult.innerHTML = "✓ Message sent successfully! Our team will contact you shortly.";
                    formResult.style.color = "#0a5c53"; // Teal
                    contactForm.reset(); 
                } else {
                    formResult.innerHTML = jsonResponse.message || "An error occurred. Please try again.";
                    formResult.style.color = "#e07a5f"; // Rust
                }
            })
            .catch(error => {
                console.error(error);
                formResult.innerHTML = "Could not reach server. Please check your internet connection.";
                formResult.style.color = "#e07a5f";
            });
        });
    }
});
