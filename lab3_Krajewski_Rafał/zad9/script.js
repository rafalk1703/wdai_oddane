var slides = document.querySelector('.slider-items').children;
var nextSlide = document.querySelector(".right-slide");
var prevSlide = document.querySelector(".left-slide");
var random = document.querySelector(".random");
var totalSlides = slides.length;
var index = 0;

nextSlide.onclick = function () {
     next("next");
}
prevSlide.onclick = function () {
     next("prev");
}

random.onclick = function () {
     next("rand");
}

function next(direction) {

     if (direction == "next") {
          index++;
          if (index == totalSlides) {
               index = 0;
          }
     }
     else if (direction == "prev") {
          if (index == 0) {
               index = totalSlides - 1;
          }
          else {
               index--;
          }
     }
     else {
          index = Math.floor(Math.random() * 4);
     }

     for (i = 0; i < slides.length; i++) {
          slides[i].classList.remove("active");
     }
     slides[index].classList.add("active");

}







