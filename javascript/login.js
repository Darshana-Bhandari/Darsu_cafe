console.log("login.js loaded");

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.role-btn');
    const loginForm = document.getElementById('loginForm');
    const roleInput = document.getElementById('role');
    const currentRoleText = document.getElementById('currentRoleText');

    // Default to 'Admin' if nothing is set
    let selectedRole = roleInput?.value || 'Admin';

    const updateSelectedRole = (role) => {
        selectedRole = role;
        
        // Update the hidden input value so the form knows the role
        if (roleInput) {
            roleInput.value = selectedRole;
        }
        
        // Safely update text only if the element exists in HTML
        if (currentRoleText) {
            currentRoleText.textContent = `Selected role: ${selectedRole}`;
        }
        
        console.log("Role updated to:", selectedRole);
    };

    // Initialize default role on page load
    updateSelectedRole(selectedRole);

    // Attach click events to all role buttons
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent any accidental form submission from button clicks
            e.preventDefault(); 

            // Remove active class from all buttons, add to clicked one
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Grab the role from data-role attribute
            const role = button.dataset.role;
            updateSelectedRole(role);
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Always pull the freshest value from the hidden input field
            const currentRole = roleInput?.value || selectedRole;
            const normalizedRole = currentRole.toLowerCase().trim();
            
            console.log("Form submitting with role:", normalizedRole);

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) {
                alert('Please enter both email and password.');
                return;
            }

            // Route based on role
            if (normalizedRole === 'member') {
                console.log('Member login successful. Redirecting to homepage.');
                window.location.href = './Homepage.html';
                return;
            }

            if (normalizedRole === 'admin') {
                alert('Admin login successful!');
                return;
            }

            if (normalizedRole === 'visitor') {
                alert('Visitor login successful!');
                return;
            }

            alert('Please select a valid role before signing in.');
        });
    }
});