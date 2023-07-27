class Slider {

  // slides - array of slides
  // autoPlay - boolean [Default: true]
  // interval - time in ms [Default: 5000]

  constructor(slides, autoPlay = true, interval = 5000) {
    this.slides = slides;
    this.autoPlay = autoPlay;
    this.interval = interval;
    this.slideIndex = 1;
    this.showSlides(this.slideIndex);
    if (this.autoPlay) {
      this.autoPlaySlides();
    }
  }

  // Change the Slide by n
  changeSlide(n) {
    this.showSlides((this.slideIndex += n));
  }

  // Set the current Slide to n
  setCurrentSlide(n) {
    this.showSlides((this.slideIndex = n));
  }

  // Show the Slide n
  showSlides(n) {
    let i;
    let slides = this.slides;
    let navdots = document.getElementsByClassName("navdot");
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < navdots.length; i++) {
      navdots[i].className = navdots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "flex";
    navdots[this.slideIndex - 1].className += " active";
  }

  // Auto Play the Slides if `autoPlay` is true
  autoPlaySlides() {
    let self = this;
    setInterval(function () {
      self.changeSlide(1);
    }, this.interval);
  }
}
