export function loadingAnimation(imageName) {
  const img = document.getElementById(imageName);
  const spinner = img.nextElementSibling;

  const hideSpinner = () => {
    spinner.style.display = 'none';
  };

  const showSpinner = () => {
    spinner.style.display = 'block';
  };

  // Ensure spinner is shown initially
  showSpinner();

  // Check if image is loaded or wait for it to load
  if (img.complete) {
      hideSpinner();
  } else {
      img.addEventListener('load', hideSpinner); // hide spinner when image loads
      img.addEventListener('error', () => {
          spinner.style.display = 'none'; // hide spinner on error
          // Optionally, display an error message or a default image here
      });
  }
}
