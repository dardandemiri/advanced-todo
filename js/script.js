var inputValue = document.getElementById("inputItem"); //inputItem
var addIcon = document.querySelector(".addIcon"); //addIconChanger
var inputDiv = document.querySelector(".add");
var inputText = "";

addIcon.addEventListener("click", showInput);

function showInput() {
  inputDiv.style.opacity == 1 ? inputDiv.style.opacity = 0 : inputDiv.style.opacity = 1;
  $("#addIconChanger").toggleClass('fa-plus fa-level-down-alt');
  inputValue.addEventListener("keypress", function (event) {
    inputText = inputValue.value;
    if (event.keyCode == 13) {
      if (inputText != "") {
        addItemToList(inputText);
        inputValue.value = "";
        inputValue.setAttribute("placeholder", "Press Enter to add to-do");

      } else {
        inputValue.setAttribute("placeholder", "You should write something...");
      }
    }

  });
}


function addItemToList(inputText) {
  $(".itemContainer").append(createHTML(inputText, ));
}

// Create the HTML for the given Item
function createHTML(value, ) {
  var html;

  html = '<div class="row item">';
  html += '<div class="col-10 text d-flex align-items-center">';
  html += '<p class="ml-2">' + value + '</p></div>';
  html += '<div class="col-2 icon d-flex align-items-center justify-content-center">';
  html += '<i class = "far fa-trash-alt trashIcon"></i>';
  html += '</div></div>';

  return html;
}

$(".itemContainer").on("click", "p", function () {
  $(this).toggleClass("done");
});

$(".itemContainer").on("click", ".icon", function (event) {
  $(this).parent().fadeOut(500, function () {
    $(this).remove();

  });
});