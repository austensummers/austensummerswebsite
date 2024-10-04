document.addEventListener('DOMContentLoaded', function () {

// LAZY LOADING FOR IMAGES
// -----------------------------------

// Fetch all images from both columns
const column1Images = document.querySelectorAll('.image-column-1 .image-item');
const column2Images = document.querySelectorAll('.image-column-2 .image-item');
const combinedImages = [];

// Merge images from both columns, alternating between them
const maxLength = Math.max(column1Images.length, column2Images.length);
for (let i = 0; i < maxLength; i++) {
    if (column1Images[i]) combinedImages.push(column1Images[i]);
    if (column2Images[i]) combinedImages.push(column2Images[i]);
}


const imagesPerPage = 15; // Number of images to show per "Load More"
let currentImageCount = 0; // How many images are currently displayed

  // Function to load the video source when showing images
  function loadImageSources(imageElement) {
    const src = imageElement.getAttribute('data-src');
    if (src) {
        imageElement.src = src; // Set the actual src from data-src
    }
  }

  // Function to show images
  function showNextImages() {
      for (let i = currentImageCount; i < currentImageCount + imagesPerPage; i++) {
          if (combinedImages[i]) {
              loadImageSources(combinedImages[i]);       // Load image source
              combinedImages[i].style.display = 'block'; // Display the image
          }
      }
      currentImageCount += imagesPerPage;
  }

  // Show initial images when the page loads
  showNextImages();



  //LOAD MORE BUTTON FOR IMAGES
  // -----------------------------------
  const loadMoreButton2 = document.querySelector('.load-more-btn-2');
  const imageContainer2 = document.querySelector('.image-container');

  if (!loadMoreButton2 || !imageContainer2) {
    console.error('Elements not found');
    return;
  }

  // Set the initial height and state
  const initialHeight2 = 1000; // Initial visible height
  let currentHeight2 = initialHeight2;

  // Function to update the height of the container
  function updateContainerHeight2() {
    // Remove 'collapsed' class if present
    if (imageContainer2.classList.contains('collapsed')) {
      imageContainer2.classList.remove('collapsed');
    }

    // Increase the height by 1000px
    currentHeight2 += 2000;
    imageContainer2.style.maxHeight = currentHeight2 + 'px';

    // Hide the button if all content is visible
    if (currentHeight2 >= imageContainer2.scrollHeight) {
      loadMoreButton2.style.display = 'none';
    }
  }

  // Add event listener to the button
  loadMoreButton2.addEventListener('click', function () {
    showNextImages();
    updateContainerHeight2();
  });

  // Initially hide the button if content is already fully visible
  if (imageContainer2.scrollHeight <= initialHeight2) {
    imageContainer2.classList.remove('collapsed');
    loadMoreButton2.style.display = 'none';
  }




// LAZY LOADING FOR VIDEOS
// -----------------------------------

const lazyVideos = document.querySelectorAll("iframe.video-item");

// Check if the IntersectionObserver is supported
if ("IntersectionObserver" in window) {
  // Create a new observer instance
  const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        // Replace the data-src attribute with the src attribute to start loading the video
        iframe.src = iframe.getAttribute("data-src");
        iframe.removeAttribute("data-src");
        observer.unobserve(iframe);
      }
    });
  });

  // Observe each lazy video
  lazyVideos.forEach(video => videoObserver.observe(video));
} else {
  // Fallback for older browsers: Load all videos immediately
  lazyVideos.forEach(iframe => {
    iframe.src = iframe.getAttribute("data-src");
    iframe.removeAttribute("data-src");
  });
}



});