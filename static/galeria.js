let slideIndex = 1;
showSlides(slideIndex);

function nextSlide() {
  slideIndex++;
  if (slideIndex > document.getElementsByClassName("mySlides").length) {
    slideIndex = 1; // Loop back to the first slide
  }
  showSlides(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  slides[slideIndex - 1].style.display = "block";  
}