import { cartIcon } from "./showCart.js";
import {
  headerScroll,
  HoverMegaMenus,
  arrowMenuCheck,
  shoppingCart,
} from "./header.js";
import {
  cartItemsArr,
  getItemFromLocal,
  addItemToLocal,
  numItemsInCart,
  totalItems,
  addinputQuantity,
} from "./items.js";

shoppingCart;

// To Change header according the scroll window
headerScroll();

// Loop on each arrow and display the selected one
arrowMenuCheck();

HoverMegaMenus();

getItemFromLocal();

const currPage = document.querySelector(".curr-page-links .curr-page");
let imageConatiner = document.querySelector(".item-page .image-container");
let subImageConatiner = document.querySelector(
  ".item-page .image-container .sub-image-container"
);
let mainImg = document.querySelector(".item-page .image-container .main-img");
let availableItems = document.querySelector(".item-page .item-info .available span");
let title = document.querySelector(".item-page .item-info .title");
let price = document.querySelector(".item-page .item-info .price");
let discount = document.querySelector(".item-page .item-info .discount");
let salePrecent = document.querySelector(".item-page .item-info .sale-precent");
let descreption = document.querySelector(".item-page .item-info .descreption");
let inputBtn = document.querySelector(
  ".item-page .item-info .add-form-cart .add-cart"
);
let inputQuantity = document.querySelector(
  ".item-page .item-info .add-form-cart .quantity-input"
);
const  showDiscreption = document.querySelector(".item-page .item-info .show-description");

showDiscreption.addEventListener("click", (e) => {
  if (e.target.classList.contains("arrow-collections")) {
    showDiscreption.querySelector("p").classList.toggle("active");
  }
});

let arrFetchData = [];

getItemFromFetch();

// To Get Data From JSON file And Display it in the Item Page
function displaySelectedItem() {
  arrFetchData.forEach((itemData) => {
    if (itemData.visit) {
      mainImg.setAttribute("src", itemData.image_url);

      itemData.sub_imgs.forEach((imgUrl) => {
        let subImg = document.createElement("img");
        subImg.setAttribute("src", imgUrl);
        subImageConatiner.appendChild(subImg);
        // Change the Current image of the View Item
        subImg.addEventListener("click", (e) => {
          mainImg.src = e.target.src;
        });
      });
      title.innerText = itemData.title;
      currPage.innerText = title.innerText
      price.innerText = itemData.price;

      if (itemData.discount !== undefined) {
        discount.innerText = itemData.discount;
        // Calculate The Saved Money
        let numPrice = price.innerText
          .split("")
          .filter((ch) => ch !== "$" && ch !== "." && ch !== ",")
          .join("");
        let numDiscount = discount.innerText
          .split("")
          .filter((ch) => ch !== "$" && ch !== "." && ch !== ",")
          .join("");
        let totalDiscount = 100 - (+numPrice / +numDiscount) * 100
        salePrecent.innerText = `Save -${totalDiscount.toFixed(2)}%`;
      }
      descreption.innerText = itemData.descreption;
    }
    imageConatiner.appendChild(subImageConatiner);
  });
}

function getItemFromFetch() {
  // Check if Theres Tasks In Local Storage
  if (localStorage.getItem("FetchData")) {
    arrFetchData = JSON.parse(localStorage.getItem("FetchData"));
  }
}

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (+inputQuantity.value > 0) {
    let totalItemInCart = numItemsInCart
    totalItemInCart += +inputQuantity.value;
    totalItems.innerText = totalItemInCart;
    checkItemsCart(title.innerText, +inputQuantity.value);
  }
  inputQuantity.value = 1;
  checkAavailableItems();
});

function addItemToCart(quantity = 1) {
  const itemData = {
    title: title.innerText,
    price: price.innerText,
    image_url: mainImg.getAttribute("src"),
    quantity: quantity,
    visit: false,
  };
  cartItemsArr.push(itemData);
  addItemToLocal();
}

function checkItemsCart(title, quantity = 1) {
  let exist = false;
  cartItemsArr.forEach((item) => {
    if (item.title === title) {
      item.quantity += quantity;
      exist = true;
    }
  });

  // Update the THe Menu Cart On Every Add Item
  import("./showCart.js").then(({ hoverMenuCartItems }) => {
    hoverMenuCartItems();
  });

  if (!exist) {
    addItemToCart(quantity);
  } else {
    addItemToLocal();
  }
}

function checkAavailableItems() {
  cartItemsArr.forEach((item) => {
    
    if (item.title === title.innerText) {
      availableItems.innerText = +availableItems.innerText - item.quantity;
    }
  })
}

displaySelectedItem();
checkAavailableItems();
