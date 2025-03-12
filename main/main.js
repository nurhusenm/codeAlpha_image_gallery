const gallery = document.querySelector(".gallery");

// async function fetchImages() {
//   const response = await fetch(
//   );
//   const data = await response.json();
//   console.log(data);
//   displayImages(data);
// }
const unsplash =
  "https://api.unsplash.com/photos/random?count=20&client_id=m_Zlnhtm6cNpi8NVLZsBcn5K-Ph6IFcLYq6Dc5m15s4";

async function fetchImages(query, orientation = "", color = "") {
  try {
    const response = await unsplash.search.getPhotos({
      query: query,
      page: 1,
      perPage: 10,
      orientation: orientation, // e.g., 'landscape', 'portrait', 'squarish'
      color: color, // e.g., 'black_and_white', 'blue'
    });
    return response.response.results;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// function displayImages(images) {
//   images.forEach((image) => {
//     const imageElt = document.createElement("img");
//     imageElt.src = image.urls.small;
//     imageElt.alt = image.alt_description;
//     imageElt.addEventListener("click", () => openLightbox(image.urls.full));
//     gallery.appendChild(imageElt);
//   });
// }

function displayImages(images) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Clear previous images
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    gallery.appendChild(imgElement);
  });
}

function openLightbox(imageUrl) {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.innerHTML = `<img src="${imageUrl}" alt="image-url"/><span class="cross">&times;<span/>`;
  document.body.appendChild(lightbox);

  lightbox.querySelector(".cross").addEventListener("click", () => {
    document.body.removeChild(lightbox);
  });
}

document.getElementById("searchButton").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value;
  const orientation = document.getElementById("orientation").value;
  const color = document.getElementById("color").value;

  const images = await fetchImages(query, orientation, color);
  displayImages(images);
});

fetchImages();

// async function fetchImages() {
//   const response = await fetch(
//     "https://api.unsplash.com/photos/random?count=10&client_id=m_Zlnhtm6cNpi8NVLZsBcn5K-Ph6IFcLYq6Dc5m15s4"
//   );
//   const data = await response.json();
//   console.log(data);
//   displayImages(data);
// }

// function displayImages(images) {
//   // console.log(images);
//   images.forEach((image) => {
//     const imgElement = document.createElement("img");
//     imgElement.src = image.urls.small;
//     imgElement.alt = image.alt_description;
//     imgElement.addEventListener("click", () => openLightbox(image.urls.full));
//     gallery.appendChild(imgElement);
//   });
// }

// function openLightbox(imageUrl) {
//   // Implement lightbox functionality here
//   const lightbox = document.createElement("div");
//   lightbox.classList.add("lightbox");
//   lightbox.innerHTML = `<img src="${imageUrl}" alt="Image" /><span class="close">&times;</span>`;
//   document.body.appendChild(lightbox);

//   lightbox.querySelector(".close").addEventListener("click", () => {
//     document.body.removeChild(lightbox);
//   });
// }

// fetchImages();
