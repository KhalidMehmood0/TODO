function update() {
  if (localStorage.getItem("itemsJson") == null) {
    //   console.log("hy");
    itemJsonArray = [];
    //   itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    //   console.log("bye");
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //   itemJsonArray.push([tit, desc]);
    //   localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }

  //populating the table
  tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${element.title}</td>
          <td>${element.description}</td>
          <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
          <td class="created-at" id="${element.created_at}"></td>
          </tr>
        `;
  });
  tableBody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function getAndUpdate() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
  const data = { title, description, created_at: Date.now() };
  itemJsonArray.push(data);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));

  update();
}

function deleted(itemIndex) {
  console.log("Deleted", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

function clearList() {
  if (confirm("Do you really wanna clear whole list?")) localStorage.clear();
  update();
}

setInterval(() => {
  let createdAtItems = document.getElementsByClassName("created-at");
  if (createdAtItems) {
    for (let i = 0; i < createdAtItems.length; i++) {
      const createdAtTime = Number(createdAtItems[i].id);
      const timeLimit = createdAtTime + 24 * 60 * 60 * 1000;
      const timeDifference = timeLimit - Date.now();
      const hour = Math.floor(timeDifference / (60 * 60 * 1000));
      const min = Math.floor((timeDifference / (60 * 1000)) % 60);
      const sec = Math.floor((timeDifference / 1000) % 60);
      createdAtItems[i].innerText = `${hour} : ${min} : ${sec}`;
    }
  }
}, 1000);
