fetch("http://localhost:8080/names")
  .then((response) => response.json())
  .then(fillOutWebsite)
  .catch((err) => alert(err));

assignListener();

function fillOutWebsite(commits) {
  commits.forEach(createRow);
}

const tbodyRef = document
  .getElementById("myTable")
  .getElementsByTagName("tbody")[0];

function createRow(object) {
  // Insert a row at the end of table
  const newRow = tbodyRef.insertRow();

  // Insert a cell at the end of the row
  const nameCell = newRow.insertCell();
  const signatureCell = newRow.insertCell();

  // Append a text node to the cell
  nameCell.appendChild(document.createTextNode(object.name));
  signatureCell.appendChild(document.createTextNode(object.signing_date));
}

function assignListener() {
  document.getElementById("searchBtn").addEventListener("click", () => {
    const searchResult = document.getElementById("searchInput").value;

    fetch(`http://localhost:8080/names/${searchResult}`)
      .then((response) => response.json())
      .then(displaySearchResults)
      .catch((err) => alert(err));
  });
}

function displaySearchResults(user) {
  if (!user?.length) return;

  user = user[0];

  const tbodyRef = document
    .getElementById("searchTable")
    .getElementsByTagName("tbody")[0];

  removeAnyChildren(tbodyRef);

  const newRow = tbodyRef.insertRow();

  const nameCell = newRow.insertCell();
  const signatureCell = newRow.insertCell();

  nameCell.appendChild(document.createTextNode(user.name));
  signatureCell.appendChild(document.createTextNode(user.signing_date));
}

function removeAnyChildren(parent) {
  var child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
}
