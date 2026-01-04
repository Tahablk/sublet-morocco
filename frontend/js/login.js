/* Atlas Stay — Login (DEBUG SAFE) */

console.log("✅ login.js loaded");

const API_BASE_URL = "http://localhost:4000/api";

const form = document.getElementById("loginForm");
const errorBox = document.getElementById("error");

if (!form) {
  console.error("❌ loginForm not found");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("➡️ Login form submitted");

  errorBox.style.display = "none";
  errorBox.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showError("Veuillez remplir tous les champs.");
    return;
  }

  try {
    console.log("🌐 Sending request to backend…");

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("📥 Backend response:", data);

    if (!res.ok) {
      throw new Error(data.error || "Erreur inconnue");
    }

    localStorage.setItem("atlas_token", data.token);
    console.log("✅ Login success");

    window.location.href = "/explore.html";
  } catch (err) {
    console.error("❌ Login failed", err);
    showError(
      "Connexion impossible. Le backend est-il démarré ?"
    );
  }
});

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.style.display = "block";
}
