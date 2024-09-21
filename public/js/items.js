const quickViewBtn = document.querySelectorAll(
  ".products-content .item .icons .view"
);

// Create Buttons to Cart
const addToCartBtn = document.querySelectorAll(
  ".products-content .item .icons .add-cart"
);
const addToCartlink = document.querySelectorAll(
  ".products-content .item .image a"
);

let allTitleItems = document.querySelectorAll(
  ".products-content .item .title-item"
);

export let totalItems = document.createElement("span");
totalItems.classList.add("total-items-cart");

export let shoppingCart = document.querySelector(
  "header .main-header .shopping-cart"
);
shoppingCart.appendChild(totalItems);

// TO Calcualte the Total Items in the Cart
export let numItemsInCart = 0;

// Create Array to Get Data of Items from Local Storage Or T store
export let cartItemsArr = [];

let arrFetchData = [];

//Array contains all Item's Data From JSON File
let arrAllDataItem = [];

getItemFromLocal();
sumAllItemsInCart();

allTitleItems.forEach((title) => {
  title.addEventListener("click", () => {
    checkVisit(title.innerText);
    window.location.href = "itemPage.html";
  });
});

// On Clicking Add Buttons Cart
addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    numItemsInCart++;
    totalItems.innerText = numItemsInCart;
    checkItemsCart(e.target.parentElement.parentElement.parentElement);
    popupAddItem(e.target.parentElement.parentElement.parentElement);
  });
});
addToCartlink.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    numItemsInCart++;
    totalItems.innerText = numItemsInCart;
    checkItemsCart(e.target.parentElement.parentElement);
    popupAddItem(e.target.parentElement.parentElement);
  });
});

// Click On The Quick View Button
quickViewBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    quickView(e.target.parentElement.parentElement.parentElement);
  });
});

function addItemToCart(itemElement) {
  // Extract the title, price, and image URL for each item
  const title = itemElement.querySelector(".title-item").textContent.trim();
  const price = itemElement.querySelector(".actual-price").textContent.trim();
  const imageElement = itemElement.querySelector("img");
  const imageUrl = imageElement ? imageElement.getAttribute("src") : "";

  const itemData = {
    title: title,
    price: price,
    image_url: imageUrl,
    quantity: 1,
    visit: false,
  };
  cartItemsArr.push(itemData);
  addItemToLocal();
}

// Add All items That in JSON File to Local;
function addAllItemData(itemElement) {
  // Extract the title, price, and image URL for each item
  const title = itemElement.querySelector(".title-item").textContent.trim();
  const price = itemElement.querySelector(".actual-price").textContent.trim();
  const imageElement = itemElement.querySelector("img");
  const imageUrl = imageElement ? imageElement.getAttribute("src") : "";

  const itemData = {
    title: title,
    price: price,
    image_url: imageUrl,
    quantity: 1,
    visit: false,
  };
  arrAllDataItem.push(itemData);
  addAllItemsToLocal();
}

// Add the Selected items by users to Local
export function addItemToLocal() {
  localStorage.setItem("CartItems", JSON.stringify(cartItemsArr));
}

// Add the All items that exist to Local
export function addAllItemsToLocal() {
  localStorage.setItem("allItemsData", JSON.stringify(arrAllDataItem));
}

export function getItemFromLocal() {
  // Check if Theres Tasks In Local Storage
  if (localStorage.getItem("CartItems")) {
    cartItemsArr = JSON.parse(localStorage.getItem("CartItems"));
  }
}

export function getAllItemsToLocal() {
  // Check if Theres Tasks In Local Storage
  if (localStorage.getItem("allItemsData")) {
    arrAllDataItem = JSON.parse(localStorage.getItem("allItemsData"));
  }
}

// To Check If the Selected Item is in the Cart or Not To Increas quantity of Items
export function checkItemsCart(selectedItem, quantity = 1) {
  let exist = false;
  const title = selectedItem.querySelector(".title-item").textContent.trim();
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
    addItemToCart(selectedItem);
  } else {
    addItemToLocal();
  }
}

// Sum All Quantity of All Items in The Cart
export function sumAllItemsInCart() {
  cartItemsArr.forEach((item) => {
    numItemsInCart += item.quantity;
  });
  // Set Total Items That in the cart to Casrt's Span To Appear in the Page
  totalItems.innerText = numItemsInCart;
}

// On clicking Quick View Buttonthe Pop up Will Appear And Display All Information of the Selected Item
export function quickView(selectedItem) {
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");

  // cotainer Will Pop up That containes All The INformatio of the Item
  let containerItem = document.createElement("div");
  containerItem.classList.add("container-overview-item");

  // Image Container That contains all the images in the overView
  let imageConatiner = document.createElement("div");
  imageConatiner.classList.add("image-container");
  // MainImage of the Selectede Item to Over View
  let mainImgItem = document.createElement("img");
  const imageElement = selectedItem.querySelector("img");
  mainImgItem.setAttribute("src", imageElement.getAttribute("src"));
  mainImgItem.classList.add("main-img-overview");

  imageConatiner.appendChild(mainImgItem);
  // Image Container That contains all sub images in the overView

  let subImageContainer = document.createElement("div");
  subImageContainer.classList.add("sub-image-container");

  let discreption = document.createElement("p");
  discreption.classList.add("descreption");
  // Fetch The Image Accorign and Discreption the Selected Item //
  fetch("dataProducts.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((item) => {
        if (
          selectedItem.querySelector(".title-item").textContent.trim() ===
          item.title
        ) {
          item.sub_imgs.forEach((imgUrl) => {
            let subImg = document.createElement("img");
            subImg.setAttribute("src", imgUrl);
            subImageContainer.appendChild(subImg);
            // Change the Current image of the View Item
            subImg.addEventListener("click", (e) => {
              mainImgItem.src = e.target.src;
            });
          });
          discreption.innerText = item.descreption;
        }
        imageConatiner.appendChild(subImageContainer);
      });
    });

  let infoSelectedItem = document.createElement("dev");
  infoSelectedItem.classList.add("info-item-overview");

  // Name Of the Item
  let title = document.createElement("a");
  title.setAttribute("href", "itemPage.html");
  title.classList.add("title");
  title.innerText = selectedItem
    .querySelector(".title-item")
    .textContent.trim();
  title.addEventListener("click", (e) => {
    checkVisit(title.innerText);
  });
  infoSelectedItem.appendChild(title);

  // price of the Item
  let price = document.createElement("p");
  price.classList.add("price");
  price.innerText = selectedItem
    .querySelector(".actual-price")
    .textContent.trim();
  infoSelectedItem.appendChild(price);

  let discount = document.createElement("span");
  let discountPrecent = document.createElement("span");
  if (selectedItem.querySelector(".discount") !== null) {
    discount = document.createElement("span");
    discount.classList.add("discount");
    discount.innerText = selectedItem
      .querySelector(".discount")
      .textContent.trim();
    // Calculate The Saved Money
    discountPrecent = document.createElement("span");
    discountPrecent.classList.add("discount-precent");

    let numPrice = price.innerText
      .split("")
      .filter((ch) => ch !== "$" && ch !== "." && ch !== ",")
      .join("");
    let numDiscount = discount.innerText
      .split("")
      .filter((ch) => ch !== "$" && ch !== "." && ch !== ",")
      .join("");
    let totalDiscount = 100 - (+numPrice / +numDiscount) * 100;
    discountPrecent.innerText = `Save ${totalDiscount.toFixed(2)}%`;

    infoSelectedItem.appendChild(discount);
    infoSelectedItem.appendChild(discountPrecent);
  }

  infoSelectedItem.appendChild(discreption);
  // Quantity That User Can Choose From
  // Label
  let labelQuantity = document.createElement("label");
  labelQuantity.innerText = "Quantity:";
  // Quantity Container
  let quantityContainer = document.createElement("div");
  quantityContainer.classList.add("quantity-container");
  // User can Choose the Quantity From
  let inputQuantity = document.createElement("input");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("name", "quantity");
  inputQuantity.setAttribute("value", "1");
  inputQuantity.classList.add("quantity-input");
  // Add The Quantity That User Choosen
  let inputBtn = document.createElement("button");
  inputBtn.innerText = "Add To Cart";
  inputBtn.classList.add("add-cart");

  quantityContainer.appendChild(inputQuantity);
  quantityContainer.appendChild(inputBtn);

  infoSelectedItem.appendChild(labelQuantity);
  infoSelectedItem.appendChild(quantityContainer);

  // Link to Go to The Full Item
  let fullView = document.createElement("a");
  fullView.setAttribute("href", "itemPage.html");
  fullView.innerText = "View Full Info";
  fullView.classList.add("full-view");

  fullView.addEventListener("click", () => {
    checkVisit(title.innerText);
  });

  infoSelectedItem.appendChild(fullView);

  // Create The close Button to Close the pop up item View
  let closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");

  // Close the Popup OverView Item
  closeBtn.addEventListener("click", () => {
    overlay.remove();
    containerItem.remove();
  });
  overlay.addEventListener("click", () => {
    overlay.remove();
    containerItem.remove();
  });
  // Increat the quantity of the Selected Item
  inputBtn.addEventListener("click", () => {
    if (+inputQuantity.value > 0) {
      addinputQuantity(+inputQuantity.value);
    }
    inputQuantity.value = 1;
  });

  containerItem.appendChild(closeBtn);
  containerItem.appendChild(imageConatiner);
  containerItem.appendChild(infoSelectedItem);

  document.body.appendChild(overlay);
  document.body.appendChild(containerItem);
}

// PopUp When the User Add item to The Cart
function popupAddItem(selectedItem) {
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");

  // cotainer Will Pop up That containes All The Information of the Item
  let containerItem = document.createElement("div");
  containerItem.classList.add("container-item-popup");

  // Message Product Successfully Added To Your Shopping Cart
  let successAddMsg = document.createElement("h4");
  successAddMsg.classList.add("success-add");
  successAddMsg.innerHTML = `<i class="fa-solid fa-check"></i> Product Successfully Added To Your Shopping Cart`;

  // Container The Containes the INfo of the Item
  let containerInfo = document.createElement("div");
  containerInfo.classList.add("container-info-popup");

  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image");
  let img = document.createElement("img");
  const imageElement = selectedItem.querySelector("img");
  img.setAttribute("src", imageElement.getAttribute("src"));
  img.classList.add("img-popup");
  imgContainer.appendChild(img);

  let infoDetails = document.createElement("div");
  infoDetails.classList.add("info-details");

  let title = document.createElement("p");
  title.classList.add("title");
  title.innerText = selectedItem
    .querySelector(".title-item")
    .textContent.trim();

  let price = document.createElement("p");
  price.classList.add("price");
  price.innerText = selectedItem
    .querySelector(".actual-price")
    .textContent.trim();

  let quantity = document.createElement("p");
  quantity.innerText = "Quantity: ";
  quantity.classList.add("quantity");
  let spanQuantity = document.createElement("span");

  let totalPrice = document.createElement("p");
  totalPrice.innerText = "Total: ";
  totalPrice.classList.add("total-price");
  let spanTotalPrice = document.createElement("span");
  let priceVal = price.innerText
    .split("")
    .filter((ch) => ch !== "$" && ch !== "." && ch !== ",")
    .join("");
  let priceNum = +priceVal;

  cartItemsArr.forEach((item) => {
    if (item.title === title.textContent) {
      spanQuantity.innerText = item.quantity;
      spanTotalPrice.innerText = item.quantity * priceNum;
    }
  });

  quantity.appendChild(spanQuantity);
  totalPrice.appendChild(spanTotalPrice);

  infoDetails.appendChild(title);
  infoDetails.appendChild(price);
  infoDetails.appendChild(quantity);
  infoDetails.appendChild(totalPrice);

  let continueShopping = document.createElement("button");
  continueShopping.innerText = "Continue Shopping";
  continueShopping.classList.add("continue-shopping");

  let goCart = document.createElement("a");
  goCart.innerText = "Go To Cart";
  goCart.classList.add("go-cart");

  // Create The close Button to Close the pop up
  let closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");

  // Close the Popup OverView Item
  closeBtn.addEventListener("click", () => {
    overlay.remove();
    containerItem.remove();
  });
  overlay.addEventListener("click", () => {
    overlay.remove();
    containerItem.remove();
  });
  continueShopping.addEventListener("click", () => {
    overlay.remove();
    containerItem.remove();
  });

  containerItem.appendChild(closeBtn);
  containerInfo.appendChild(imgContainer);
  containerInfo.appendChild(infoDetails);

  containerItem.appendChild(successAddMsg);
  containerItem.appendChild(containerInfo);
  containerItem.appendChild(continueShopping);
  containerItem.appendChild(goCart);

  document.body.appendChild(overlay);
  document.body.appendChild(containerItem);
}

export function checkVisit(titleText) {
  fetch("dataProducts.json")
    .then((response) => response.json())
    .then((data) => {
      arrFetchData = data;
      removeAllVisit(arrFetchData);
      arrFetchData.forEach((itemData) => {
        if (itemData.title === titleText) {
          itemData.visit = true;
          localStorage.setItem("FetchData", JSON.stringify(arrFetchData));
        }
      });
    });
}

function removeAllVisit(arrData) {
  arrData.forEach((item) => {
    item.visit = false;
  });
}

export function addinputQuantity(numQuantity) {
  numItemsInCart += numQuantity;
  totalItems.innerText = numItemsInCart;
  checkItemsCart(selectedItem, numQuantity);
}
