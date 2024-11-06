document.addEventListener("DOMContentLoaded", function () {
    const clerkPublishableKey = 'pk_test_c2ltcGxlLW1hcnRpbi04My5jbGVyay5hY2NvdW50cy5kZXYk'; // Ensure this is correct

    // Check if Clerk is loaded
    if (typeof Clerk === "undefined") {
        console.error("Clerk SDK not loaded. Please check your script source.");
        return;
    }

    if (!clerkPublishableKey) {
        console.error("Missing Clerk publishableKey. Please provide a valid publishable key.");
        return;
    }

    // Initialize Clerk with the publishable key
    Clerk.load({
        publishableKey: clerkPublishableKey,
    }).then(() => {
        // Successfully loaded Clerk
        const clerk = Clerk;

        // Mount the Clerk sign-in form
        clerk.mountSignIn('#clerk-login');

        // Listen for successful login and redirect to dashboard
        clerk.addListener("auth:afterSignIn", () => {
            window.location.href = 'dashboard.html';
        });

        // Handle any errors
        clerk.addListener("auth:error", (error) => {
            document.getElementById('error-message').textContent = error.message;
        });
    }).catch((err) => {
        console.error("Clerk failed to load:", err);
    });
});
