// import { json } from "/express/lib/response";
import {
  headerScroll,
  HoverMegaMenus,
  arrowMenuCheck,
  shoppingCart,
} from "./header.js";
import {
  numItemsInCart,
  cartItemsArr,
  getItemFromLocal,
  addItemToLocal,
  totalItems,
} from "./items.js";

shoppingCart;
// To Change header according the scroll window
headerScroll();

// Loop on each arrow and display the selected one
arrowMenuCheck();

HoverMegaMenus();

// Get All Item And Their inforamtion From the Local storage
getItemFromLocal();

let shoppingCartInfo = document.querySelector(
  ".row-shopping-cart .shopping-cart-info"
);
let totalItem = document.querySelector(
  ".row-shopping-cart .shopping-cart-receipt .total-items span"
);
totalItem.innerText = numItemsInCart;
let totalCartPrice = document.querySelector(
  ".row-shopping-cart .shopping-cart-receipt .total-price-receipt span"
);
let totalItemPrice = 0;
const updateBtn = document.querySelector(".shopping-cart-receipt .update");
const checkoutBtn = document.querySelector(".row-shopping-cart  .check-out");

function displayAllItems() {
  cartItemsArr.forEach((item, index) => {
    let boxItem = document.createElement("div");
    boxItem.classList.add("box");

    let imageCotainer = document.createElement("div");
    imageCotainer.classList.add("image");

    let img = document.createElement("img");
    img.setAttribute("src", item.image_url);
    imageCotainer.appendChild(img);

    let textInfoContainer = document.createElement("div");
    textInfoContainer.classList.add("text-info");

    let colOne = document.createElement("div");
    colOne.classList.add("col-1");

    let title = document.createElement("a");
    title.classList.add("title");
    title.innerText = item.title;

    let price = document.createElement("p");
    price.classList.add("price");
    price.innerText = item.price;

    colOne.appendChild(title);
    colOne.appendChild(price);

    let quantityBox = document.createElement("form");
    quantityBox.classList.add("quantity-box");

    let labelQuantity = document.createElement("form");
    labelQuantity.innerText = "Quantity:";

    let inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("name", "quantity");
    inputQuantity.setAttribute("value", item.quantity);
    inputQuantity.classList.add("input-quantity");

    quantityBox.appendChild(labelQuantity);
    quantityBox.appendChild(inputQuantity);

    let totalPriceBox = document.createElement("div");
    totalPriceBox.classList.add("total-price");

    let spanTotal = document.createElement("span");
    let priceItemNum = item.price
      .split("")
      .filter((ch) => ch !== "$" && ch !== "." && ch !== ",")
      .join("");
    spanTotal.innerText = convertTotalPricetoStr(item.quantity * priceItemNum);

    totalItemPrice += item.quantity * priceItemNum;

    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash-can", "trash");

    totalPriceBox.appendChild(spanTotal);
    totalPriceBox.appendChild(deleteBtn);

    textInfoContainer.appendChild(colOne);
    textInfoContainer.appendChild(quantityBox);
    textInfoContainer.appendChild(totalPriceBox);

    boxItem.appendChild(imageCotainer);
    boxItem.appendChild(textInfoContainer);

    shoppingCartInfo.appendChild(boxItem);

    deleteBtn.addEventListener("click", () => {
      let itemQuantity = cartItemsArr[index].quantity;
      totalItems.innerText = +totalItems.innerText - itemQuantity;

      priceItemNum = item.price
        .split("")
        .filter((ch) => ch !== "$" && ch !== "." && ch !== ",")
        .join("");
      totalItemPrice -= item.quantity * priceItemNum;
      totalCartPrice.innerText = convertTotalPricetoStr(totalItemPrice);

      cartItemsArr.splice(index, 1);
      boxItem.remove();
      addItemToLocal();
    });
    // on clicking the Update Button , loop on every Input Quantity and set the value of the item quantity to UPdated quantity
    updateBtn.addEventListener("click", () => {
      item.quantity = +inputQuantity.value;
      addItemToLocal();
      location.reload();
    });
  });
  totalCartPrice.innerText = convertTotalPricetoStr(totalItemPrice);
  addItemToLocal();
}

displayAllItems();

function convertTotalPricetoStr(totalPrice) {
  let totalPriceStr = totalPrice + "";
  let last = "";
  totalPriceStr.split("").map((n, index) => {
    if (index % 3 === 0) last += n + ",";
    else last += n;
  });
  return "$" + last;
}

checkoutBtn.addEventListener("click", () => {
  fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItemsArr: cartItemsArr.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((e) => {
      console.error(e);
    });
});
