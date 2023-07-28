class Slider {
  curSlide = 0; // The index of the current slide
  // slides = []; // The array of slides
  // autoPlay = true; // Determines whether the slides will automatically transition
  // interval = 5000; // The interval between autoPlay transitions
  // showNavDots = true; // Determines whether navigation dots will be shown
  // showNavArrows = true; // Determines whether navigation arrows will be shown
  // intervalId = null; // The id of the interval between autoPlay transitions

  constructor(
    slides,
    autoPlay = true,
    interval = 5000,
    showNavDots = true,
    showNavArrows = true
  ) {
    this.slides = slides;
    this.autoPlay = autoPlay;
    this.interval = interval;
    this.showNavDots = showNavDots;
    this.showNavArrows = showNavArrows;
    this.init();
  }

  // Getters and setters

  nextSlide() {
    // If the current slide is the last slide, then set the current slide to be the first slide
    if (this.curSlide >= this.slides.length - 1) {
      this.curSlide = 0;
    } else {
      // Otherwise, increment the current slide by 1
      this.curSlide++;
    }
    this.update(); // Call the update() method
  }

  prevSlide() {
    // If the current slide is the first slide, then set the current slide to be the last slide
    if (this.curSlide <= 0) {
      this.curSlide = this.slides.length - 1;
    } else {
      // Otherwise, decrement the current slide by 1
      this.curSlide--;
    }
    this.update(); // Call the update() method
  }

  update() {
    // Update the position of the slides so that the current slide is in the center
    this.slides.forEach((slide, index) => {
      slide.style.left = `${(index - this.curSlide) * 100}%`;
    });
    this.resetInterval(); // Reset the interval to avoid autoPlay with previous interval while manually navigating
    this.updateNavDots(); // Update the navigation dots
  }

  autoPlaySlides() {
    // Set the intervalId to the id of the interval between autoPlay transitions
    this.intervalId = setInterval(() => {
      this.nextSlide(); // Call `nextSlide()` every `interval` milliseconds
    }, this.interval);
  }

  resetInterval() {
    // Clear the interval
    clearInterval(this.intervalId);
    if (this.autoPlay) {
      this.autoPlaySlides();
    }
  }

  init() {
    // Set the first slide to be the current slide
    this.slides.forEach((slide, index) => {
      slide.style.left = `${index * 100}%`;
    });

    // If `autoplay` is true, then call autoPlaySlides()
    if (this.autoPlay) {
      this.autoPlaySlides();
    }

    // If `showNavDots` is true, then call createNavDots()
    if (this.showNavDots) {
      const nav = document.createElement("div");
      nav.setAttribute("id", "slide-nav");
      nav.classList.add("slide-nav");
      document.getElementById("bayt-slider").appendChild(nav);
      this.createNavDots();
    }

    // If `showNavArrows` is true, then call createNavArrows()
    if (this.showNavArrows) {
      this.createNavArrows();
    }
  }

  createNavDots() {
    // Create the navigation dots
    const nav = document.getElementById("slide-nav");

    this.slides.forEach((slide, index) => {
      const dot = document.createElement("div");
      dot.classList.add("navdot");
      if (index == this.curSlide) {
        // If the index is the current slide, then add the `active` class to the dot
        dot.classList.add("active");
      } else {
        // Otherwise, remove the `active` class from the dot
        dot.classList.remove("active");
      }
      // Add an event listener to the dot that calls `update()` when the dot is clicked
      dot.addEventListener("click", () => {
        this.curSlide = index;
        this.update();
      });
      nav.appendChild(dot);
    });
  }

  updateNavDots() {
    // Update the navigation dots
    const nav = document.getElementById("slide-nav");
    const dots = nav.querySelectorAll(".navdot");
    dots.forEach((dot, index) => {
      if (index == this.curSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Create the navigation arrows if `showNavArrows` is true
  createNavArrows() {
    const container = document.getElementsByClassName("slide-container")[0]; // Get the slide container
    const prev = document.createElement("div"); // Create the previous arrow
    prev.classList.add("prev"); // Add the `prev` class to the previous arrow
    prev.innerHTML = "❮"; // Add the html for the previous arrow
    prev.addEventListener("click", () => {
      this.prevSlide(); // Call `prevSlide()` when the previous arrow is clicked
    });
    container.appendChild(prev); // Append the previous arrow to the slide container

    const next = document.createElement("div"); // Create the next arrow
    next.classList.add("next"); // Add the `next` class to the next arrow
    next.innerHTML = "❯"; // Add the html for the next arrow
    next.addEventListener("click", () => {
      this.nextSlide(); // Call `nextSlide()` when the next arrow is clicked
    });
    container.appendChild(next); // Append the next arrow to the slide container
  }
}
