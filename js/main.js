//! Animations

const header = document.querySelector(".main-header");
const headerContent = document.querySelector(".sticky-width-header");
const boardsWall = document.querySelector(".wall-of-boards");

const pageTl = new TimelineMax();

function animateBoard() {
  let fileName = location.pathname.split("/").slice(-1);
  if (fileName == "index.html") {
    pageTl
      .fromTo(boardsWall, 1.0, { opacity: "0" }, { opacity: "1" })
      .fromTo(boardsWall, 1.3, { scale: "1.1" }, { scale: "1.0" }, "-=1");
  }
}

function startAnimation() {
  let fileName = location.pathname.split("/").slice(-1);
  if (fileName == "index.html") {
    pageTl
      .fromTo(header, 1.0, { x: "100%" }, { x: "0%", ease: Power2.easeInOut })
      .fromTo(headerContent, 1.0, { opacity: "0" }, { opacity: "1" });
  }
}

startAnimation();
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
  let rndBtnClassArr = ["fa-trash", "fa-pencil-alt", "fa-cog"];
  let rndBtnFnClassArr = ["boardDelete", "boardEdit", "boardSettings"];
  let nameOfTheBoard = document.getElementById("boardName").value;
  setId();
  let Create = {
    render: () => {
      let view = /*html*/ `
      
            <div class="board-wrapper" id="board${idCounter}">
              <div class="board">
                <h3 class="board-title">${nameOfTheBoard}</h3>
                <a href="/views/board.html" class="desk"
                  ><img src="/img/board.png" alt="board"
                /></a>
                <div class="btn-round-container">
                  <button onclick='deletion(board${idCounter})' class="round btn">
                    <i class="fas fa-trash boardDelete"></i>
                  </button>
                  <button onclick='changeName(board${idCounter})' class="round btn">
                    <i class="fas fa-pencil-alt boardEdit"></i>
                  </button>
                  <button onclick='getIntoBoard()' class="round btn"><i class="fas fa-cog boardSettings"></i></button>
                </div>
              </div>
            </div>

      `;
      return view;
    }
  };

  document.getElementById(["wall-of-boards"]).innerHTML =
    Create.render() + document.getElementById(["wall-of-boards"]).innerHTML;

  // Close modal, clear it's input and runs essential functions
  closeModal();
  clearInput();
  animateBoard();
}

// ! End of Adding new board in HTML with JS

// ! Delete board
function deletion(board) {
  currId = board.id;
  let boardCurr = document.getElementById(currId);
  boardCurr.remove();
}

// !Edit boards name
function changeName(board) {
  currId = board.id;
  let changeButton = document.getElementById(currId);
  let currName = changeButton.querySelector(".board h3");
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
}

// !Board settings(just enters the board)

function getIntoBoard() {
  location.href = "/views/board.html";
}
