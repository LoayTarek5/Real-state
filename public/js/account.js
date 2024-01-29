import {headerScroll, HoverMegaMenus, arrowMenuCheck, shoppingCart} from "./header.js"

shoppingCart

// To Change header according the scroll window
headerScroll();

// Loop on each arrow and display the selected one
arrowMenuCheck();

HoverMegaMenus();

// INtroduction to the Main page of the Account Page
const mainOptions = document.querySelector(".account .main-options");
const registration = document.querySelector(".account .registration");
const logIn = document.querySelector(".account .log-in-main");
// Options of the Account Page(LOG/REG/RESET PASS)
const boxOptions = document.querySelectorAll(".account .main-options .box");

const closeReg = document.querySelector(".account .registration h4 .close");
const closeLogIn = document.querySelector(".account .log-in-main h4 .close");

const regBtn = document.querySelector(".account .registration .reg-btn");
const logInBtn = document.querySelector(".account .log-in-main .log-btn");

boxOptions.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.classList.contains("regist"))
    {
      mainOptions.classList.add("close");
      registration.classList.remove("close");
    }
    else if (box.classList.contains("log-in"))
    {
      mainOptions.classList.add("close");
      logIn.classList.remove("close");
    }
  });
});

closeReg.addEventListener("click", () => {
  mainOptions.classList.remove("close");
  registration.classList.add("close");
});

closeLogIn.addEventListener("click", () => {
  mainOptions.classList.remove("close");
  logIn.classList.add("close");
});