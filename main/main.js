// const gallery = document.querySelector(".gallery");
// const { createApi } = require("unsplash-js");
// import { createApi } from "unsplash-js";
// const { createApi } = window.Unsplash;
// console.log(window.unsplash);

// async function fetchImages() {
//   const response = await fetch(
//   );
//   const data = await response.json();
//   console.log(data);
//   displayImages(data);
// }
// const unsplash =
//   "https://api.unsplash.com/photos/random?count=20&client_id=m_Zlnhtm6cNpi8NVLZsBcn5K-Ph6IFcLYq6Dc5m15s4";

// const unsplash = createApi({
//   accessKey:
//     "https://api.unsplash.com/photos/random?count=20&client_id=m_Zlnhtm6cNpi8NVLZsBcn5K-Ph6IFcLYq6Dc5m15s4",
// });

// Access the Unsplash API client from the global window object
// Access the Unsplash API client from the global window object
// const { createApi } = window.Unsplash;
document.addEventListener("DOMContentLoaded", function () {
  let searchInput = "";
  let page = 1;
  let data = [];

  async function searchImgs() {
    const accessKey = "m_Zlnhtm6cNpi8NVLZsBcn5K-Ph6IFcLYq6Dc5m15s4";
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchInput}&client_id=${accessKey}`;
    const searchApi = await fetch(url);
    const apiResponse = await searchApi.json();

    if (!apiResponse.error) {
      if (page === 1) {
        data = apiResponse.results;
      } else {
        data = data.concat(apiResponse.results);
      }
      displayImgs();
    }
  }

  function displayImgs() {
    const inputResults = document.getElementById("inputResults");
    let searchResults = "";
    if (data.length === 0) {
      searchResults = "<p class='text-center fw-bold'>No results found.</p>";
    } else {
      for (let i = 0; i < data.length; i++) {
        searchResults += `
          <div class="col-md-6 col-lg-4">
            <div class="card searchImg">
              <div id="cardImg">
                <img
                  src="${data[i].urls.small}"
                  class="card-img-top"
                  alt="${data[i].alt_description}"
                />
              </div>
              <div class="card-body">
                <a
                  href="${data[i].links.html}"
                  class="card-text"
                  target="_blank"
                  rel="noopener"
                >
                  ${data[i].alt_description}
                </a>
              </div>
            </div>
          </div>`;
      }
    }
    inputResults.innerHTML = searchResults;

    const showMoreBtn = document.getElementById("showMoreBtn");
    if (data.length > 0) {
      showMoreBtn.classList.remove("d-none");
    } else {
      showMoreBtn.classList.add("d-none");
    }
  }

  function performSearch() {
    searchInput = document.getElementById("searchInput").value;
    searchImgs();
  }

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
