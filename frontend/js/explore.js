const results = document.getElementById("results");

const map = L.map("map").setView([32, -6], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let markers = [];

async function loadListings(filters = {}) {
  results.innerHTML = "Chargement...";
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`http://localhost:4000/api/listings?${params}`);
  const listings = await res.json();

  results.innerHTML = "";

  listings.forEach(l => {
    const card = document.createElement("div");
    card.className = "card listing-card";

    card.innerHTML = `
      <img src="${l.images?.[0] || 'https://picsum.photos/400/300'}">
      <div class="listing-info">
        <h4>${l.title}</h4>
        <p>${l.city}</p>
        <strong>€${l.price_per_night} / nuit</strong>
        <button class="wishlist">♡ Wishlist</button>
      </div>
    `;

    card.onclick = () => {
      localStorage.setItem("currentListing", JSON.stringify(l));
      window.location.href = "listing.html";
    };

    card.querySelector(".wishlist").onclick = e => {
      e.stopPropagation();
      toggleWishlist(l);
    };

    results.appendChild(card);

    if (l.lat && l.lon) {
      const marker = L.marker([l.lat, l.lon]).addTo(map);
      markers.push(marker);
    }
  });
}

function applyFilters() {
  const city = document.getElementById("city").value;
  const nights = document.getElementById("nights").value;
  const maxPrice = document.getElementById("maxPrice").value;

  loadListings({
    city,
    nights,
    maxPrice
  });
}

function toggleWishlist(listing) {
  let w = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (w.find(x => x.id === listing.id)) {
    w = w.filter(x => x.id !== listing.id);
  } else {
    w.push(listing);
  }
  localStorage.setItem("wishlist", JSON.stringify(w));
  alert("Wishlist mise à jour ❤️");
}

// INITIAL LOAD
loadListings();
