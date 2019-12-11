// Registration
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((credentials) => {
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        }).catch((error) => {
            console.log('error :', error);
        });
});

// Logout
const logoutBtn = document.querySelector('#logout');
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    auth.signOut();
});