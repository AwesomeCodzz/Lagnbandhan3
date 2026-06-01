// ===== LANGUAGE MANAGEMENT =====

class LanguageManager {
  constructor() {
    this.currentLanguage = "mr";
    this.translations = {};
    this.isReady = false;
    this.pendingLanguageChange = null;
    this.init();
  }

  async init() {
    try {
      console.log("🌐 Language manager starting initialization...");

      // Load saved language preference
      const savedLang = storage.get("selectedLanguage") || "mr";
      console.log("📚 Loading translations...");
      await this.loadTranslations();
      console.log("✅ Translations loaded");

      // Wait for DOM to be ready
      if (document.readyState === "loading") {
        console.log("⏳ DOM not ready, waiting...");
        await new Promise((resolve) => {
          document.addEventListener("DOMContentLoaded", resolve);
        });
      }
      console.log("✅ DOM ready for language manager");

      // Wait a bit more to ensure all elements are rendered
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify critical elements exist (optional for static pages)
      const langToggle = document.getElementById("langToggle");
      const langText = document.getElementById("langText");

      // Only throw error if on home page (has toggle)
      if (!langToggle && document.getElementById("createBiodataBtn")) {
        throw new Error(
          "Language toggle button (#langToggle) not found in DOM"
        );
      }

      if (!langText && document.getElementById("createBiodataBtn")) {
        throw new Error("Language text element (#langText) not found in DOM");
      }

      // For pages without toggle, skip event listener setup
      if (!langToggle || !langText) {
        console.log(
          "⚠️ Language toggle not found - running in static page mode"
        );
        this.isReady = true;
        await this.setLanguage(savedLang);
        return; // Skip setupEventListeners
      }
      console.log("✅ Language toggle elements found");

      this.isReady = true;
      console.log("🎯 Setting language to:", savedLang);
      await this.setLanguage(savedLang);

      console.log("🎛️ Setting up event listeners...");
      this.setupEventListeners();

      // Initial language toggle text update
      this.updateLanguageToggleText();

      console.log("✅ Language manager initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing language manager:", error);
      throw error; // Re-throw to let main.js handle it
    }
  }

  async loadTranslations() {
    try {
      // Try to load from localStorage cache first for instant load
      const cachedEn = storage.get("cached_translations_en");
      const cachedMr = storage.get("cached_translations_mr");

      if (cachedEn && cachedMr) {
        this.translations.en = cachedEn;
        this.translations.mr = cachedMr;
        console.log("🚀 Translations loaded instantly from localStorage cache");

        // Quietly revalidate in background
        this.revalidateTranslations();
        return;
      }

      // Fallback to fetch if not cached
      await this.fetchAndCacheTranslations();
    } catch (error) {
      console.error("Error loading translations:", error);
      console.error("Error loading translations:", error);
      // Fallback translations
      this.translations = {
        en: {
          welcomeTitle: "Welcome to <br>Lagnbandhan Matrimony",
          loginText: "Login",
          signupText: "Sign Up",
          langText: "मराठी",
          loginLangText: "मराठी",
          signupLangText: "मराठी",
          profileForLabel: "Matrimony Profile for",
          selectProfileOption: "Select Profile For",
          selfOption: "Self",
          sonOption: "Son",
          daughterOption: "Daughter",
          brotherOption: "Brother",
          sisterOption: "Sister",
          relativeOption: "Relative",
          friendOption: "Friend",
          signupNameLabel: "Full Name",
          signupPhoneLabel: "Phone Number",
          signupEmailLabel: "Email (Optional)",
          signupPasswordLabel: "Password",
          loginPhoneLabel: "Phone Number",
          loginPasswordLabel: "Password",
        },
        mr: {
          welcomeTitle: "लग्नबंधन मॅट्रिमोनीमध्ये<br> आपले स्वागत आहे",
          loginText: "लॉगिन",
          signupText: "नोंदणी करा",
          langText: "English",
          loginLangText: "English",
          signupLangText: "English",
          profileForLabel: "लग्न प्रोफाइल यासाठी",
          selectProfileOption: "प्रोफाइल निवडा",
          selfOption: "स्वतःसाठी",
          sonOption: "मुलासाठी",
          daughterOption: "मुलीसाठी",
          brotherOption: "भावासाठी",
          sisterOption: "बहिणीसाठी",
          relativeOption: "नातेवाईकासाठी",
          friendOption: "मित्रासाठी",
          signupNameLabel: "पूर्ण नाव",
          signupPhoneLabel: "फोन नंबर",
          signupEmailLabel: "ईमेल (पर्यायी)",
          signupPasswordLabel: "पासवर्ड",
          loginPhoneLabel: "फोन नंबर",
          loginPasswordLabel: "पासवर्ड",
        },
      };
    }
  }

  async fetchAndCacheTranslations() {
    const enResponse = await fetch("assets/translations/en.json?v=2.0");
    const enData = await enResponse.json();
    this.translations.en = enData;
    storage.set("cached_translations_en", enData);

    const mrResponse = await fetch("assets/translations/mr.json?v=2.0");
    const mrData = await mrResponse.json();
    this.translations.mr = mrData;
    storage.set("cached_translations_mr", mrData);

    console.log("Translations fetched and cached successfully", {
      english: Object.keys(this.translations.en).length,
      marathi: Object.keys(this.translations.mr).length,
    });
  }

  async revalidateTranslations() {
    try {
      const [enRes, mrRes] = await Promise.all([
        fetch("assets/translations/en.json?v=2.0"),
        fetch("assets/translations/mr.json?v=2.0")
      ]);
      const [enData, mrData] = await Promise.all([
        enRes.json(),
        mrRes.json()
      ]);

      const enChanged = JSON.stringify(enData) !== JSON.stringify(this.translations.en);
      const mrChanged = JSON.stringify(mrData) !== JSON.stringify(this.translations.mr);

      if (enChanged || mrChanged) {
        this.translations.en = enData;
        this.translations.mr = mrData;
        storage.set("cached_translations_en", enData);
        storage.set("cached_translations_mr", mrData);
        console.log("♻️ Cache revalidated and updated");

        // Quietly refresh translations on page without reload
        this.updateAllTranslations();
      }
    } catch (e) {
      console.warn("Background translation revalidation failed:", e);
    }
  }

  setupEventListeners() {
    const langToggle = document.getElementById("langToggle");
    if (langToggle) {
      console.log("🎛️ Attaching click listener to language toggle");
      console.log("Button element:", langToggle);
      console.log("Button classes:", langToggle.className);
      console.log("Button innerHTML:", langToggle.innerHTML);

      // Remove any existing listeners
      langToggle.removeEventListener("click", this.handleLanguageToggle);

      // Bind the handler to preserve 'this' context
      this.handleLanguageToggle = this.handleLanguageToggle.bind(this);

      langToggle.addEventListener("click", this.handleLanguageToggle);
      console.log("✅ Language toggle event listener attached successfully");
    } else {
      console.error("❌ Language toggle button not found");
    }
  }

  handleLanguageToggle(e) {
    console.log("🎯 Language toggle CLICKED!");
    console.log("Current language before toggle:", this.currentLanguage);
    console.log("Translations available:", Object.keys(this.translations));
    console.log("Is ready:", this.isReady);

    e.preventDefault();
    e.stopPropagation();

    const newLang = this.currentLanguage === "en" ? "mr" : "en";
    console.log(
      `🔄 Switching language from "${this.currentLanguage}" to "${newLang}"`
    );

    this.setLanguage(newLang);

    // Modal language toggles
    const loginLangToggle = document.getElementById("loginLangToggle");
    if (loginLangToggle) {
      loginLangToggle.addEventListener("click", () => {
        const newLang = this.currentLanguage === "en" ? "mr" : "en";
        this.setLanguage(newLang);
      });
    }

    const signupLangToggle = document.getElementById("signupLangToggle");
    if (signupLangToggle) {
      signupLangToggle.addEventListener("click", () => {
        const newLang = this.currentLanguage === "en" ? "mr" : "en";
        this.setLanguage(newLang);
      });
    }
  }

  async setLanguage(lang) {
    console.log(`🌐 setLanguage called with: "${lang}"`);
    console.log("Available translations:", Object.keys(this.translations));
    console.log("Requested lang available:", !!this.translations[lang]);

    if (!this.translations[lang]) {
      console.error(`❌ Language ${lang} not supported`);
      return;
    }

    if (!this.isReady) {
      console.log("⏳ Not ready yet, storing pending change");
      this.pendingLanguageChange = lang;
      return;
    }

    console.log(`✅ Setting language to: ${lang}`);
    this.currentLanguage = lang;
    storage.set("selectedLanguage", lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    console.log(`📄 Updated HTML lang attribute to: ${lang}`);

    // ✅ NEW: Add CSS class for global Marathi rendering
    if (lang === "mr") {
      document.documentElement.classList.add("language-marathi");
      document.documentElement.classList.remove("language-english");
      console.log("🎨 Added language-marathi class to <html>");
    } else {
      document.documentElement.classList.remove("language-marathi");
      document.documentElement.classList.add("language-english");
      console.log("🎨 Added language-english class to <html>");
    }

    // Apply lang attribute to body and all text elements
    document.body.setAttribute("lang", lang);
    const allTextElements = document.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, div, button, a, label, li, td, th"
    );
    allTextElements.forEach((el) => {
      if (lang === "mr") {
        el.setAttribute("lang", "mr");
      } else {
        el.removeAttribute("lang");
      }
    });
    console.log(
      `📄 Applied lang="${lang}" to ${allTextElements.length} text elements`
    );

    // Update font family for Marathi
    if (lang === "mr") {
      document.body.style.fontFamily =
        "'Tiro Devanagari Marathi', 'Noto Sans Devanagari', 'Inter', sans-serif";
      // ✅ NEW: Apply font-feature-settings inline to ensure it applies
      document.body.style.fontFeatureSettings = '"liga" 1, "dlig" 1';
      document.body.style.fontVariantLigatures = "normal";
      console.log("🔤 Applied Marathi font family with ligature settings");
    } else {
      document.body.style.fontFamily =
        "'Inter', 'Noto Sans Devanagari', sans-serif";
      // ✅ NEW: Reset font-feature-settings for English
      document.body.style.fontFeatureSettings = "normal";
      document.body.style.fontVariantLigatures = "normal";
      console.log("🔤 Applied English font family");
    }

    // Apply all translations
    console.log("🔄 Applying all translations...");
    this.updateAllTranslations();

    // Update language toggle button text
    console.log("🎛️ Updating language toggle button text...");
    this.updateLanguageToggleText();

    console.log(`✅ Language successfully switched to: ${lang}`);
  }

  updateLanguageToggleText() {
    const langText = document.getElementById("langText");

    console.log("🎛️ Updating language toggle text...");
    console.log("langText element found:", !!langText);

    if (langText) {
      const translations = this.translations[this.currentLanguage];
      if (translations && translations.langText) {
        const oldText = langText.textContent;
        langText.textContent = translations.langText;
        console.log(
          `✅ Updated language toggle: "${oldText}" → "${translations.langText}"`
        );
      } else {
        console.warn(
          "❌ No langText translation found for:",
          this.currentLanguage
        );
      }
    } else {
      console.error("❌ langText element not found");
    }
  }

  updateAllTranslations() {
    this.updateTexts();
    this.updatePlaceholders();
    this.updateSelectOptions();
    this.updateDynamicTexts();
  }

  updateTexts() {
    const translations = this.translations[this.currentLanguage];
    if (!translations) {
      console.error("No translations available for:", this.currentLanguage);
      return;
    }

    let updatedCount = 0;
    let missingElements = [];

    console.log(`🔄 Updating texts for language: ${this.currentLanguage}`);
    console.log("Available translation keys:", Object.keys(translations));

    // Update all elements with IDs that match translation keys
    Object.keys(translations).forEach((key) => {
      const element = document.getElementById(key);
      if (element) {
        const oldText = element.textContent || element.innerHTML;

        // Use innerHTML for elements that contain HTML tags (like <br>)
        if (translations[key].includes("<br>")) {
          element.innerHTML = translations[key];
        } else {
          element.textContent = translations[key];
        }

        console.log(
          `✅ Updated #${key}: "${oldText}" → "${translations[key]}"`
        );

        // Set lang attribute for Marathi rendering
        if (this.currentLanguage === "mr") {
          element.setAttribute("lang", "mr");
        } else {
          element.removeAttribute("lang");
        }

        updatedCount++;
      } else {
        missingElements.push(key);
      }
    });

    if (missingElements.length > 0) {
      console.warn(
        "❌ Elements not found for translation keys:",
        missingElements
      );

      // Debug: List all elements with IDs on the page
      const allElements = document.querySelectorAll("[id]");
      const elementIds = Array.from(allElements).map((el) => el.id);
      console.log("🔍 All element IDs found on page:", elementIds);
    }

    console.log(
      `✅ Updated ${updatedCount} text elements for language: ${this.currentLanguage}`
    );
  }

  updateSelectOptions() {
    const translations = this.translations[this.currentLanguage];
    if (!translations) return;

    // Update profile for select options
    const profileOptions = [
      "selectProfileOption",
      "selfOption",
      "sonOption",
      "daughterOption",
      "brotherOption",
      "sisterOption",
      "relativeOption",
      "friendOption",
    ];

    let updatedCount = 0;
    profileOptions.forEach((optionId) => {
      const option = document.getElementById(optionId);
      if (option && translations[optionId]) {
        option.textContent = translations[optionId];
        updatedCount++;
      }
    });

    console.log(`Updated ${updatedCount} select options`);
  }

  updatePlaceholders() {
    const translations = this.translations[this.currentLanguage];
    if (!translations) return;

    let updatedCount = 0;

    // Update form placeholders using data-placeholder-key attributes
    const inputsWithPlaceholders = document.querySelectorAll(
      "[data-placeholder-key]"
    );

    inputsWithPlaceholders.forEach((input) => {
      const placeholderKey = input.getAttribute("data-placeholder-key");
      if (translations[placeholderKey]) {
        input.placeholder = translations[placeholderKey];
        updatedCount++;
      }
    });

    // Fallback: Update specific form placeholders by mapping
    const placeholderMappings = {
      loginPhone: "phonePlaceholder",
      loginPassword: "passwordPlaceholder",
      signupName: "namePlaceholder",
      signupPhone: "phonePlaceholder",
      signupEmail: "emailPlaceholder",
      signupPassword: "createPasswordPlaceholder",
    };

    Object.keys(placeholderMappings).forEach((inputId) => {
      const input = document.getElementById(inputId);
      const placeholderKey = placeholderMappings[inputId];
      if (input && translations[placeholderKey]) {
        input.placeholder = translations[placeholderKey];
        updatedCount++;
      }
    });

    console.log(`Updated ${updatedCount} placeholders`);
  }

  updateDynamicTexts() {
    const translations = this.translations[this.currentLanguage];
    if (!translations) return;

    // Update page title
    if (translations.pageTitle) {
      document.title = translations.pageTitle;
    }

    // Update any elements with data-translate attributes
    const translatableElements = document.querySelectorAll("[data-translate]");
    translatableElements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[key]) {
        if (translations[key].includes("<br>")) {
          element.innerHTML = translations[key];
        } else {
          element.textContent = translations[key];
        }
        // Set lang attribute for Marathi rendering
        if (this.currentLanguage === "mr") {
          element.setAttribute("lang", "mr");
        } else {
          element.removeAttribute("lang");
        }
      }
    });
  }

  // Utility method to manually refresh translations (for debugging)
  refreshTranslations() {
    if (this.isReady) {
      console.log("Manually refreshing translations...");
      this.updateAllTranslations();
    } else {
      console.log("Language manager not ready yet");
    }
  }

  getText(key) {
    return this.translations[this.currentLanguage]?.[key] || key;
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  isMarathi() {
    return this.currentLanguage === "mr";
  }

  isEnglish() {
    return this.currentLanguage === "en";
  }

  // Method to translate dynamic content
  translate(key, fallback = "") {
    return this.translations[this.currentLanguage]?.[key] || fallback || key;
  }

  // Missing method - fixes the updatePageTranslations() call error
  updatePageTranslations() {
    this.updateAllTranslations();
  }

  // Method to format text based on language
  formatText(text, isRTL = false) {
    if (this.isMarathi() && isRTL) {
      return `<span dir="rtl">${text}</span>`;
    }
    return text;
  }

  // Method to get appropriate font class
  getFontClass() {
    return this.isMarathi() ? "font-marathi" : "font-english";
  }
}

// Export class for other modules
window.LanguageManager = LanguageManager;
