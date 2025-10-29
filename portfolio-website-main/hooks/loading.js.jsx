// Minimum loading time in milliseconds (e.g., 2 seconds)
const MIN_LOADING_TIME = 2000;

function showLoadingScreen() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  // Show loader, hide content
  if (loader) loader.style.display = "flex";
  if (content) content.style.display = "none";

  const startTime = Date.now();

  const handleLoad = () => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

    setTimeout(() => {
      if (loader) loader.style.display = "none";
      if (content) content.style.display = "block";
    }, remainingTime);
  };

  if (document.readyState === "complete") {
    handleLoad();
  } else {
    window.addEventListener("load", handleLoad);
  }
}

// Run automatically when DOM is ready
document.addEventListener("DOMContentLoaded", showLoadingScreen);
