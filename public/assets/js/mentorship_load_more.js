document.addEventListener('DOMContentLoaded', function () {


  // ANIMATE THINGS AS YOU SCROLL
  const elementsToAnimate = document.querySelectorAll('.hidden-element');

  // Options for the Intersection Observer
  const options = {
    root: null, // Use the viewport as the container
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  // Callback function to execute when the element is in view
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animatedFadeIn');
        observer.unobserve(entry.target); // Stop observing the element after it becomes visible
      }
    });
  };

  // Create the Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, options);

  // Observe each element
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });


  // USE PLACEHOLDER BEFORE CAROUSEL IMAGES ARE LOADED
  var carousel = document.getElementById('carousel1');
  var placeholder = document.getElementById('carouselPlaceholder');
  var images = carousel.querySelectorAll('.carousel-item img');
  var imagesLoaded = 0;

  function onImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === images.length) {
      placeholder.style.display = 'none'; // Hide the placeholder
      carousel.classList.add('show'); // Show the carousel
    }
  }

  images.forEach(img => {
    img.addEventListener('load', onImageLoad);
    // Handle case where image might be cached
    if (img.complete) onImageLoad();
  });









  //LOAD MORE BUTTON FOR TESTIMONIALS
  const loadMoreButton = document.querySelector('.load-more-btn');
  const imageContainer = document.querySelector('.image-container');

  if (!loadMoreButton || !imageContainer) {
    console.error('Elements not found');
    return;
  }

  // Set the initial height and state
  const initialHeight = 1000; // Initial visible height
  let currentHeight = initialHeight;

  // Function to update the height of the container
  function updateContainerHeight() {
    // Remove 'collapsed' class if present
    if (imageContainer.classList.contains('collapsed')) {
      imageContainer.classList.remove('collapsed');
    }

    // Increase the height by 1000px
    currentHeight += 1000;
    imageContainer.style.maxHeight = currentHeight + 'px';

    // Hide the button if all content is visible
    if (currentHeight >= imageContainer.scrollHeight) {
      loadMoreButton.style.display = 'none';
    }
  }

  // Add event listener to the button
  loadMoreButton.addEventListener('click', function () {
    updateContainerHeight();
  });

  // Initially hide the button if content is already fully visible
  if (imageContainer.scrollHeight <= initialHeight) {
    imageContainer.classList.remove('collapsed');
    loadMoreButton.style.display = 'none';
  }
});