document.getElementById("boardName").getElementsByTagName("h2")[0].innerHTML =
  "Name";
// ! Filters section
window.onhashchange = () => {
  document.querySelector(".activeFilter").textContent = location.hash
    .split("#")
    .slice(-1);
};

//search
const searchBar = document.getElementById("search");
searchBar.addEventListener("keyup", function(e) {
  const term = e.target.value.toLowerCase();
  const cards = document.getElementsByClassName("list-item");
  Array.from(cards).forEach(function(card) {
    const epic = card.getElementsByClassName("filter");
    if (epic[0].innerHTML.toLowerCase().indexOf(term) != -1) {
      card.style.display = "";
      let quantity = document.getElementsByClassName("quantity");
    } else {
      card.style.display = "none";
      let quantity = document.getElementsByClassName("quantity");
      for (let i = 0; i < quantity.length; i++) {
        quantity[i].style.display = "none";
      }
    }
  });
});

//
// all filter
document.getElementById("all").addEventListener("click", () => {
  let cards = document.querySelectorAll(".list-item");
  Array.from(cards).forEach(function(card) {
    card.style.display = "";
  });
});
//
// high priority filter
document.getElementById("highPriority").addEventListener("click", () => {
  let cards = document.querySelectorAll(".list-item");
  Array.from(cards).forEach(function(card) {
    if (!card.classList.contains("high")) {
      card.style.display = "none";
    }
  });
});

document.getElementById("recentlyUpdated").addEventListener("click", () => {
  let now = new Date();
  let currentHour = now.getHours();
  let cards = document.querySelectorAll(".list-item");
  Array.from(cards).forEach(function(card, i) {
    if (
      currentHour !=
      +card
        .querySelector(".time")
        .textContent.split(" ")[1]
        .split(":")[0]
    ) {
      card.style.display = "none";
    }
  });
});

// !

// !Open side menu

function openMenu(currentCard) {
  let currentId = currentCard.id;

  document.getElementById("side-menu").style.width = "20%";
  document.getElementById("side-menu").style.border =
    "3px solid rgba(0, 0, 0, 0.67)";
  document.getElementById("app").style.transition = "0.7s";
  document.getElementById("app").style.marginRight = "20%";
  document.getElementsByClassName(
    "task-distr-section"
  )[0].style.backgroundColor = "rgba(103, 128, 159, 1)";
  let longName = document
    .getElementById("addTaskForm")
    .querySelector("#taskName").value;

  let name = document
    .getElementById(currentId)
    .querySelector(".card-title > a > h3").innerHTML;
  let description = document
    .getElementById(currentId)
    .querySelector(".card-content > p").innerHTML;
  let currentClassList = document
    .getElementById(currentId)
    .className.split(" ");
  priority = currentClassList[currentClassList.length - 1];
  let sideMenu = {
    render: () => {
      let view = /*html*/ `
      <a href="#" class="close-side-menu" onclick="closeSideMenu(${currentId})"
          >&times;</a
        >
      <div class="elements-container">
      
      <div class="card-name">
        <h3>${longName}</h3>
        <a href="#"><h3>${name}</h3></a>
      </div>
      <p>
      <label for="task-menu-description">
            Task description
            <textarea
              name="task-menu-description"
              id="task-menu-description"
              class="task-menu-description"
              maxlength="1000"
              required
            >${description}</textarea>
          </label>
      
      </p>
      <label for="task-menu-priority">
        Task priority
        <select
          name="task-menu-priority"
          id="task-menu-priority"
          class="task-menu-priority"
        >
          <option value="low">Low</option>
          <option value="standard">Standard</option>
          <option value="high">High</option>
        </select>
      </label>
      <label for="task-menu-type">
        Type of task
        <select
          name="task-menu-type"
          id="task-menu-type"
          class="task-menu-type"
        >
          <option value="memo">Memo</option>
          <option value="defect">Defect</option>
          <option value="feature">Feature</option>
        </select>
      </label>
      <div class="epic">
        <div class="currMarks">
        <div class="currMark"><span class="delete" onclick="delEpic(${currentId})">&times;</span>
        <span class='mark'>mark</span>
        </div>
        </div>
        <input class="markInput" type="text" placeholder="Epic" />
        <button class="addMarkButton" onclick="addMark(${currentId})">Apply changes</button>
      </div>
    </div>
          `;
      return view;
    }
  };
  document.getElementById(["side-menu"]).innerHTML = sideMenu.render();
  document.querySelector(".task-menu-priority").value = priority;

  let type = document
    .getElementById(currentId)
    .querySelector(".fas")
    .className.split(" ")[
    document
      .getElementById(currentId)
      .querySelector(".fas")
      .className.split(" ").length - 2
  ];

  let swType = () => {
    switch (type) {
      case "fa-book":
        type = "memo";

        break;
      case "fa-laptop-medical":
        type = "defect";
        break;
      case "fa-check-square":
        type = "feature";
        break;
    }
    return type;
  };

  document.querySelector(".task-menu-type").value = swType();

  document.querySelector(
    ".currMark > .mark"
  ).innerHTML = document
    .getElementById(currentId)
    .querySelector(".card-filters > .filter").innerHTML;
  document.querySelector(".markInput").value = document.querySelector(
    ".currMark > .mark"
  ).innerHTML;

  longNameChange();
  // console.log(longNameChange());
}
// Doesn't saves result on reopen
function longNameChange() {
  document.querySelector(".card-name h3").addEventListener("dblclick", () => {
    let head = document.querySelector(".card-name h3");
    let inputHead = document.createElement("input");
    inputHead.focus();
    inputHead.name = "newHead";
    inputHead.id = "newHead";
    inputHead.type = "text";
    inputHead.value = head.innerHTML;
    head.parentNode.replaceChild(inputHead, head);
    inputHead.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        head.innerHTML = inputHead.value;
        longName = inputHead.value;
        inputHead.parentNode.replaceChild(head, inputHead);
      }
    });
  });
  return document.querySelector(".card-name h3").innerHTML;
}

function addMark(currentCard) {
  closeSideMenu(currentCard);
  openMenu(currentCard);
}

function delEpic(currentCard) {
  let currentId = currentCard.id;
  document
    .getElementById(currentId)
    .querySelector(".card-filters .filter").textContent = "";
  openMenu(currentCard);
}

// ! Close side menu

function closeSideMenu(currentCard) {
  document.getElementById("side-menu").style.border = "none";
  document.getElementById("side-menu").style.width = "0";
  document.getElementById("app").style.marginRight = "0";
  document.getElementsByClassName(
    "task-distr-section"
  )[0].style.backgroundColor = "";
  let currentId = currentCard.id;
  // Changing task description
  let textArea = document.querySelector(".task-menu-description").value;

  document
    .getElementById(currentId)
    .querySelector(".card-content > p").innerHTML = textArea;
  //
  // Changing task priority
  let taskPriority = document.querySelector(".task-menu-priority").value;

  let cardClassesArray = document
    .getElementById(currentId)
    .className.split(" ");
  let oldClass = cardClassesArray[cardClassesArray.length - 1];
  let newClass = taskPriority;
  document.getElementById(currentId).classList.replace(oldClass, newClass);
  //
  // Changing task type
  let currType = document.querySelector(".task-menu-type").value;
  let swType = () => {
    switch (currType) {
      case "memo":
        currType = "fa-book";
        break;
      case "defect":
        currType = "fa-laptop-medical";
        break;
      case "feature":
        currType = "fa-check-square";
        break;
    }
    return currType;
  };
  let newType = swType();
  let currCardType = document
    .getElementById(currentId)
    .querySelector(".fas")
    .className.split(" ")[
    document
      .getElementById(currentId)
      .querySelector(".fas")
      .className.split(" ").length - 2
  ];
  document
    .getElementById(currentId)
    .querySelector(".fas")
    .classList.replace(currCardType, newType);
  //

  // Changing arrows when priority changes
  let currArrow = document
    .getElementById(currentId)
    .querySelectorAll(".fas")[1]
    .className.split(" ")[1];
  let swArrow = () => {
    switch (currArrow) {
      case "fa-ban":
        if (oldClass === "low" && (taskPriority === "standard" || "high")) {
          currArrow = "fa-arrow-up";
        } else if (oldClass === "standard" && taskPriority === "high") {
          currArrow = "fa-arrow-up";
        } else if (
          oldClass === "high" &&
          (taskPriority === "standard" || "low")
        ) {
          currArrow = "fa-arrow-down";
        } else if (oldClass === "standard" && taskPriority === "low") {
          currArrow = "fa-arrow-down";
        }
        break;
      case "fa-arrow-up":
        if (oldClass === "standard" && taskPriority === "low") {
          currArrow = "fa-arrow-down";
        } else if (
          oldClass === "high" &&
          (taskPriority === "standard" || "low")
        ) {
          currArrow = "fa-arrow-down";
        }
        break;
      case "fa-arrow-down":
        if (oldClass === "standard" && taskPriority === "low") {
          currArrow = "fa-arrow-down";
        } else if (
          oldClass === "low" &&
          (taskPriority === "standard" || "high")
        ) {
          currArrow = "fa-arrow-up";
        }
        // currArrow = "fa-check-square";
        break;
    }
    return currArrow;
  };

  newArrow = swArrow();

  document
    .getElementById(currentId)
    .querySelectorAll(".fas")[1]
    .classList.replace(
      document.getElementById(currentId).querySelectorAll(".fas")[1]
        .classList[1],
      newArrow
    );
  //

  let mark = document.querySelector(".markInput").value;
  document
    .getElementById(currentId)
    .querySelector(".card-filters .filter").textContent = mark;

  document.querySelector(".card-name h3").innerHTML = longNameChange();
}

// !New task modal section
let modalT = {
  render: () => {
    let view = /*html*/ `
        <div class="modal-content task">
          <div class="modal-header">
            <span class="closeBtn">&times;</span>
            <h3>New task</h3>
          </div>
          <form id="addTaskForm" class="addTaskForm" action="">
            <label for="taskName">
              Название задачи
              <input
                type="text"
                name="taskName"
                id="taskName"
                placeholder="Enter name"
                maxlength="100"
                required
              />
            </label>
            <label for="priority">
              Приоритет задачи
              <select name="priority" id="priority">
                <option value="low">Low</option>
                <option value="standard">Standard</option>
                <option value="high">High</option>
              </select>
            </label>
            <label for="type">
              Тип задачи
              <select name="type" id="type">
                <option value="memo">Memo</option>
                <option value="defect">Defect</option>
                <option value="feature">Feature</option>
              </select>
            </label>
            <label for="profilePhoto">
              Фото ответственного за задачу человека
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                accept="image/*"
              />
            </label>
            <label for="description">
              Описание задачи
              <textarea
                name="description"
                id="description"
                maxlength="1000"
                required
              ></textarea>
            </label>
          </form>

          <button type="submit" class="createTaskBtn btn">Create</button>
        </div>
        `;
    return view;
  }
};

const modalTask = document.getElementById("newTaskModal");

modalTask.innerHTML = modalT.render();

const newTaskBtn = document.getElementById("newTaskBtn");

newTaskBtn.addEventListener("click", () => {
  modalTask.style.display = "block";
  document.getElementById("taskName").focus();
  document.getElementById("taskName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("profilePhoto").value = "";
});

document.getElementsByClassName("closeBtn")[0].addEventListener("click", () => {
  modalTask.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target == modalTask) {
    modalTask.style.display = "none";
  }
});

modalTask.addEventListener("keydown", e => {
  if (e.keyCode === 27) {
    modalTask.style.display = "none";
  }
});

// Function to set individual ID to cards
let idCounter = 1;
const setId = () => {
  for (let i = 1; i <= 1000; i++) {
    if (document.getElementById("card" + idCounter)) {
      idCounter++;
    }
  }
  return idCounter;
};

const createTaskBtn = document.getElementsByClassName("createTaskBtn")[0];

createTaskBtn.addEventListener("click", createTask);

function createTask() {
  if (
    document.getElementById("taskName").value !== "" &&
    document.getElementById("description").value !== ""
  ) {
    setId();
    // Function to set priority to card
    function setPriority() {
      let priority = document.getElementById("priority").value;
      return priority;
    }

    let taskName = document.getElementById("taskName").value;
    // Function to make the name an abbreviation
    let abbreviation = str => {
      return str
        .split(" ")
        .map(eachFirstLetter => eachFirstLetter[0].toUpperCase())
        .join("");
    };
    let description = document.getElementById("description").value;
    // Function to make first letter of description capital
    let capitalLetter = str => {
      let arr = str.split("");
      let capLetter = str[0].toUpperCase();
      arr.splice(0, 1, capLetter);
      let result = arr.join("");
      return result;
    };

    function setType() {
      let type = document.getElementById("type").value;
      let result = "";
      switch (type) {
        case "memo":
          result = "fa-book";
          break;
        case "defect":
          result = "fa-laptop-medical";
          break;
        case "feature":
          result = "fa-check-square";
          break;
      }
      return result;
    }

    // To set any photo, previously add it to "img" folder
    function setPhoto() {
      let profilePhoto = document
        .getElementById("profilePhoto")
        .value.split("\\")
        .slice(-1);
      return profilePhoto;
    }

    let task = {
      render: () => {
        let view = /*html*/ `
                
                <div onclick="openMenu(this)" id="card${setId()}" class="card card${setId()} list-item ${setPriority()}" draggable="true">
                    <figure class="front">  
                    <div class="type-priority-wrapper">
                        <i class="fas ${setType()} card-img"></i>
                        <i class="fas fa-ban card-img"></i>
                      </div>
                      <div class="card-title">
                        <a href="#"><h3 style="text-transform: uppercase">${abbreviation(
                          taskName
                        )}</h3></a>
                      </div>
        
                      <div class="card-content">
                            <p>${capitalLetter(description)}</p>
                      </div>
                      <div class="card-photo">
                        <img src="/img/profile-pictures/${setPhoto()}" alt="photo" />
                      </div>
                      <div class="card-filters">
                        <span class="filter"></span>
                      </div>
                      <div id='time${setId()}' class="time"></div>
                    </figure>
                    <figure class="back"> <img src="/img/checked.svg" alt="checked" style= "pointer-events: none;
                    user-select: none;">
                    </figure>
                    </div>
                
                `;
        return view;
      }
    };

    document.getElementById("todo").innerHTML += task.render();
    modalTask.style.display = "none";

    // Getting current time of task creation

    let now = new Date();
    let createdAt =
      now.getDate() +
      "-" +
      ("0" + (now.getMonth() + 1)) +
      " " +
      now.getHours() +
      ":" +
      now.getMinutes();
    document.getElementById("time" + idCounter).innerHTML = createdAt;
  }

  dragAndDrop();
  document.getElementsByClassName(
    "task-distr-section"
  )[0].innerHTML = taskDistrSection.render();
}

// !End of new task modal

// !Task distribution section start

let taskDistrSection = {
  render: () => {
    let view = /*html*/ `
        <ul class="tags">
            <li class="tag"><span class="quantity">${
              document.getElementById("todo").querySelectorAll(".card").length
            }</span>To do</li>
            <li class="tag"><span class="quantity">${
              document.getElementById(["in-progress"]).querySelectorAll(".card")
                .length
            }</span>In progress</li>
            <li class="tag"><span class="quantity">${
              document.getElementById("done").querySelectorAll(".card").length
            }</span>Done</li>
          </ul>
        `;
    return view;
  }
};
document.getElementsByClassName(
  "task-distr-section"
)[0].innerHTML = taskDistrSection.render();

// !Working in progress
// const newDistrBtn = document.getElementById("newDistrBtn");

// newDistrBtn.addEventListener("click", () => {
//   let column = {
//     renderCol: () => {
//       let view = /*html*/ `
//             <li class="tag"><span class="quantity">${
//               document.getElementById("todo").querySelectorAll(".card").length
//             }</span>To do</li>
//             `;
//       return view;
//     },
//     render: () => {
//       let view = /*html*/ `
//         <section id="new" class="new list"></section>
//         `;
//       return view;
//     }
//   };
//   document.getElementsByClassName("tags")[0].style.gridTemplateColumns =
//     "repeat(4, 1fr)";
//   document.getElementsByClassName("lists")[0].innerHTML += column.render();
//   document.getElementsByClassName("tags")[0].innerHTML += column.renderCol();
// });
// !

// !Task distribution section end
