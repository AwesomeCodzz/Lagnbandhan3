/**
 * Main Application Controller
 * Coordinates all components of the matrimony website
 */
class App {
  constructor() {
    this.languageManager = null;
    this.biodataManager = null;
    this.init();
  }

  async init() {
    try {
      console.log("🚀 Initializing Lagnbandhan Matrimony Website...");

      // Wait for DOM to be fully ready
      if (document.readyState === "loading") {
        console.log("⏳ Waiting for DOM to load...");
        await new Promise((resolve) => {
          document.addEventListener("DOMContentLoaded", resolve);
        });
      }
      console.log("✅ DOM is ready");

      // Small delay to ensure all elements are rendered
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify critical elements exist
      const langToggle = document.getElementById("langToggle");
      const createBtn = document.getElementById("createBiodataBtn");
      const sendBtn = document.getElementById("sendBiodataBtn");

      if (!langToggle) {
        throw new Error("Language toggle button not found in DOM");
      }
      if (!createBtn) {
        throw new Error("Create biodata button not found in DOM");
      }
      if (!sendBtn) {
        throw new Error("Send biodata button not found in DOM");
      }
      console.log("✅ All critical elements found in DOM");

      // Initialize Language Manager first
      console.log("🌐 Initializing Language Manager...");
      this.languageManager = new LanguageManager();
      await this.languageManager.init();
      console.log("✅ Language Manager initialized");

      // Initialize Biodata Manager with language manager
      console.log("📝 Initializing Biodata Manager...");
      this.biodataManager = new BiodataManager(this.languageManager);
      console.log("✅ Biodata Manager initialized");

      // Make globally accessible for debugging
      window.languageManager = this.languageManager;
      window.biodataManager = this.biodataManager;

      // Global functions for debugging
      window.refreshTranslations = () => {
        if (window.languageManager) {
          window.languageManager.refreshTranslations();
        } else {
          console.log("languageManager not ready yet");
        }
      };

      console.log("🎉 All components initialized successfully!");
    } catch (error) {
      console.error("❌ Error initializing application:", error);
      this.showErrorMessage(
        `Failed to initialize application: ${error.message}. Please refresh the page.`
      );
    }
  }

  showErrorMessage(message) {
    // Create error toast
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-toast";
    errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

    // Add styles
    errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
        `;

    document.body.appendChild(errorDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentElement) {
        errorDiv.remove();
      }
    }, 5000);
  }
}

// Initialize the application when DOM is loaded
let app;

// Ensure DOM is fully ready before initializing
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  // DOM is already ready
  setTimeout(initializeApp, 0);
}

function initializeApp() {
  console.log("🚀 Starting app initialization...");
  console.log("Document ready state:", document.readyState);

  app = new App();

  // Export for global access
  window.app = app;
}

// Performance monitoring
window.addEventListener("load", () => {
  // Log performance metrics
  if ("performance" in window) {
    const loadTime =
      performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);

    // Check if we met our performance goal (< 2 seconds)
    if (loadTime > 2000) {
      console.warn("Page load time exceeded 2 seconds. Consider optimization.");
    }
  }
});

// Global error handling
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
  // In production, send error to monitoring service
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
  // In production, send error to monitoring service
});

// Hamburger mobile nav toggle (add exactly here!)
document.addEventListener("DOMContentLoaded", function () {
  var nav = document.querySelector(".site-nav");
  var toggle = document.getElementById("mobileNavToggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    // Optional: click outside closes menu
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("open");
      }
    });
  }
});
