const header = document.querySelector(".main-header");
const headerContent = document.querySelector(".sticky-width-header");
const boardsWall = document.querySelector(".wall-of-boards");
const name = document.getElementById("boardName");
const filters = document.querySelector([".filters-wrapper"]);
const app = document.getElementById("app");
const pageTl = new TimelineMax();

let fileName = location.pathname.split("/").slice(-1);

if (fileName == "index.html") {
  pageTl
    .fromTo(header, 1.0, { x: "100%" }, { x: "0%", ease: Power2.easeInOut })
    .fromTo(boardsWall, 1.0, { opacity: "0" }, { opacity: "1" })
    .fromTo(headerContent, 1.0, { opacity: "0" }, { opacity: "1" }, "-=1")
    .fromTo(boardsWall, 1.3, { scale: "1.1" }, { scale: "1.0" }, "-=1");
} else if (fileName == "board.html") {
  pageTl
    .fromTo(header, 2.0, { opacity: "0" }, { opacity: "1" })
    .fromTo(
      header,
      1.0,
      { y: "-100%" },
      { y: "0%", ease: Power2.easeInOut },
      "-=2"
    )
    .fromTo(name, 1.0, { y: "100%" }, { y: "0%" }, "-=2")
    .fromTo(name, 2.0, { opacity: "0" }, { opacity: "1" }, "-=2")
    .fromTo(filters, 1.0, { x: "100%" }, { x: "0%" }, "-=1.5")
    .fromTo(app, 1.0, { x: "-100%" }, { x: "0%" }, "-=1.5");
}

// const sideMenu = document.getElementById("side-menu");

// const sideMenuTl = new TimelineMax();

// const animSideMenu = () => {
//   sideMenuTl.fromTo(
//     sideMenu,
//     0.4,
//     { x: "100%" },
//     { x: "0%", ease: Power2.ease },
//     "-=0.5"
//   );
// };
