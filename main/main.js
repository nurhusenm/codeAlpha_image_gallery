const gallery = document.querySelector(".gallery");

async function fetchImages() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?count=10&client_id=m_Zlnhtm6cNpi8NVLZsBcn5K-Ph6IFcLYq6Dc5m15s4"
  );
  const data = await response.json();
  displayImages(data);
}

function displayImages(images) {
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    imgElement.addEventListener("click", () => openLightbox(image.urls.full));
    gallery.appendChild(imgElement);
  });
}

function openLightbox(imageUrl) {
  // Implement lightbox functionality here
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.innerHTML = `<img src="${imageUrl}" alt="Image" /><span class="close">&times;</span>`;
  document.body.appendChild(lightbox);

  lightbox.querySelector(".close").addEventListener("click", () => {
    document.body.removeChild(lightbox);
  });
}

fetchImages();
