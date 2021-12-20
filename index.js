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
          <td>${element[0]}</td>
          <td>${element[1]}</td>
          <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
        </tr>
        `;
    });
    tableBody.innerHTML = str;
  }
  add = document.getElementById("add");
  add.addEventListener("click", getAndUpdate);
  update();

  function getAndUpdate() {
    tit = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    if (localStorage.getItem("itemsJson") == null) {
      //   console.log("hy");
      itemJsonArray = [];
      itemJsonArray.push([tit, desc]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
      //   console.log("bye");
      itemJsonArrayStr = localStorage.getItem("itemsJson");
      itemJsonArray = JSON.parse(itemJsonArrayStr);
      itemJsonArray.push([tit, desc]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
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
    if (confirm("Do you really wanna clear whole list?"))
      localStorage.clear();
    update();
  }