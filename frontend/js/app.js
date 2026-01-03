/* =========================================================
   Sublet Morocco — App JS
   Keep it simple: language switch + basic UI behaviors
   ========================================================= */

const I18N = {
  fr: {
    nav: { explore: "Explorer", host: "Espace hôte", login: "Connexion" },
    home: {
      eyebrow: "Séjours courte durée au Maroc",
      title: "Une expérience premium, simple et fiable.",
      subtitle: "Des logements sélectionnés, une information claire, et des hôtes accessibles — sans complexité.",
      ctaExplore: "Explorer les logements",
      ctaHost: "Proposer un logement",
      trust1: { title: "Prix & durée visibles", text: "Toujours clairs, dès la recherche." },
      trust2: { title: "Localisation transparente", text: "Carte et quartiers, sans surprise." },
      trust3: { title: "Contact direct", text: "Chat simple, uniquement si besoin." },
      sample: { city: "Marrakech", duration: "Semaine", title: "Riad calme, terrasse & lumière", per: "/ nuit", link: "Voir des logements similaires" },
      cities: {
        title: "Villes populaires",
        desc: "Choisissez une destination, puis filtrez par budget et durée.",
        hint: "Riad • centre • calme",
        hint2: "Business • mer • confort",
        hint3: "Calme • sûr • premium",
        hint4: "Vue • brise • design"
      }
    },
    footer: { tagline: "Court séjour, confiance, clarté.", explore: "Explorer", host: "Devenir hôte", login: "Connexion" }
  },

  en: {
    nav: { explore: "Explore", host: "Host area", login: "Sign in" },
    home: {
      eyebrow: "Short stays in Morocco",
      title: "Premium, simple, and reliable.",
      subtitle: "Curated homes, clear information, and accessible hosts — without complexity.",
      ctaExplore: "Explore listings",
      ctaHost: "List your place",
      trust1: { title: "Price & duration upfront", text: "Always visible from search." },
      trust2: { title: "Transparent location", text: "Map and neighborhoods, no surprises." },
      trust3: { title: "Direct contact", text: "Simple chat, only when needed." },
      sample: { city: "Marrakech", duration: "Week", title: "Quiet riad with terrace & light", per: "/ night", link: "See similar homes" },
      cities: {
        title: "Popular cities",
        desc: "Pick a destination, then filter by budget and duration.",
        hint: "Riad • central • calm",
        hint2: "Business • seaside • comfort",
        hint3: "Calm • safe • premium",
        hint4: "Views • breeze • design"
      }
    },
    footer: { tagline: "Short stays, trust, clarity.", explore: "Explore", host: "Become a host", login: "Sign in" }
  },

  ar: {
    nav: { explore: "استكشاف", host: "منطقة المضيف", login: "تسجيل الدخول" },
    home: {
      eyebrow: "إقامات قصيرة في المغرب",
      title: "تجربة راقية، بسيطة وموثوقة.",
      subtitle: "مساكن مختارة، معلومات واضحة، ومضيفون متاحون — بدون تعقيد.",
      ctaExplore: "استكشاف المساكن",
      ctaHost: "عرض مسكنك",
      trust1: { title: "السعر والمدة واضحان", text: "مرئيان دائماً منذ البحث." },
      trust2: { title: "موقع شفاف", text: "خريطة وأحياء بدون مفاجآت." },
      trust3: { title: "تواصل مباشر", text: "محادثة بسيطة عند الحاجة." },
      sample: { city: "مراكش", duration: "أسبوع", title: "رياض هادئ مع شرفة وإضاءة", per: "/ ليلة", link: "عرض مساكن مشابهة" },
      cities: {
        title: "مدن شائعة",
        desc: "اختر وجهتك ثم قم بالتصفية حسب الميزانية والمدة.",
        hint: "رياض • وسط • هدوء",
        hint2: "عمل • بحر • راحة",
        hint3: "هدوء • أمان • راقٍ",
        hint4: "إطلالة • نسيم • تصميم"
      }
    },
    footer: { tagline: "إقامات قصيرة، ثقة، وضوح.", explore: "استكشاف", host: "كن مضيفاً", login: "تسجيل الدخول" }
  }
};

function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), obj);
}

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.fr;

  // RTL handling only for Arabic
  const isRTL = lang === "ar";
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.dataset.lang = lang;

  // Update label
  const label = document.getElementById("langLabel");
  if (label) label.textContent = lang.toUpperCase();

  // Translate
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = getByPath(dict, key);
    if (typeof value === "string") el.textContent = value;
  });

  // Persist
  try { localStorage.setItem("sm_lang", lang); } catch (_) {}
}

function setupLanguageMenu() {
  const btn = document.getElementById("langButton");
  const menu = document.getElementById("langMenu");
  if (!btn || !menu) return;

  const close = () => {
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });

  menu.querySelectorAll("[data-lang]").forEach((item) => {
    item.addEventListener("click", () => {
      const lang = item.getAttribute("data-lang");
      applyLanguage(lang);
      close();
    });
  });

  // Close on outside click / Escape
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

(function init() {
  setupLanguageMenu();

  let initial = "fr";
  try {
    initial = localStorage.getItem("sm_lang") || "fr";
  } catch (_) {}

  applyLanguage(initial);
})();
