const l = JSON.parse(localStorage.getItem("currentListing"));

document.getElementById("info").innerHTML = `
  <h2>${l.title}</h2>
  <p>${l.city}</p>
  <strong>€${l.price} / nuit</strong>
`;

const photos = document.getElementById("photos");
l.images.forEach(src => {
  const img = document.createElement("img");
  img.src = src;
  photos.appendChild(img);
});

const map = L.map("map").setView([l.lat, l.lon], 14);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
L.marker([l.lat, l.lon]).addTo(map);
