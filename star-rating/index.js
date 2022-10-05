// do something!
const StarRating = (stars) => {
  "use strict";

  // 별 보여주기
  function showStars() {
    let str = "";
    for (let i = 1; i <= +stars.dataset.maxRating; i++) {
      str += `<i class='bx bxs-star bx-flip-horizontal'></i>`;
    }
    const starContainer = document.createElement("div");
    starContainer.innerHTML = str;
    starContainer.classList.add("star-rating-container");
    stars.appendChild(starContainer);
  }

  function makestar() {
    const containers = document.querySelectorAll(".star-rating-container");

    const selectStars = containers[containers.length - 1].querySelectorAll("i");

    // hover 효과 추가
    selectStars.forEach((star, i) => {
      star.addEventListener("mouseover", () => {
        for (let j = 0; j <= i; j++) {
          [...selectStars][j].classList.add("hovered");
        }
      });

      star.addEventListener("mouseout", (e) => {
        if (e.target.tagName !== "I") {
          for (let j = 0; j < selectStars.length; j++) {
            [...selectStars][j].classList.remove("hovered");
          }
        } else {
          for (let j = i; j < selectStars.length; j++) {
            [...selectStars][j].classList.remove("hovered");
          }
        }
      });

      // select
      star.addEventListener("click", () => {
        if (i == 0 && ![...selectStars][1].classList.contains("selected")) {
          [...selectStars][0].classList.toggle("selected");
        } else {
          for (let j = 0; j <= i; j++) {
            [...selectStars][j].classList.add("selected");
          }

          for (let j = i + 1; j < selectStars.length; j++) {
            [...selectStars][j].classList.remove("selected");
          }
        }
      });
    });
  }

  ///////////////////////////

  function showRating() {
    const containers = document.querySelectorAll(".star-rating-container");

    const selctStars = containers[containers.length - 1].querySelectorAll("i");
    let num = 0;

    selctStars.forEach((star, i) => {
      star.addEventListener("click", () => {
        num = 0;
        for (let i = 0; i < [...selctStars].length; i++) {
          if ([...selctStars][i].classList.contains("selected")) {
            num += 1;
          }
        }

        for (let j = i + 1; j < [...selctStars].length; j++) {
          [...selctStars][j].classList.remove("hovered");
        }

        const myEvent = new CustomEvent("rating-change", {
          detail: num,
        });
        stars.dispatchEvent(myEvent);
      });
    });
  }
  showStars();
  makestar();
  showRating();
};

export default StarRating;
