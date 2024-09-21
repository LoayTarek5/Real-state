import { shoppingCart, checkVisit } from "./items.js";
import { cartIcon } from "./showCart.js";

shoppingCart;

// Header of Page
let header = document.querySelector("header");

let catalog = document.getElementById("catalog");
let collection = document.getElementById("collections");

export let searchIcon = document.querySelector(
  "header .main-header .icons .search"
);
export let searchInputContainer = document.querySelector(
  "header .main-header .search-container"
);
export let searchInput = document.querySelector(
  "header .main-header .search-container .search-place .search-input"
);
export let searchInputClose = document.querySelector(
  "header .main-header .search-container .search-place .close-search-input"
);
export let searchInputIcon = document.querySelector(
  "header .main-header .search-container .search-place .search-icon-input"
);

export let searchResultContainer = document.createElement("div");
searchResultContainer.classList.add("search-result-content");
// Bar Magent
let barMagnet = document.querySelector(".bar-magnet");
let nav = document.querySelector("nav");
let closeBar = document.querySelector(".close-magnet");
//Timer to clear setIntervalTime toclose the Meaga menu bar
let timer;

// arrow of bar magnets
let arrows = document.querySelectorAll(".arrow");

export let arrFetchData = [];

let arrSearchItems = [];

getItemFromFetch();

// ON Click The Cart Icon , then it point to The Shopping Cart Page
cartIcon.addEventListener("click", () => {
  window.location.href = "shoppingCart.html";
});

// To Change header according the scroll window
function headerScroll() {
  window.onscroll = () => {
    if (window.scrollY >= header.scrollHeight) {
      document.querySelector(".main-header").style.display = "none";
    } else {
      document.querySelector(".main-header").style.display = "flex";
    }
  };
}

// Loop on each arrow and display the selected one
function arrowMenuCheck() {
  document.querySelectorAll(".arrow").forEach((arr) => {
    arr.addEventListener("click", (e) => {
      e.target.classList.toggle("active");
      if (e.target.classList.contains("arrow-catalog")) {
        document.querySelector(".bar-menu-catalog").classList.toggle("active");
      } else if (e.target.classList.contains("arrow-main-menu")) {
        document
          .querySelector(".bar-menu-catalog-1")
          .classList.toggle("active");
      } else if (e.target.classList.contains("arrow-account")) {
        document
          .querySelector(".bar-menu-catalog-2")
          .classList.toggle("active");
      } else if (e.target.classList.contains("arrow-collections")) {
        document
          .querySelector(".bar-menu-collection")
          .classList.toggle("active");
      }
    });
  });
}

// Hover on megamenu it will pop up
function HoverMegaMenus() {
  catalog.onmouseover = function () {
    openMenu(this);
  };
  // ON Leave megamenu it will close after 0.5sec
  catalog.onmouseleave = function () {
    closeMenu(this);
  };
  collection.onmouseover = function () {
    openMenu(this);
  };
  // ON Leave megamenu it will close after 0.5sec
  collection.onmouseleave = function () {
    closeMenu(this);
  };
}

function closeAllOpendBarMenu() {
  arrows.forEach((arrow) => {
    arrow.classList.remove("active");
  });
  document.querySelector(".bar-menu-catalog").classList.remove("active");
  document.querySelector(".bar-menu-catalog-1").classList.remove("active");
  document.querySelector(".bar-menu-catalog-2").classList.remove("active");
  document.querySelector(".bar-menu-collection").classList.remove("active");
}

// hover on to open Menu of the nav bar
function openMenu(e) {
  // Remove the open menu to prevent the collapsing
  document.querySelectorAll("nav li").forEach((li) => {
    if (li.classList.contains("open")) li.classList.remove("open");
  });
  clearTimeout(timer);
  e.classList.add("open");
}

// leave mouse to close Menu of the nav bar
function closeMenu(e) {
  timer = setTimeout(() => {
    e.classList.remove("open");
  }, 500);
}

// Open or close the bar magent when click the bar of the close button
// function toggleBarMagnet() {}
barMagnet.onclick = () => {
  // If nav bar is closed Then close all opened menu bar
  if (!nav.classList.contains("active")) closeAllOpendBarMenu();

  nav.classList.toggle("active");
  closeBar.classList.toggle("active");
  closeBar.onclick = () => {
    barMagnet.click();
  };
};

// Load the JSON data
fetch("dataProducts.json")
  .then((response) => response.json())
  .then((productsData) => {

    searchInput.addEventListener("input", (e) => {
      if (searchInput.value !== "") {
        searchResultContainer.innerHTML = "";
        productsData.forEach((item) => {
          if (
            item.title.toLowerCase().includes(searchInput.value.toLowerCase())
          ) {
            let boxSearch = document.createElement("div");
            boxSearch.classList.add("box-search-result");

            let imageContainer = document.createElement("div");
            imageContainer.classList.add("image-search-result");
            let imgLink = document.createElement("a");
            imgLink.setAttribute("href", "itemPage.html");
            let img = document.createElement("img");
            img.src = item.image_url;

            imgLink.appendChild(img);
            imageContainer.appendChild(imgLink);

            let searchResultInfo = document.createElement("div");
            searchResultInfo.classList.add("search-result-info");

            let title = document.createElement("a");
            title.setAttribute("href", "itemPage.html");
            title.classList.add("title");
            title.innerText = item.title;
            title.addEventListener("click", () => {
              checkVisit(title.innerText);
            });

            let priceContainer = document.createElement("div");
            priceContainer.classList.add("price-content");

            let price = document.createElement("span");
            price.classList.add("price");
            price.innerText = item.price;

            priceContainer.appendChild(price);

            // Check if discount exists before creating the element
            if (item.discount) {
              let discount = document.createElement("span");
              discount.classList.add("discount");
              discount.innerText = item.discount;
              priceContainer.appendChild(discount);

              let save = document.createElement("span");
              save.classList.add("save");
              // Calculate The Saved Money
              let numPrice = item.price.replace(/[^0-9.]/g, "");
              let numDiscount = item.discount.replace(/[^0-9.]/g, "");
              let totalDiscount = 100 - (+numPrice / +numDiscount) * 100;
              save.innerText = `Save -${totalDiscount.toFixed(2)}%`;
              priceContainer.appendChild(save);
            }

            searchResultInfo.appendChild(title);
            searchResultInfo.appendChild(priceContainer);

            boxSearch.appendChild(imageContainer);
            boxSearch.appendChild(searchResultInfo);

            searchResultContainer.appendChild(boxSearch);
          }
        });
      }
      document
        .querySelector(
          "header .main-header .search-container .search-result-container"
        )
        .appendChild(searchResultContainer);
    });
  })
  .catch((error) => console.error("Error loading the JSON file:", error));


searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchInputIcon.click();
  }
});

searchInputIcon.addEventListener("click", (e) => {
  if (searchInput.value !== "") {
    arrFetchData.forEach((item) => {
      if (item.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
        arrSearchItems.push(item);
        localStorage.setItem("SearchItems", JSON.stringify(arrSearchItems));
      }
    });
  }
  window.location.href = "search.html";
});

searchIcon.addEventListener("click", () => {
  searchInputContainer.classList.add("open");
  document.querySelector(
    "header .main-header .search-container .search-result-container"
  ).style.display = "block";
});

searchInputClose.addEventListener("click", () => {
  searchInputContainer.classList.remove("open");

  document.querySelector(
    "header .main-header .search-container .search-result-container"
  ).style.display = "none";
  searchInput.value = "";
  searchResultContainer.remove();
});

export function getItemFromFetch() {
  // Check if Theres Tasks In Local Storage
  if (localStorage.getItem("FetchData")) {
    arrFetchData = JSON.parse(localStorage.getItem("FetchData"));
  }
}

export { headerScroll, HoverMegaMenus, arrowMenuCheck, shoppingCart, cartIcon };
