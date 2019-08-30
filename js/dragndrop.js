const dragAndDrop = () => {
  const items = document.querySelectorAll(".list-item");
  const lists = document.querySelectorAll(".list");

  // Fill listeners
  for (const item of items) {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
  }

  // Loop through empties and call drag events

  for (const list of lists) {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
  }

  //Drag functions
  function dragStart(e) {
    document.getElementsByClassName(
      "task-distr-section"
    )[0].innerHTML = taskDistrSection.render();
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("Text", e.target.getAttribute("id"));

    this.classList.add("hold");
    setTimeout(() => (this.classList.add("invisible"), 0));
    return true;
  }

  function dragEnd() {
    document.getElementsByClassName(
      "task-distr-section"
    )[0].innerHTML = taskDistrSection.render();
    this.classList.add("card");
    this.classList.remove("invisible", "hold", "hovered");
  }

  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
    this.classList.add("hovered");
    return true;
  }
  function dragLeave() {
    this.classList.add("empty");
    setTimeout(() => this.classList.remove("hovered", "empty"), 0);
  }
  function dragDrop(e) {
    let data = e.dataTransfer.getData("Text");
    this.appendChild(document.getElementById(data));
    e.stopPropagation();
    this.classList.add("empty");
    setTimeout(() => this.classList.remove("hovered", "empty"), 0);
    return false;
  }
};
