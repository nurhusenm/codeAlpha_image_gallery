const toggle = document.querySelector(".toggle");
let isDark = false;

toggle.addEventListener("click", () => {
  isDark = !isDark;
  document.body.classList.toggle("dark-theme");
  // Update toggle icon
  const icon = toggle.querySelector("i");
  if (isDark) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let searchInput = "";
  let page = 1;
  let data = [];
  let isLoading = false; // Add loading state

  // Add loading indicator function
  function showLoading() {
    const inputResults = document.getElementById("inputResults");
    inputResults.innerHTML = '<div class="loading">Loading images...</div>';
  }

  async function fetchRandomImages() {
    try {
      if (isLoading) return; // Prevent multiple simultaneous requests
      isLoading = true;
      showLoading();

      const accessKey = "m_Zlnhtm6cNpi8NVLZsBcn5K-Ph6IFcLYq6Dc5m15s4";
      const randomUrl = `https://api.unsplash.com/photos/random?count=10&client_id=${accessKey}`;
      const response = await fetch(randomUrl);
      const randomData = await response.json();

      if (response.ok) {
        data = randomData;
        displayImgs();
      } else {
        console.error("Error fetching random images:", randomData);
        data = [];
        displayImgs();
      }
    } catch (error) {
      console.error("Error fetching random images:", error);
      data = [];
      displayImgs();
    } finally {
      isLoading = false;
    }
  }

  async function searchImgs() {
    try {
      const trimmedInput = searchInput.trim();
      if (!trimmedInput) {
        // Show error message for empty search
        data = [];
        displayImgs("Please enter a search term like:- cars, homes ...");
        return;
      }

      if (isLoading) return; // Prevent multiple simultaneous requests
      isLoading = true;
      showLoading();

      const accessKey = "m_Zlnhtm6cNpi8NVLZsBcn5K-Ph6IFcLYq6Dc5m15s4";
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${trimmedInput}&client_id=${accessKey}&per_page=12`;
      const searchApi = await fetch(url);
      const apiResponse = await searchApi.json();

      if (searchApi.ok) {
        if (page === 1) {
          data = apiResponse.results;
        } else {
          data = data.concat(apiResponse.results);
        }
        displayImgs();
      } else {
        console.error("Error searching images:", apiResponse);
        data = [];
        displayImgs("An error occurred while searching");
      }
    } catch (error) {
      console.error("Error searching images:", error);
      data = [];
      displayImgs("An error occurred while searching");
    } finally {
      isLoading = false;
    }
  }

  function displayImgs(errorMessage = "") {
    const inputResults = document.getElementById("inputResults");
    let searchResults = "";

    if (errorMessage) {
      searchResults = `<p class='text-center fw-bold error-message'>${errorMessage}</p>`;
    } else if (data.length === 0) {
      searchResults = "<p class='text-center fw-bold'>No results found.</p>";
    } else {
      // Pre-load images before displaying
      const imagePromises = data.map((item) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = item.urls.small;
        });
      });

      Promise.all(imagePromises).then(() => {
        searchResults = data
          .map(
            (item, i) => `
          <div class="col-md-6 col-lg-4">
            <div class="card searchImg">
              <div class="cardImg" data-index="${i}">
                <img
                  src="${item.urls.small}"
                  class="card-img-top"
                  alt="${item.alt_description}"
                  loading="lazy"
                />
              </div>
              <div class="card-body">
                <a
                  href="${item.links.html}"
                  class="card-text"
                  target="_blank"
                  rel="noopener"
                >
                  ${item.alt_description}
                </a>
              </div>
            </div>
          </div>`
          )
          .join("");

        inputResults.innerHTML = searchResults;
        addImageClickListeners();
      });
    }

    if (errorMessage || data.length === 0) {
      inputResults.innerHTML = searchResults;
    }

    const showMoreBtn = document.getElementById("showMoreBtn");
    showMoreBtn.classList.toggle("d-none", data.length === 0);
  }

  // Separate function for adding click listeners
  function addImageClickListeners() {
    const cardImages = document.querySelectorAll(".cardImg");
    cardImages.forEach((card) => {
      card.addEventListener("click", (e) => {
        const index = card.dataset.index;
        const lightbox = document.createElement("div");
        lightbox.classList.add("lightbox");
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <img src="${data[index].urls.regular}" alt="${data[index].alt_description}" />
            <span class="cross">&times;</span>
          </div>
        `;
        document.body.appendChild(lightbox);

        lightbox.querySelector(".cross").addEventListener("click", () => {
          document.body.removeChild(lightbox);
        });
      });
    });
  }

  function performSearch() {
    const inputValue = document.getElementById("searchInput").value;
    if (!inputValue.trim()) {
      data = [];
      displayImgs("Please enter a search term");
      return;
    }
    searchInput = inputValue;
    page = 1;
    searchImgs();
  }

  // Initial load of random images
  fetchRandomImages();

  // Event listener for Enter key on search input
  document
    .getElementById("searchInput")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        page = 1;
        performSearch();
      }
    });

  // Event listener for search button click
  document.getElementById("searchBtn").addEventListener("click", function () {
    page = 1;
    performSearch();
  });

  // Event listener for show more button click
  document.getElementById("showMoreBtn").addEventListener("click", function () {
    page++;
    if (searchInput === document.getElementById("searchInput").value) {
      performSearch();
    } else {
      searchImgs();
    }
  });
});
