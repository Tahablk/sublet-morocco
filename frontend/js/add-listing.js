const form = document.getElementById("listingForm");
const successMsg = document.getElementById("successMsg");
const addressInput = document.getElementById("addressInput");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");

/* ---------------- MAP (FREE) ---------------- */

const map = L.map("map").setView([31.63, -8.0], 6);
const marker = L.marker([31.63, -8.0]).addTo(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data[0];
}

addressInput.addEventListener("blur", async () => {
  if (!addressInput.value) return;
  const place = await geocode(addressInput.value);
  if (!place) return;

  const lat = place.lat;
  const lon = place.lon;

  map.setView([lat, lon], 15);
  marker.setLatLng([lat, lon]);
});

/* ---------------- IMAGE PREVIEW ---------------- */

imageInput.addEventListener("change", () => {
  imagePreview.innerHTML = "";
  [...imageInput.files].forEach(file => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    imagePreview.appendChild(img);
  });
});

/* ---------------- SUBMIT ---------------- */

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  const res = await fetch("http://localhost:4000/api/listings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    successMsg.textContent = "Logement publié avec succès.";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);
  }
});
