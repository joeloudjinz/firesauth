// Listening to auth status changes
auth.onAuthStateChanged(user => {
    // when the user value is valid (!= null) means that the user has just logged or signed in
    if (user) {
        // Getting data
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs)
        });
        setupUI(user);
        return;
    }
    // else means has just logged out
    setupUI();
    setupGuides([]);
});

// Creating guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = createForm['title'].value;
    const content = createForm['content'].value;

    db.collection('guides')
        .add({
            title,
            content
        })
        .then((result) => {
            const modal = document.querySelector('#modal-create');
            M.Modal.getInstance(modal).close();
            createForm.reset();
            console.log('guide inserted, ', result);
        })
        .catch((error) => {
            console.log('error while inserting guide, ', error);
        });;
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