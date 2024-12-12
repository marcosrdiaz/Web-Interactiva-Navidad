let slideIndex = 1;
showSlides(slideIndex);

function nextSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1; // Loop back to the first slide
  }
  if (n < 1) {
    slideIndex = slides.length; // Loop back to the last slide
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  slides[slideIndex - 1].style.display = "block";  
}