/**
 * Biodata Manager - Enhanced for Gender + Caste Selection → Google Forms
 * Manages biodata creation flow with redirection to 26 specific Google Forms
 */
class BiodataManager {
  constructor(languageManager) {
    this.languageManager = languageManager;
    this.selectedGender = null;
    this.selectedCaste = null;

    // Google Forms URLs for all 26 combinations (13 castes × 2 genders)
    // TODO: Replace these placeholder URLs with your actual Google Form URLs
    this.googleFormUrls = {
      // Male Forms
      maratha_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSfhNkeS6RmaCjBX_D0IUPk1RynYYKE9NENNPNiUu9rUHIATiQ/viewform?usp=dialog",
      koli_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSeTeNU_1qjt9dxyITmH3jqDCwia_xetKzacCW1r7PjiGnhYKg/viewform?usp=dialog",
      teli_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSf3IcgxBE3TbtWQ_ObkJQUzt6IeUSffP0lvuyx7y-_BC-NU3Q/viewform?usp=dialog",
      wani_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSdMzwrYbdZJiAYV0J3pezPjm83u6wot2cOclZj9egKYOGPpHg/viewform?usp=dialog",
      vanjari_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSfPoTbKt6G0ROQrRMpFvBsag8NKKDaJ1guy83xaK9iGUpqL9w/viewform?usp=dialog",
      mali_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSc0AP8OE1AYsSTcY_VEvE5RbhxCoH5BxhQaA4Sdylytg4ax5A/viewform?usp=dialog",
      sonar_male:
        "https://docs.google.com/forms/d/e/1FAIpQLScSQ_hVV6QpsQgJ6G2X2lBt39FXIFyv35bvtClBO-kY0aX8IQ/viewform?usp=dialog",
      shimpi_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSf_rGRkwLO7XTbYoAexYyMeunLTmF1NWppQ62RKoDXQwyQP2A/viewform?usp=dialog",
      jain_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSfuHR3dMdzonwKmCr8LiTXTHE_s3AMrojqbNHWs1o_OavaBeg/viewform?usp=dialog",
      pardeshi_male:
        "https://docs.google.com/forms/d/e/1FAIpQLScqWcRkcBlD3XptSKaG3TAhKbjUQSFoLjxlWSCNfkVMwFnFAQ/viewform?usp=dialog",
      kumbhar_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSdwm8s1Tq7uT9szCXPOqmoFCxKmjj8j2rs4WJdecC_teO-qwQ/viewform?usp=dialog",
      rajput_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSc6OCPjuwUBD1mU71Ll3FlAohgPfFkkazCND3UDJU17lniqbQ/viewform?usp=dialog",
      leva_patil_male:
        "https://docs.google.com/forms/d/e/1FAIpQLSds8h33wOhI2HUnSQXiCuaD2QajASs4xE8wbzMOF4xQ7hJUzw/viewform?usp=dialog",

      // Female Forms
      maratha_female:
        "https://docs.google.com/forms/d/e/1FAIpQLScKYEmPwyd8OjEUsl4VO_e6wt7M0rU0mfK5Rng7ZBfeaAOtCA/viewform?usp=dialog",
      koli_female:
        "https://docs.google.com/forms/d/e/1FAIpQLSe9kCM8PbSw7P1hsG4AkMO5TndOflyoaBpIodrGf_NRrxmJ5A/viewform?usp=dialog",
      teli_female:
        "https://docs.google.com/forms/d/e/1FAIpQLSd7kA4nxTKTdNNHYOwrsFrTwKFETljVjFGDBuQpjBAkSUsNIg/viewform?usp=dialog",
      wani_female:
        "https://docs.google.com/forms/d/e/1FAIpQLSeVZ8mUqF9J_sufnxsh-aSbIQhKyOC1s422MeXCnS2VWxy0EQ/viewform?usp=dialog",
      vanjari_female:
        "https://docs.google.com/forms/d/e/1FAIpQLScC_kKS0mJYARwB9z0BgTxf62mDuZturbsrYtt7-nVxH8I8qw/viewform?usp=dialog",
      mali_female:
        "https://docs.google.com/forms/d/e/1FAIpQLScEx2Ao1ScpD5V7GhSTaZBSDu5I3qaoQyPLVPiMxajB7dcuiQ/viewform?usp=dialog",
      sonar_female:
        "https://docs.google.com/forms/d/e/1FAIpQLSeablE5ZZyIAr0JFz9VNOeN7CjFGAtMskoTVjgqwFOBAnOKBg/viewform?usp=dialog",
      shimpi_female:
        "https://docs.google.com/forms/d/e/1FAIpQLSe7DCpuVftK3fcYdZwmY9ZeMd6_duD3s8zIlXV_usUeTf5ROA/viewform?usp=dialog",
      jain_female:
        "https://docs.google.com/forms/d/e/1FAIpQLScByaMmT_e129xmx2RZ1R8oi80DAllOEFFhAjsfY6CZg2-t1g/viewform?usp=dialog",
      pardeshi_female:
        "https://docs.google.com/forms/d/e/1FAIpQLSfGuGjD2gs-vJSrNUpbEcHQC9-r2Ad2eXl7P2FAllugigMZnQ/viewform?usp=dialog",
      kumbhar_female:
        "https://docs.google.com/forms/d/e/1FAIpQLSd_N1qZfLj2WLbvWYsq9y1pXHekhJYBIuTbNnrKJmQFSF3k0g/viewform?usp=dialog",
      rajput_female:
        "https://docs.google.com/forms/d/e/1FAIpQLSce9R30flMNF9qKgXlyavFScGYUOatDOMZYt1RogFMVljpAfg/viewform?usp=dialog",
      leva_patil_female:
        "https://docs.google.com/forms/d/e/1FAIpQLScFIIoh-lHL0x2KALBQcJGTqhe4gFD-CD3Sun8GbvCusr20XA/viewform?usp=dialog",
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.createModals();
  }

  setupEventListeners() {
    // Create Biodata button - starts the gender selection process
    const createBiodataBtn = document.getElementById("createBiodataBtn");
    if (createBiodataBtn) {
      createBiodataBtn.addEventListener("click", () =>
        this.showGenderSelection()
      );
    }

    // Send existing biodata button - shows WhatsApp modal
    const sendBiodataBtn = document.getElementById("sendBiodataBtn");
    if (sendBiodataBtn) {
      sendBiodataBtn.addEventListener("click", () => this.showWhatsAppModal());
    }
  }

  createModals() {
    this.createGenderSelectionModal();
    this.createCasteSelectionModal();
    this.createWhatsAppModal();
  }

  createGenderSelectionModal() {
    const modalHTML = `
            <div id="genderModal" class="modal">
                <div class="modal-content gender-modal-content">
                    <div class="modal-header-enhanced">
                      <span class="close" 
                      style="font-size:2rem; position:absolute; left:0; right:0; top:0.5rem; margin:0 auto; cursor:pointer; z-index:10; width:fit-content; text-align:center;"
                      aria-label="Close Gender Selection modal">&times;</span>
                    </div>
                    <div class="modal-body-enhanced">
                        <h2 data-translate="profileFor">Creating matrimony profile for:</h2>
                        
                        <div class="gender-options">
                            <button class="gender-btn male-btn" data-gender="male">
                                <div class="gender-image">
                                    <img src="assets/images/indianGroom.png" alt="Indian Groom" />
                                </div>
                                <span class="gender-label" data-translate="groom">Groom</span>
                            </button>
                            <button class="gender-btn female-btn" data-gender="female">
                                <div class="gender-image">
                                    <img src="assets/images/indianBride.png" alt="Indian Bride" />
                                </div>
                                <span class="gender-label" data-translate="bride">Bride</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Add event listeners for gender selection
    const genderBtns = document.querySelectorAll(".gender-btn");
    console.log("Found gender buttons:", genderBtns.length);

    genderBtns.forEach((btn, index) => {
      const genderValue = btn.dataset.gender;
      console.log(`Gender button ${index + 1}:`, genderValue);

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const clickedBtn = e.target.closest(".gender-btn");
        const selectedGender = clickedBtn.dataset.gender;

        console.log("🎯 Gender button clicked:", selectedGender);
        console.log("Button element:", clickedBtn);
        console.log("Dataset:", clickedBtn.dataset);

        this.selectGender(selectedGender);
      });
    });

    // Close modal functionality
    const genderModal = document.getElementById("genderModal");
    const closeBtn = document.querySelector("#genderModal .close");
    closeBtn.addEventListener("click", () => this.hideGenderSelection());

    // Close modal when clicking outside
    genderModal.addEventListener("click", (e) => {
      if (e.target === genderModal) {
        this.hideGenderSelection();
      }
    });
  }

  createCasteSelectionModal() {
    const modalHTML = `
            <div id="casteModal" class="modal">
                <div class="modal-content caste-content">
                    <div class="modal-header-enhanced">
                        <button class="back-btn" id="backToGender">
                            <i class="fas fa-arrow-left"></i>
                            <span data-translate="back">Back</span>
                        </button>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body-enhanced">
                        <div class="caste-header">
                            <h2 data-translate="selectCaste">Select Caste</h2>
                            <p data-translate="selectCasteDesc">Please select your caste/community</p>
                        </div>
                        
                        <div class="caste-grid">
                            <button class="caste-btn" data-caste="maratha">
                                <span data-translate="maratha">Maratha</span>
                            </button>
                            <button class="caste-btn" data-caste="koli">
                                <span data-translate="koli">Koli</span>
                            </button>
                            <button class="caste-btn" data-caste="teli">
                                <span data-translate="teli">Teli</span>
                            </button>
                            <button class="caste-btn" data-caste="wani">
                                <span data-translate="wani">Wani</span>
                            </button>
                            <button class="caste-btn" data-caste="vanjari">
                                <span data-translate="vanjari">Vanjari</span>
                            </button>
                            <button class="caste-btn" data-caste="mali">
                                <span data-translate="mali">Mali</span>
                            </button>
                            <button class="caste-btn" data-caste="sonar">
                                <span data-translate="sonar">Sonar</span>
                            </button>
                            <button class="caste-btn" data-caste="shimpi">
                                <span data-translate="shimpi">Shimpi</span>
                            </button>
                            <button class="caste-btn" data-caste="jain">
                                <span data-translate="jain">Jain</span>
                            </button>
                            <button class="caste-btn" data-caste="pardeshi">
                                <span data-translate="pardeshi">Pardeshi</span>
                            </button>
                            <button class="caste-btn" data-caste="kumbhar">
                                <span data-translate="kumbhar">Kumbhar</span>
                            </button>
                            <button class="caste-btn" data-caste="rajput">
                                <span data-translate="rajput">Rajput</span>
                            </button>
                            <button class="caste-btn" data-caste="leva_patil">
                                <span data-translate="levaPatil">Leva Patil</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Add event listeners for caste selection
    const casteBtns = document.querySelectorAll(".caste-btn");
    casteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.selectCaste(e.target.closest(".caste-btn").dataset.caste);
      });
    });

    // Close modal and back button functionality
    const casteModal = document.getElementById("casteModal");
    const closeBtn = document.querySelector("#casteModal .close");
    closeBtn.addEventListener("click", () => this.hideCasteSelection());

    const backBtn = document.getElementById("backToGender");
    backBtn.addEventListener("click", () => {
      this.hideCasteSelection();
      this.showGenderSelection();
    });

    // Close modal when clicking outside
    casteModal.addEventListener("click", (e) => {
      if (e.target === casteModal) {
        this.hideCasteSelection();
      }
    });
  }

  // WhatsApp Modal
  createWhatsAppModal() {
    const modalHTML = `
    <div id="whatsappModal" class="modal">
      <div class="modal-content" style="padding: 1rem 1rem; text-align: center; position: relative;">
        <span class="close" style="font-size: 2rem; position: middle; top: 0.5rem; right: 1rem; cursor: pointer; z-index: 10;" aria-label="Close WhatsApp share modal">&times;</span>
        <h2 data-translate="shareBiodataWhatsappTitle" style="margin: 2rem 0 2rem 0; font-weight: 600; font-size: 1.5rem;"></h2>
        <img id="whatsappLogoBtn" src="assets/images/whatsapplogo.png" alt="WhatsApp" style="width: 90px; height: 90px; display: block; margin: 2rem auto 0 auto; cursor: pointer; transition: transform 0.2s;">
      </div>
    </div>
  `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // WhatsApp logo click handler - opens WhatsApp with business number
    const whatsappLogo = document.getElementById("whatsappLogoBtn");
    whatsappLogo.addEventListener("click", () => {
      this.openWhatsAppChat();
    });

    // Add hover effect
    whatsappLogo.addEventListener("mouseenter", () => {
      whatsappLogo.style.transform = "scale(1.1)";
    });
    whatsappLogo.addEventListener("mouseleave", () => {
      whatsappLogo.style.transform = "scale(1)";
    });

    // Close modal functionality
    const whatsappModal = document.getElementById("whatsappModal");
    const closeBtn = whatsappModal.querySelector(".close");
    closeBtn.addEventListener("click", () => this.hideWhatsAppModal());
    whatsappModal.addEventListener("click", (e) => {
      if (e.target === whatsappModal) {
        this.hideWhatsAppModal();
      }
    });
  }

  // Gender Selection Methods
  showGenderSelection() {
    const modal = document.getElementById("genderModal");
    modal.classList.add("show");
    // Update translations when modal opens
    this.languageManager.updatePageTranslations();
  }

  hideGenderSelection() {
    const modal = document.getElementById("genderModal");
    modal.classList.remove("show");
    // Don't reset selectedGender - we want to keep the user's choice
  }

  selectGender(genderChoice) {
    console.log("🎯 selectGender called with:", genderChoice);
    console.log("Type of genderChoice:", typeof genderChoice);
    console.log(
      "Before assignment - this.selectedGender:",
      this.selectedGender
    );

    // Direct assignment since data attributes are already "male"/"female"
    this.selectedGender = genderChoice;

    console.log(
      "✅ After assignment - this.selectedGender:",
      this.selectedGender
    );
    console.log("Gender mapping successful");

    // Verify assignment worked
    if (!this.selectedGender) {
      console.error("❌ Gender assignment failed!");
      return;
    }

    // Hide gender modal and show caste selection
    console.log("🚪 Hiding gender modal...");
    this.hideGenderSelection();

    console.log("🎭 Showing caste selection...");
    this.showCasteSelection();
  }

  // Caste Selection Methods
  showCasteSelection() {
    const modal = document.getElementById("casteModal");
    modal.classList.add("show");
    // Update translations when modal opens
    this.languageManager.updatePageTranslations();
  }

  hideCasteSelection() {
    const modal = document.getElementById("casteModal");
    modal.classList.remove("show");
    // Don't reset selectedCaste - we want to keep the user's choice
  }

  selectCaste(caste) {
    console.log("🎯 selectCaste called with:", caste);
    console.log("Type of caste:", typeof caste);
    console.log("Before assignment - this.selectedCaste:", this.selectedCaste);

    this.selectedCaste = caste;

    console.log(
      "✅ After assignment - this.selectedCaste:",
      this.selectedCaste
    );
    console.log("📊 Complete state:", {
      selectedGender: this.selectedGender,
      selectedCaste: this.selectedCaste,
      genderType: typeof this.selectedGender,
      casteType: typeof this.selectedCaste,
    });

    // Hide caste modal and redirect to Google Form
    console.log("🚪 Hiding caste modal...");
    this.hideCasteSelection();

    // Immediate redirection - no timeout needed
    console.log("🚀 Calling redirectToGoogleForm immediately...");
    this.redirectToGoogleForm();
  }

  // Google Form Redirection
  redirectToGoogleForm() {
    console.log("🎯 redirectToGoogleForm called");
    console.log("📊 Current state:", {
      selectedGender: this.selectedGender,
      selectedCaste: this.selectedCaste,
      genderType: typeof this.selectedGender,
      casteType: typeof this.selectedCaste,
    });

    // More detailed validation
    const genderValid =
      this.selectedGender &&
      (this.selectedGender === "male" || this.selectedGender === "female");
    const casteValid =
      this.selectedCaste &&
      typeof this.selectedCaste === "string" &&
      this.selectedCaste.length > 0;

    console.log("🔍 Validation results:", {
      genderValid,
      casteValid,
      selectedGender: this.selectedGender,
      selectedCaste: this.selectedCaste,
    });

    if (!genderValid || !casteValid) {
      console.error("❌ Validation failed - Debug info:", {
        selectedGender: this.selectedGender,
        selectedCaste: this.selectedCaste,
        genderValid,
        casteValid,
        genderType: typeof this.selectedGender,
        casteType: typeof this.selectedCaste,
        genderNull: this.selectedGender === null,
        casteNull: this.selectedCaste === null,
        genderUndefined: this.selectedGender === undefined,
        casteUndefined: this.selectedCaste === undefined,
      });

      this.showError(
        `Validation failed. Gender: ${this.selectedGender} (${
          genderValid ? "valid" : "invalid"
        }), Caste: ${this.selectedCaste} (${casteValid ? "valid" : "invalid"})`
      );
      return;
    }

    // Create form key for URL lookup
    const formKey = `${this.selectedCaste}_${this.selectedGender}`;
    const formUrl = this.googleFormUrls[formKey];

    if (!formUrl) {
      this.showError("Form not found for selected combination");
      console.error("Form URL not found for:", formKey);
      return;
    }

    // Check if URL is still placeholder
    if (formUrl.includes("YOUR_") && formUrl.includes("_FORM_ID")) {
      this.showError(
        "Google Form URLs need to be configured. Please update the form URLs in biodata.js"
      );
      console.error(
        "Placeholder URL detected. Please replace with actual Google Form URLs."
      );
      return;
    }

    // Show loading message
    this.showLoading();

    // Log the redirection for debugging
    console.log(
      `Redirecting to: ${this.selectedCaste} ${this.selectedGender} form`
    );
    console.log("Form URL:", formUrl);

    // Redirect to Google Form in new tab
    window.location.href = formUrl;

    // Hide loading after short delay
    setTimeout(() => {
      this.hideLoading();
      this.resetSelections();
    }, 1000);
  }

  // WhatsApp Methods
  showWhatsAppModal() {
    const modal = document.getElementById("whatsappModal");
    modal.classList.add("show");
    // Update translations when modal opens
    this.languageManager.updatePageTranslations();
  }

  hideWhatsAppModal() {
    const modal = document.getElementById("whatsappModal");
    modal.classList.remove("show");
  }

  // WhatsApp Chat Method
  openWhatsAppChat() {
    // Your WhatsApp business number
    const businessNumber = "919270969478"; // Format: country code + number (no spaces, no +)

    // Pre-filled message for users (optional - you can customize or remove)
    const message =
      "Hello, I would like to send my biodata for matrimony registration.";

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Close the modal after opening WhatsApp
    this.hideWhatsAppModal();
  }

  sendWhatsAppMessage() {
    const phone = document.getElementById("whatsappPhone").value;
    const message = document.getElementById("whatsappMessage").value;

    if (!phone || phone.length !== 10) {
      this.showError("Please enter a valid 10-digit phone number");
      return;
    }

    // Format WhatsApp URL
    const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Close modal
    this.hideWhatsAppModal();

    // Clear form
    document.getElementById("whatsappPhone").value = "";
    document.getElementById("whatsappMessage").value = "";
  }

  // Utility Methods
  resetSelections() {
    this.selectedGender = null;
    this.selectedCaste = null;
  }

  showLoading() {
    // Create or show loading overlay
    let loading = document.getElementById("loadingOverlay");
    if (!loading) {
      loading = document.createElement("div");
      loading.id = "loadingOverlay";
      loading.className = "loading-overlay";
      loading.innerHTML = `
                <div class="loading-content">
                    <div class="spinner"></div>
                    <p data-translate="redirecting">Redirecting to form...</p>
                </div>
            `;
      document.body.appendChild(loading);
    }
    loading.classList.add("show");
    this.languageManager.updatePageTranslations();
  }

  hideLoading() {
    const loading = document.getElementById("loadingOverlay");
    if (loading) {
      loading.classList.remove("show");
    }
  }

  showError(message) {
    // Simple alert for now - can be enhanced with custom modal
    alert(message);
  }

  // Method to update form URLs (for easy configuration)
  updateFormUrls(newUrls) {
    this.googleFormUrls = { ...this.googleFormUrls, ...newUrls };
  }

  // Method to get current selections (for debugging)
  getCurrentSelections() {
    return {
      gender: this.selectedGender,
      caste: this.selectedCaste,
      formKey:
        this.selectedGender && this.selectedCaste
          ? `${this.selectedCaste}_${this.selectedGender}`
          : null,
    };
  }

  // Method to reset all selections
  resetSelections() {
    this.selectedGender = null;
    this.selectedCaste = null;
    console.log("✅ Selections have been reset");
  }
}

// Global helper functions
window.resetSelections = () => {
  if (window.biodataManager) {
    window.biodataManager.resetSelections();
    console.log("✅ Selections reset");
  } else {
    console.log("biodataManager not ready yet");
  }
};
