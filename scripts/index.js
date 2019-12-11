const guidesList = document.querySelector('.guides');
const setupGuides = (documents) => {
  let html = '';
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

  guidesList.innerHTML = html;
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});