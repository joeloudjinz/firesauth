const guidesList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach(element => element.style.display = 'block');
    loggedOutLinks.forEach(element => element.style.display = 'none');
    accountDetails.innerHTML = `<div> Logged in as ${user.email} </div>`;
    db.collection('users')
      .doc(user.uid)
      .get()
      .then((result) => {
        accountDetails.innerHTML += `<div> Bio: ${result.data().bio} </div>`;
      }).catch((err) => {
        console.log(error);
      });
    return;
  }

  loggedOutLinks.forEach(element => element.style.display = 'block');
  loggedInLinks.forEach(element => element.style.display = 'none');
  accountDetails.innerHTML = '';
}

const setupGuides = (documents) => {
  let html = '';
  if (documents.length) {
    documents.forEach(doc => {
      const data = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${data.title}</div>
          <div class="collapsible-body white"><span>${data.content}</span></div>
        </li>
      `;
      html += li;
    });
  } else {
    html = '<h5 class="text-center">Login to see the guides list</h5>'
  }
  guidesList.innerHTML = html;

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});