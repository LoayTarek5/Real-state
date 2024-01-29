import { headerScroll, HoverMegaMenus, arrowMenuCheck,arrFetchData,getItemFromFetch} from "./header.js";
import { checkVisit } from "./items.js";
// To Change header according the scroll window
headerScroll();

// Loop on each arrow and display the selected one
arrowMenuCheck();

HoverMegaMenus();

getItemFromFetch();

let searchContent = document.querySelector(".search-content");

let searchInput = document.querySelector(".search-place-page .search-input-page");

let searchInputIcon = document.querySelector(".search-place-page .search-icon-input-page");



let arrSearchItems = [];

if (localStorage.getItem("SearchItems")) {
  arrSearchItems = JSON.parse(localStorage.getItem("SearchItems"));
}

console.log(arrSearchItems);

arrSearchItems.forEach((item) => {
  let boxSearch = document.createElement("div");
  boxSearch.classList.add("box-search");

  let imageContainer = document.createElement("div");
  imageContainer.classList.add("image-search");
  let imgLink = document.createElement("a");
  imgLink.setAttribute("href", "itemPage.html");
  let img = document.createElement("img");
  img.src = item.image_url;

  imgLink.appendChild(img);
  imageContainer.appendChild(imgLink);

  let searchResultInfo = document.createElement("div");
  searchResultInfo.classList.add("search-box-info");

  let title = document.createElement("a");
  title.setAttribute("href", "itemPage.html");
  title.classList.add("title");
  title.innerText = item.title;
  title.addEventListener("click", () => {
    checkVisit(title.innerText);
  });

  let descriptions = document.createElement("p");
  descriptions.classList.add("search-box-desc");
  descriptions.innerText = item.descreption;

  let priceContainer = document.createElement("div");
  priceContainer.classList.add("price-content");

  let price = document.createElement("span");
  price.classList.add("price");
  price.innerText = item.price;
  priceContainer.appendChild(price);

  if (item.discount !== undefined) {
    let discount = document.createElement("span");
    discount.classList.add("discount");
    discount.innerText = item.discount;
    let save = document.createElement("span");
    save.classList.add("save");
    // Calculate The Saved Money
    let numPrice = price.innerText
      .split("")
      .filter((ch) => ch !== "$" && ch !== "." && ch !== ",")
      .join("");
    let numDiscount = discount.innerText
      .split("")
      .filter((ch) => ch !== "$" && ch !== "." && ch !== ",")
      .join("");
    let totalDiscount = 100 - (+numPrice / +numDiscount) * 100;
    save.innerText = `Save -${totalDiscount.toFixed(2)}%`;
    priceContainer.appendChild(discount);
    priceContainer.appendChild(save);
  }

  searchResultInfo.appendChild(title);
  searchResultInfo.appendChild(descriptions);
  searchResultInfo.appendChild(priceContainer);

  boxSearch.appendChild(imageContainer);
  boxSearch.appendChild(searchResultInfo);

  searchContent.appendChild(boxSearch);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchInputIcon.click();
  }
});

searchInputIcon.addEventListener("click", (e) => {
  if (searchInput.value !== "") {
    arrSearchItems = [];
    arrFetchData.forEach((item) => {
      if (item.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
        arrSearchItems.push(item);
        localStorage.setItem("SearchItems", JSON.stringify(arrSearchItems));
      }
    });
  }
  window.location.href = "search.html";
});