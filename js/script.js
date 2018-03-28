var inputValue = document.getElementById("inputItem"); //inputItem
var addIcon = document.querySelector(".addIcon"); //addIconChanger
var inputDiv = document.querySelector(".add");
var inputText = "";

addIcon.addEventListener("click", showAndStoreInput);
inputValue.addEventListener("keypress", showAndStoreInput);


function showAndStoreInput(event) {

  if (event.keyCode == 13 || event.type == "click") {
    inputText = inputValue.value;

    if (inputText != "") {
      var toDo = {
        name: inputText,
        isStriked: false
      };

      if (localStorage.getItem("todos") === null) {
        var todos = [];
        todos.push(toDo);
        addItemToList(toDo.name);
        localStorage.setItem("todos", JSON.stringify(todos));
      } else {
        var todos = JSON.parse(localStorage.getItem("todos"));
        todos.push(toDo);
        addItemToList(toDo.name);
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      inputValue.value = "";
      inputValue.setAttribute("placeholder", "Press Enter to add to-do");

    } else {
      inputValue.setAttribute("placeholder", "You should write something...");
    }

  }
}


var firstLoad = true;

function manageStorage(inputText, striked) {

  if (firstLoad) {
    if (localStorage.getItem("todos") !== null) {
      var todos = JSON.parse(localStorage.getItem("todos"));
      todos.forEach((el) => {
        addItemToList(el.name, el.isStriked);
      });
    }
    firstLoad = false;
  } else {
    addItemToList(inputText);
  }
}
manageStorage();

function addItemToList(inputText, striked) {
  $(".itemContainer").append(createHTML(inputText, striked));
}

function createHTML(value, striked) {
  var html;
  var doneClass;

  if (striked) {
    doneClass = "done";
  } else {
    doneClass = "";
  }

  html = '<div class="row item">';
  html += '<div class="col-10 text d-flex align-items-center">';
  html += '<p class="ml-2 ' + doneClass + '">' + value + '</p></div>';
  html += '<div class="col-2 icon d-flex align-items-center justify-content-center">';
  html += '<i class = "far fa-trash-alt trashIcon"></i>';
  html += '</div></div>';

  return html;
}

$(".itemContainer").on("click", "p", function () {
  $(this).toggleClass("done");
  var todos = JSON.parse(localStorage.getItem("todos"));
  var todoInList = this.textContent;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].name === todoInList) {
      if (todos[i].isStriked == true) {
        todos[i].isStriked = false;
      } else {
        todos[i].isStriked = true;
      }
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
});

$(".itemContainer").on("click", ".icon", function (event) {
  $(this).parent().fadeOut(500, function () {
    $(this).remove();
    deleteThisTodo(this);
  });
});

function deleteThisTodo(element) {
  var todos = JSON.parse(localStorage.getItem("todos"));
  var todoInList = element.children[0].children[0].textContent;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].name === todoInList) {
      todos.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
}