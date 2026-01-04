const preview = document.getElementById("preview");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

let images = [];

// PHOTO PREVIEW + MODAL
document.getElementById("images").addEventListener("change", e => {
  preview.innerHTML = "";
  images = [];

  [...e.target.files].forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      images.push(reader.result);
      const img = document.createElement("img");
      img.src = reader.result;
      img.onclick = () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
      };
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

modal.onclick = () => modal.style.display = "none";

// MAP
const map = L.map("map").setView([31.7917, -7.0926], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

document.getElementById("address").addEventListener("blur", e => {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(e.target.value)}`)
    .then(r => r.json())
    .then(d => {
      if (!d[0]) return;
      map.setView([d[0].lat, d[0].lon], 14);
      L.marker([d[0].lat, d[0].lon]).addTo(map);
    });
});

// PUBLISH
document.getElementById("publish").onclick = () => {
  alert("Logement publié (mock). Redirection...");
  location.href = "index.html";
};
