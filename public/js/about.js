import {headerScroll, HoverMegaMenus, arrowMenuCheck, shoppingCart} from "./header.js"
// To Update the number Of the Items in the cart
shoppingCart

let CardsContainer = document.querySelector(".testemonials .cards-container");
let cards = document.querySelectorAll(".testemonials .cards-container .inner-container");
let bullets = document.querySelectorAll(".testemonials .bullets li");


// To Change header according the scroll window
headerScroll();

// Loop on each arrow and display the selected one
arrowMenuCheck();

HoverMegaMenus();


// Width Of Each Testemonial to Slide
let widthToMove = cards[0].clientWidth;
window.onresize = () => {
  widthToMove = cards[0].clientWidth;
};

// Remove All Active From UNSELECTED Bullets
function removeAllActive() {
  bullets.forEach((li) => {
    li.classList.remove("active");
  });
}

// Move The to the Selected Slide
bullets.forEach((li, index) => {
  let extraSpace = 0;
  li.addEventListener("click", (e) =>{
    removeAllActive();
    e.target.classList.add("active");
    extraSpace = 20 * index;
    CardsContainer.style.transform = `translateX(calc(-${widthToMove * index}px - ${extraSpace}px))`;
  });
});
