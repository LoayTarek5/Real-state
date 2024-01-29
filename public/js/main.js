import {headerScroll, HoverMegaMenus, arrowMenuCheck} from "./header.js"

// Cursors Slide(Left and right)
let cursorSlide = document.querySelectorAll(".cursor");
let postsConatiner = document.querySelector(".posts-container");
let posts = document.querySelectorAll(".post");

// Email Input of  NEWSLETTER
let newsletterEmail = document.querySelector(".newsletter .input-email input");
let newsletterSubmit = document.querySelector(".newsletter input[type=submit]");


// To Change header according the scroll window
headerScroll();

// Loop on each arrow and display the selected one
arrowMenuCheck();

HoverMegaMenus();

// Width Of Each Post to Slide
let widthToMove = posts[0].clientWidth;
window.onresize = () => {
  widthToMove = posts[0].clientWidth;
};

// decreament or increament Value to Each  Slide according hte Width Move of each Slide
let slideVal = 0;

cursorSlide.forEach((e) => {
  e.addEventListener("click", () => {
    let currentSlide = document.querySelector(".posts-container .current-post");
    if (e.classList.contains("right-cursor")) {
      if (currentSlide.nextElementSibling !== null) {
        currentSlide.nextElementSibling.classList.add("current-post");
        currentSlide.classList.remove("current-post");
        slideVal = slideVal - widthToMove - 20;
        postsConatiner.style.transform = `translateX(calc(${slideVal}px))`;
      }
    } else {
      if (currentSlide.previousElementSibling !== null) {
        currentSlide.previousElementSibling.classList.add("current-post");
        currentSlide.classList.remove("current-post");
        slideVal = slideVal + widthToMove + 20;
        postsConatiner.style.transform = `translateX(calc(${slideVal}px))`;
      }
    }
  });
});

// To Display the Cursor if the the more Post in each side
function checkNextAndPrevPost() {
  posts.forEach((post) => {
    if (post.classList.contains("current-post")) {
      if (post.nextElementSibling !== null)
        document
          .querySelector(".blog-posts .right-cursor")
          .classList.remove("hidden");
      else
        document
          .querySelector(".blog-posts .right-cursor")
          .classList.add("hidden");

      if (post.previousElementSibling !== null)
        document
          .querySelector(".blog-posts .left-cursor")
          .classList.remove("hidden");
      else
        document
          .querySelector(".blog-posts .left-cursor")
          .classList.add("hidden");
    }
  });
}

// Check For Input Email that in OUR NEWSLETTER
newsletterSubmit.onclick = () => {
  if (newsletterEmail.value === "")
    document
      .querySelector(".newsletter .input-email span")
      .classList.add("appear");
  else
    document
      .querySelector(".newsletter .input-email span")
      .classList.remove("appear");
};
// Remove Warnning Mesage when Focus in INput Field
newsletterEmail.oninput = () => {
  document
    .querySelector(".newsletter .input-email span")
    .classList.remove("appear");
};


