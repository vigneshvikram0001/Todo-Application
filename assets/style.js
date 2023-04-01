let input = document.getElementById("input");
let container = document.querySelector(".container");

const localStoraageItem = "itemName";

// gat data from local Storage and display in UI
document.addEventListener("DOMContentLoaded", () => {
  const todoList = [...JSON.parse(localStorage.getItem(localStoraageItem))];
  todoList.forEach((list) => {
    const valueD = list.foodItem;

    const result = addItem(valueD);
    const createLists = document.createElement("div");
    createLists.className = "lists";
    createLists.innerHTML = result;
    container.append(createLists);
  });
});

function addValue() {
  const valueD = input.value;
  const result = addItem(valueD);

  // store input datas in localstorage
  localStorage.setItem(
    localStoraageItem,
    JSON.stringify([
      ...JSON.parse(localStorage.getItem(localStoraageItem) || "[]"),
      { foodItem: input.value },
    ])
  );

  const createLists = document.createElement("div");
  createLists.className = "lists";
  createLists.innerHTML = result;
  if (input.value.length >= 3) {
    container.append(createLists);
  } else {
    alert("Invalid, Use more than 3 characters");
  }
  input.value = "";
  remove();
}

function addItem(valueD) {
  return `
    <h3 class="title">${valueD}</h3>
    <button class="remove">X</button>`;
}

function remove() {
  const trash = document.querySelectorAll(".remove");
  trash.forEach((item) => {
    item.addEventListener("click", (e) => {
      const removeItem = e.target.parentElement;
      removeItem.remove();

      // remove from local storage
      const RemovetodoList = [
        ...JSON.parse(localStorage.getItem(localStoraageItem)),
      ];
      RemovetodoList.forEach((item) => {
        if (item.foodItem == removeItem.children[0].textContent) {
          RemovetodoList.splice(RemovetodoList.indexOf(item), 1);
        }
      });

      localStorage.setItem(localStoraageItem, JSON.stringify(RemovetodoList));
    });
  });
}
