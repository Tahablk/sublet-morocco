/* =========================================================
   Atlas Stay — App JS
   ========================================================= */

const API_BASE_URL = "http://localhost:4000/api";

/* -------------------------
   Fetch & render listings
-------------------------- */
async function loadListings() {
  const container = document.getElementById("listings");
  if (!container) return;

  try {
    const res = await fetch(`${API_BASE_URL}/listings`);
    const listings = await res.json();

    if (!listings.length) {
      container.innerHTML = "<p>Aucun logement trouvé.</p>";
      return;
    }

    container.innerHTML = "";

    listings.forEach((item) => {
      const el = document.createElement("article");
      el.className = "listing";

      el.innerHTML = `
        <div class="listing__img"></div>
        <div class="listing__body">
          <div class="listing__title">${item.title}</div>
          <div class="listing__meta">${item.city} · ${item.duration}</div>
          <div class="listing__price">€${item.price}</div>
        </div>
      `;

      container.appendChild(el);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Erreur lors du chargement.</p>";
  }
}

/* -------------------------
   Init
-------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  loadListings();
});
