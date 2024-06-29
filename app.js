let input = document.querySelector("input");
let contents = document.querySelector(".contents");
let removeAll = document.querySelector(".wrapper-right");
let remainTag = document.querySelector(".wrapper-left span");
let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let maxLenght = 10;

let notes = [];
removeAll.addEventListener("click", () => {
  notes = [];
  generatorTodo(notes);
  setToLocal(notes);
  clearInput();
  initActions();
});

function initActions() {
  input.focus();
  let tagsRaminging = maxLenght - notes.length;
  remainTag.innerHTML = tagsRaminging;
}

contents.addEventListener("mousemove", () => {
  input.focus();
});

function clearContents() {
  document.querySelectorAll(".content").forEach((item) => item.remove());
}

function summonTodo(item) {
  console.log(item);
  item.split(",").forEach((con) => {
    console.log(con);
    let newNote = {
      title: con,
      time : backTime()
    };
    notes.push(newNote);
  });
  initActions();
  generatorTodo(notes);
  setToLocal(notes);
  clearInput();
}

function clearInput() {
  input.value = "";
}

function setToLocal(item) {
  localStorage.setItem("todos", JSON.stringify(item));
}

function generatorTodo(items) {
  clearContents();
  items.forEach((item, index) => {
    contents.insertAdjacentHTML(
      "afterbegin",
      `
                        <div title="${item.time}" class="content">
                <div class="content__title">${item.title}</div>
                <span class="content__close" onclick="deleteHandler(this, ${index})">+</span>
            </div>
            `
    );
  });
}

function deleteHandler(item, index) {
  notes.splice(index, 1);
  console.log(index);
  generatorTodo(notes);
  setToLocal(notes);
  initActions();
  clearInput();
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (
      notes.length < 10 &&
      input.value &&
      input.value.trim() &&
      input.value.length <= 10
    ) {
      summonTodo(input.value);
    } else {
      alert(
        "pls Enter valid value🙏\nyour value should be less than 10 and morethan 1🧾\ndont forget maximum tags is 10🏷️🏷️"
      );
    }
  }
});

function getTodo() {
  let getData = localStorage.getItem("todos");
  if (getData) {
    notes = JSON.parse(getData);
  } else {
    notes = [];
  }
  return notes;
}

window.addEventListener("load", () => {
  let notes = getTodo();
  generatorTodo(notes);
  initActions();
});

function backTime() {
  let nowTime = new Date();
  let getHours = nowTime.getHours();
  let getDay = day[nowTime.getDay()];
  let getMinute = nowTime.getMinutes();
  let getSeconds = nowTime.getSeconds();
  if (getHours < 10) {
    getHours = "0" + getHours;
  }
  if (getMinute < 10) {
    getMinute = "0" + getMinute;
  }
  if (getSeconds < 10) {
    getSeconds = "0" + getSeconds;
  }

  return `${getDay}(${getHours}:${getMinute}:${getSeconds})`;
}
backTime();
