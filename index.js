document.addEventListener("DOMContentLoaded", () => {
    // 1. Get DOM Elements
    const volunteerButtons = document.querySelectorAll('a[href="mailto:info@efoyita.org"], .btn-alt[href="#volunteer"]');
    const modal = document.getElementById("volunteerModal");
    const closeModalBtn = document.getElementById("closeModal");
    const volunteerForm = document.getElementById("volunteerForm");

    // 2. Open Modal when clicking "Apply to Volunteer"
    volunteerButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Prevent default mailto or anchor link behavior
            e.preventDefault(); 
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        });
    });
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formResult = document.getElementById("formResult");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Stop page from reloading
            
            formResult.innerHTML = "Sending... Please wait.";
            formResult.style.color = "#4a5568";

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Send form data in the background
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
                    // Success!
                    formResult.innerHTML = "✓ Message sent successfully! We will contact you soon.";
                    formResult.style.color = "#0a5c53"; // Forest green style
                    contactForm.reset(); // Clear the form inputs
                } else {
                    // Something went wrong on the API side
                    console.log(response);
                    formResult.innerHTML = jsonResponse.message || "An error occurred. Please try again.";
                    formResult.style.color = "#e07a5f"; // Rust red style
                }
            })
            .catch(error => {
                console.log(error);
                formResult.innerHTML = "Something went wrong. Check your internet connection.";
                formResult.style.color = "#e07a5f";
            });
        });
    }
});
    // 3. Close Modal functions
    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable background scrolling
        volunteerForm.reset(); // Reset form fields
    };

    closeModalBtn.addEventListener("click", closeModal);

    // Close if clicking outside the modal content box
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 4. Handle Form Submission
    volunteerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get Form Values
        const name = document.getElementById("volName").value.trim();
        const email = document.getElementById("volEmail").value.trim();
        const role = document.getElementById("volRole").value;
        const message = document.getElementById("volMessage").value.trim();

        // Simple validation
        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        // Construct email subject and body dynamically
        const emailTo = "info@efoyita.org";
        const subject = encodeURIComponent(`ERSI Volunteer Application: ${name}`);
        const body = encodeURIComponent(
            `Hello ERSI Team,\n\n` +
            `My name is ${name}, and I would love to volunteer with you.\n\n` +
            `Preferred Role: ${role}\n` +
            `My Email: ${email}\n\n` +
            `About Me / Why I want to join:\n${message}\n\n` +
            `Best regards,\n${name}`
        );

        // Open user's mail client with pre-filled draft
        window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

        // Show instant user feedback on the page
        const modalBody = document.querySelector(".modal-content");
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <span style="font-size: 3rem;">✉️</span>
                <h3 style="color: #0a5c53; margin-top: 1rem;">Thank you, ${name}!</h3>
                <p style="margin-top: 0.5rem; color: #4a5568;">Your email application draft has been created. Please click send in your mail app to submit it to us!</p>
                <button onclick="location.reload()" class="btn" style="margin-top: 1.5rem; border: none; cursor: pointer;">Close</button>
            </div>
        `;
    });
});
