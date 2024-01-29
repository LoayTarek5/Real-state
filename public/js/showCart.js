import {getItemFromLocal,cartItemsArr,addItemToLocal,totalItems,checkVisit} from "./items.js"

export let cartIcon = document.querySelector("header .main-header .icons .shopping-cart");

getItemFromLocal();

export function hoverMenuCartItems() {
  let containerMenuCart = document.createElement("div");
  containerMenuCart.classList.add("container-menu-cart");

  cartItemsArr.forEach((item, index) => {
    let itemBox =  document.createElement("div");
    itemBox.classList.add("item-box");

    let img =  document.createElement("img");
    img.setAttribute("src", item.image_url);
    img.classList.add("img-menu-cart");

    let infoMenuCart = document.createElement("div");
    infoMenuCart.classList.add("info-menu-cart");

    let title = document.createElement("a");
    title.classList.add("title-menu-cart");
    title.setAttribute("href", "itemPage.html");
    title.innerText = item.title

    let quantity = document.createElement("p");
    quantity.classList.add("quantity-menu-cart");
    quantity.innerText = "Quantity: ";

    let quantityNum = document.createElement("span");
    quantityNum.innerText = item.quantity;
    quantity.appendChild(quantityNum);
    
    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "delet-menu-item");
    
    title.addEventListener("click", (e) => {
      checkVisit(title.innerText)
    });

    // Delete Item Form the Menu Cart
    deleteBtn.addEventListener("click", () => {
      let t = cartItemsArr[index].quantity;
      totalItems.innerText = +totalItems.innerText  - t;
      cartItemsArr.splice(index, 1);
      // Remove the Item Form the Local Storage And Update
      addItemToLocal();
      // Remove the Item Form the Page
      itemBox.remove();
      
    });
    infoMenuCart.appendChild(title);
    infoMenuCart.appendChild(quantity);
    infoMenuCart.appendChild(deleteBtn);

    itemBox.appendChild(img);
    itemBox.appendChild(infoMenuCart);

    containerMenuCart.appendChild(itemBox);

 
  });

  cartIcon.appendChild(containerMenuCart);

  cartIcon.addEventListener("mouseover", () => {
    containerMenuCart.classList.add("active");
  });
  cartIcon.addEventListener("mouseleave", () => {
    containerMenuCart.classList.remove("active");
  });
}

hoverMenuCartItems();

