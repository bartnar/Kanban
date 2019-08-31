// ! Modal window section starts here

// Get modal element
const modalBoard = document.getElementById("newBoardModal");
// Get open modal button
const newBoardBtn = document.getElementById("newBoardBtn");
// Get close button
const closeBtn = document.getElementsByClassName("closeBtn")[0];

// Listen for the open click

newBoardBtn.addEventListener("click", openModal);

// Listen for the close click

closeBtn.addEventListener("click", closeModal);

// Listen for outside click

window.addEventListener("click", clickOutside);

// Function to open modal

function openModal() {
  modalInputAttention();
  modalBoard.style.display = "block";

  modalInputField.focus();
}

// Function to close modal

function closeModal() {
  modalBoard.style.display = "none";
}

// Function to close modal if outside click

function clickOutside(e) {
  if (e.target == modalBoard) {
    modalBoard.style.display = "none";
  }
}

// Listen for "esc" press

modalBoard.addEventListener("keydown", e => {
  if (e.keyCode === 27) {
    closeModal();
  }
});

// Get create button in modal window

const createBtn = document.getElementsByClassName("createBtn")[0];

// Get input field in modal window

const modalInputField = document.getElementById("boardName");

// Function to clear input field

function clearInput() {
  modalInputField.value = "";
}

// Function of modal input attention

function modalInputAttention() {
  modalInputField.style.outline = "inherit";
  modalInputField.addEventListener("keydown", e => {
    // Listen for "enter" press
    if (e.keyCode === 13 && document.getElementById("boardName").value === "") {
      modalInputField.style.outline = "red solid 1px";
    } else {
      modalInputField.style.outline = "inherit";
    }
  });
}

// Function to get board's name

function getName() {
  let name = document.getElementById("boardName").value;
  modalInputAttention();
  console.log(name);
  return name;
}

// Listen for "enter" press
modalBoard.addEventListener("keydown", e => {
  if (e.keyCode === 13 && document.getElementById("boardName").value !== "") {
    createBoard();
  }
});

// ! Modal window section ends here

// ! Adding new board in HTML with JS

//Checking if input is not empty

createBtn.addEventListener("click", () => {
  if (document.getElementById("boardName").value !== "") {
    createBoard();
  } else {
    modalInputField.style.outline = "red solid 1px";
  }
});

let idCounter = 1;
const setId = () => {
  for (let i = 1; i <= 1000; i++) {
    if (document.getElementById("board" + idCounter)) {
      idCounter++;
    }
  }
  return idCounter;
};
//Function to create DOM board structure

function createBoard() {
  let boardsSection = document.getElementById("wall-of-boards");
  let boardContainerWrapper = document.createElement("div");
  boardContainerWrapper.classList.add("board-wrapper");
  boardContainerWrapper.id = "board" + setId();
  boardsSection.prepend(boardContainerWrapper);
  let boardContainer = document.createElement("div");
  boardContainer.classList.add("board");

  boardContainerWrapper.append(boardContainer);

  // Create board title

  let title = document.createElement("h3");
  title.classList.add("board-title");
  title.innerHTML = getName();
  boardContainer.prepend(title);

  // Create board preview img with anchor
  let anchor = document.createElement("a");
  anchor.classList.add("desk");
  anchor.href = "/views/board.html";
  let img = document.createElement("img");
  img.src = "/img/board.png";
  img.alt = "board";
  anchor.append(img);
  boardContainer.append(anchor);

  // Create button container with round buttons
  let btnRoundContainer = document.createElement("div");
  btnRoundContainer.classList.add("btn-round-container");
  boardContainer.append(btnRoundContainer);

  // Making round buttons with it's own classes and id's
  for (let i = 0; i <= 2; i++) {
    let rndBtnClassArr = ["fa-trash", "fa-pencil-alt", "fa-cog"];
    let rndBtnFnClassArr = ["boardDelete", "boardEdit", "boardSettings"];
    let roundBtn = document.createElement("button");
    roundBtn.classList.add("round", "btn");
    let iTag = document.createElement("i");
    iTag.classList.add("fas", rndBtnClassArr[i], rndBtnFnClassArr[i]);
    roundBtn.append(iTag);
    btnRoundContainer.append(roundBtn);
  }

  // Close modal, clear it's input and runs essential functions
  closeModal();
  clearInput();
  deletion();
  changeName();
  getIntoBoard();
}

// ! End of Adding new board in HTML with JS

// ! Delete board
function deletion() {
  let deleteButtons = document
    .getElementById(["wall-of-boards"])
    .getElementsByClassName("boardDelete");
  Array.from(deleteButtons).forEach(function(deleteButton) {
    deleteButton.addEventListener("click", () => {
      let board = document.getElementById(["board" + idCounter]);
      board.remove();
    });
  });
}

// !Edit boards name
function changeName() {
  let changeButtons = document
    .getElementById(["wall-of-boards"])
    .getElementsByClassName("boardEdit");
  Array.from(changeButtons).forEach(function(changeButton) {
    changeButton.addEventListener("click", () => {
      let currName = document
        .getElementById(["board" + idCounter])
        .querySelector(".board h3");
      let newName = document.createElement("input");
      setTimeout(() => newName.focus(), 0);
      newName.name = "newHead";
      newName.id = "newHead";
      newName.type = "text";
      newName.style.fontSize = "2rem";
      newName.style.width = "500px";
      newName.value = currName.innerHTML;
      currName.parentNode.replaceChild(newName, currName);
      newName.addEventListener("keydown", e => {
        if (e.keyCode === 13) {
          currName.innerHTML = newName.value;
          newName.parentNode.replaceChild(currName, newName);
        }
      });
    });
  });
}

// !Board settings(just enters the board)

function getIntoBoard() {
  let settingsButtons = document
    .getElementById(["wall-of-boards"])
    .getElementsByClassName("boardSettings");
  Array.from(settingsButtons).forEach(function(settingsButton) {
    settingsButton.addEventListener("click", () => {
      location.href = "/views/board.html";
    });
  });
}
