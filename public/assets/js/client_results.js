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

  const videosPerPage = 6; // Number of videos to show per "Load More"
  let currentVideoCount = 0; // How many videos are currently displayed

    // Function to load the video source when showing videos
    function loadVideoSources(videoItem) {
        const iframe = videoItem.querySelector('iframe');
        if (iframe && !iframe.src) {
            iframe.src = iframe.getAttribute('data-src'); // Set the actual src from data-src
        }
    }

    // Function to show videos
    function showNextVideos() {
        const videos = document.querySelectorAll('.video-item');
        for (let i = currentVideoCount; i < currentVideoCount + videosPerPage; i++) {
            if (videos[i]) {
                videos[i].style.display = 'block'; // Display the video
                loadVideoSources(videos[i]);       // Load video source
            }
        }
        currentVideoCount += videosPerPage;
    }

    // Show initial videos when the page loads
    showNextVideos();




  //LOAD MORE BUTTON FOR TESTIMONIALS videos
  // -----------------------------------

  const loadMoreButton = document.querySelector('.load-more-btn-1');
  const imageContainer = document.querySelector('.videos-wrapper');

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
    showNextVideos();
    updateContainerHeight();
  });

  // Initially hide the button if content is already fully visible
  if (imageContainer.scrollHeight <= initialHeight) {
    imageContainer.classList.remove('collapsed');
    loadMoreButton.style.display = 'none';
  }
});