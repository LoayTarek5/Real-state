import {headerScroll, HoverMegaMenus, arrowMenuCheck,searchInput} from "./header.js"
searchInput
let productContent = document.querySelector(
  ".products-container .products-content"
);
let item = document.querySelectorAll(
  ".products-container .products-content .item"
);
// Info of Item
let itemInfo = document.querySelectorAll(
  ".products-container .products-content .item .info"
);
// Descreption of Item
let itemDesc = document.querySelectorAll(
  ".products-container .products-content .item .info .descreption"
);
let itemIcons = document.querySelectorAll(
  ".products-container .products-content .item .icons"
);
let gridBtn = document.querySelector(
  ".products-container .control-content .icons .dis-grid"
);
let listBtn = document.querySelector(
  ".products-container .control-content .icons .dis-list"
);

// To Change header according the scroll window
headerScroll();

// Loop on each arrow and display the selected one
arrowMenuCheck();

HoverMegaMenus();

// On Click the list Button the prduct will show in grid form
function displayProductGrid() {
  listBtn.classList.remove("active");
  gridBtn.classList.add("active");
  productContent.classList.remove("list");
  item.forEach((e) => {
    e.classList.remove("list");
  });
  itemInfo.forEach((e) => {
    e.classList.remove("list");
  });
  itemDesc.forEach((e) => {
    e.classList.remove("appear");
  });
  itemIcons.forEach((e) => {
    e.classList.remove("appear");
  });
  document
    .querySelectorAll(".products-container .products-content .item .image a")
    .forEach((e) => {
      e.classList.remove("disappear");
    });
}

// On Click the list Button the prduct will show in list form
function displayProductList() {
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
  productContent.classList.add("list");
  item.forEach((e) => {
    e.classList.add("list");
  });
  itemInfo.forEach((e) => {
    e.classList.add("list");
  });
  itemDesc.forEach((e) => {
    e.classList.add("appear");
  });
  itemIcons.forEach((e) => {
    e.classList.add("appear");
  });
  document
    .querySelectorAll(".products-container .products-content .item .image a")
    .forEach((e) => {
      e.classList.add("disappear");
    });
}

listBtn.addEventListener("click", () => {
  displayProductList();
});

gridBtn.addEventListener("click", () => {
  displayProductGrid();
});

// Dispaly of Product option according the screen Size
function displayOption() {
  if (window.innerWidth <= 700) {
    gridBtn.click();
    // Hide the Display OPtion in screen size that smalller than or equal 700px
    document
      .querySelector(".products-container .control-content .icons")
      .classList.add("disappper");
  } else {
    // appear the Display Option in screen size that greater than  700px
    document
      .querySelector(".products-container .control-content .icons")
      .classList.remove("disappper");
  }
}

window.onresize = () => {
  displayOption();
};
