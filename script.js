const carousel = document.getElementById("image-carousel");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;
let isReversing = false;

function showSlide(index) {
  carousel.style.transition = "transform 0.5s ease-in-out";
  carousel.style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
  if (!isReversing && currentIndex === 7) {
    isReversing = true;
  }

  currentIndex = isReversing ? (currentIndex - 1 + 8) % 8 : (currentIndex + 1) % 8;
  showSlide(currentIndex);
}

function prevSlide() {
  if (currentIndex === 0 && !isReversing) {
    isReversing = true;
    currentIndex = 7;
  } else {
    currentIndex = (currentIndex - 1 + 8) % 8;
    if (currentIndex < 0) {
      currentIndex = 7;
      isReversing = false;
    }
  }
  showSlide(currentIndex);
}

function transitionEndHandler() {
  if (currentIndex === 0 && isReversing) {
    carousel.style.transition = "none";
    showSlide(7);
    void carousel.offsetWidth;
    carousel.style.transition = "transform 0.5s ease-in-out";
    showSlide(0);
    isReversing = false;
  }
}

carousel.addEventListener("transitionend", transitionEndHandler);

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);

setInterval(nextSlide, 3000);
