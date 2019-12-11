// Getting data
db.collection('guides')
    .get()
    .then((snapshot) => {
        setupGuides(snapshot.docs)
    }).catch((error) => {
        console.log('error while fetching guides, ', error);
    });

// Listening to auth status changes
auth.onAuthStateChanged(user => {
    // when the user value is valid (!= null) means that the user has just logged or signed in
    if (user) {
        console.log('good by');
        return;
    }
    // else means has just logged out
    console.log('hello');
});

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

// Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then((credentials) => {
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
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