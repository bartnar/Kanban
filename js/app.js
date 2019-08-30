"use strict";

import Home from "../views/Home.js";
import Board from "../views/Board.js";
import Error404 from "../views/Error404.js";

import Utils from "../services/utils/Utils.js";

// List of supported routes

const routes = {
  "/": Home,
  "/board": Board
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  //Loading view element:
  const content = null || document.getElementById("app");

  //Get the parsed URL from the adressbar
  let request = Utils.parseRequestURL();

  //Parse the URL and if ot has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);
