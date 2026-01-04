const container = document.getElementById("wishlist");
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if (!wishlist.length) {
  container.innerHTML = "<p>Aucun favori.</p>";
}

wishlist.forEach(l => {
  const card = document.createElement("div");
  card.className = "card listing-card";
  card.innerHTML = `
    <img src="${l.images[0]}">
    <div>
      <h4>${l.title}</h4>
      <p>${l.city}</p>
      <strong>€${l.price} / nuit</strong>
    </div>
  `;
  card.onclick = () => {
    localStorage.setItem("currentListing", JSON.stringify(l));
    window.location.href = "listing.html";
  };
  container.appendChild(card);
});
