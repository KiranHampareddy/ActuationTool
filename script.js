// Utility Functions
const replaceSpaces = (input) => {
  return input.replace(/\s+/g, '_');
};

// Initialize Flatpickr for the date fields
document.addEventListener("DOMContentLoaded", function() {
  flatpickr("#flightStartDate", {
    dateFormat: "m-d-Y", // Date format for the start date
    enableTime: false, // Disable time selection
  });

  flatpickr("#flightEndDate", {
    dateFormat: "m-d-y", // Date format for the end date
    enableTime: false, // Disable time selection
  });
});

const highlightSpecialChars = (text) => {
  return text.replace(/[^a-zA-Z0-9_]/g, match => `<span class="red-text">${match}</span>`);
};

const updateWalletId = () => {
  const walletName = document.getElementById('walletName').value;
  let walletId = walletName.replace(/\D/g, '').slice(0, 7).padStart(7, '0');
  document.getElementById('walletId').value = walletId;
};

const validateUrls = () => {
  const appUrl = document.getElementById("appUrl").value;
  const webUrl = document.getElementById("webUrl").value;

  const appUrlPattern = /^fdshop:\/\/coupon\/\d+$/;
  const webUrlPattern = /^https:\/\/www\.familydollar\.com\/coupon-details\/\d+$/;

  document.getElementById("appUrlError").textContent = !appUrlPattern.test(appUrl) ? "Invalid App URL format. Correct format: fdshop://coupon/{id}." : '';
  document.getElementById("webUrlError").textContent = !webUrlPattern.test(webUrl) ? "Invalid Web URL format. Correct format: https://www.familydollar.com/coupon-details/{id}." : '';
};

const calculateDays = () => {
  const start = new Date(document.getElementById("flightStartDate").value);
  const end = new Date(document.getElementById("flightEndDate").value);
  const difference = start && end ? Math.floor((end - start) / (1000 * 60 * 60 * 24) + 1) : 0;
  document.getElementById("numberOfDays").value = difference;
};

const showInputs = () => {
  const sections = ['spa', 'bax', 'lockouts'];
  sections.forEach(section => document.getElementById(section).style.display = 'none');

  const tactic = document.getElementById("tactic").value;
  if (tactic) {
    document.getElementById(tactic.toLowerCase()).style.display = 'block';
  }
};

const generateOutput = () => {
  const tactic = document.getElementById("tactic").value;
  if (!tactic) {
    alert("Please select a tactic first.");
    return;
  }

  let outputText = "";

  // SPA
  if (tactic === "SPA") {
    const dealName = document.getElementById("spa_deal_name").value;
    const dealId = document.getElementById("spa_deal_id").value;
    const additional = document.getElementById("spa_additional").value;
    if (!dealName || !dealId) {
      alert("Please fill in all required fields for SPA.");
      return;
    }
    outputText = `SPA Placements Ticket:
                  <br>Deal Name: ${replaceSpaces(dealName)}
                  <br>Deal ID: ${dealId}
                  <br>Additional Info: ${additional}`;
  }
  // BAx
  else if (tactic === "BAx") {
    const dealName = document.getElementById("dealName").value;
    const dealId = document.getElementById("dealId").value;
    const team = document.getElementById("team").value;
    const walletName = document.getElementById("walletName").value;
    const walletId = document.getElementById("walletId").value;
    const budget = parseFloat(document.getElementById("budget").value);
    const appUrl = document.getElementById("appUrl").value;
    const webUrl = document.getElementById("webUrl").value;
    const flightStartDate = document.getElementById("flightStartDate").value;
    const flightEndDate = document.getElementById("flightEndDate").value;
    const numberOfDays = parseInt(document.getElementById("numberOfDays").value);

    if (!dealName || !dealId || !team || !walletName || !budget || !appUrl || !webUrl || !flightStartDate || !flightEndDate) {
      alert("Please fill in all required fields for BAx.");
      return;
    }
    let bufferMultiplier = 1.20; // For BAx
    let pointBuffer = '20%'; // Point buffer for BAx

    const walletCap = Math.round((budget / numberOfDays) * bufferMultiplier);
    const rosBuffer = Math.round(walletCap * 0.20); // 20% buffer

    outputText = `<p>Hi @</p>
                  <p>Note:</p>
                  <p>1. </p>
                  <p>2. </p>
                  <p>The campaigns have been trafficked and QAed. Below are the details:</p>
                  <br>
                  <p><strong>BAx: </strong></p>
                  <p>Deal Name: ${highlightSpecialChars(replaceSpaces(dealName))}</p>
                  <p>Deal ID: ${dealId}</p>
                  <p>Team: ${team}</p>
                  <p>Wallet Name: ${highlightSpecialChars(replaceSpaces(walletName))} | Wallet ID: ${walletId}</p>
                  <p>Budget: $${budget.toFixed(2)}</p>
                  <p>APP URL: ${highlightSpecialChars(appUrl)}</p>
                  <p>Web URL: ${highlightSpecialChars(webUrl)}</p>
                  <p>Flight Dates: ${flightStartDate} to ${flightEndDate}</p>
                  <p>Number of Days: ${numberOfDays}</p>
                  <p>Wallet Cap: $${walletCap.toFixed(2)}</p>
                  <p>Buffer Used: ${pointBuffer}</p>
                  <br> <!-- Added line gap after Buffer Used -->

                  <p><strong>App Placements:</strong></p>
<br> <!-- Added line gap after App Placements -->

<p><strong>Product Details Page: (Product Page) (Slot: medium-banner) (CPM: $0.012)</strong></p>
<p>PDP_Med_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Run of Site: (Run of Site) (Slot: medium-banner) (CPM: $0.012)</strong></p>
<p>ROS_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Coupon Details Page: (Coupon) (Slot: medium-banner) (CPM: $0.016)</strong></p>
<p>CP_Med_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Search Results Page: (Search) (Slot: thin-banner) (CPM: $0.012)</strong></p>
<p>Search_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Sub-Category: (Category) (Slot: thin-banner) (CPM: $0.012)</strong></p>
<p>SubCAT_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Coupon Listing Page: (Coupon) (Slot: thin-banner) (CPM: $0.016)</strong></p>
<p>CP_Thin_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Product Details Page - Top: (Product Page) (Slot: pdp-pencil-banner) (CPM: $0.012)</strong></p>
<p>PDP_Pencil_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Coupon Details Page - Top: (Coupon) (Slot: pdp-pencil-banner) (CPM: $0.016)</strong></p>
<p>CP_Pencil_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Homepage - Midpage: (Homepage - App) (Slot: midpage-banner) (CPM: $0.018)</strong></p>
<p>HPApp_Mid_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Coupon Category Navigation: (Category) (Slot: coupon-navigation-banner) (CPM: $0.016)</strong></p>
<p>CP_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Category - Hero: (Category) (Slot: category-hero-banner) (CPM: $0.012)</strong></p>
<p>CAT_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<br> <!-- Line break for separation -->

<p><strong>Web Placements:</strong></p>

<br> <!-- Line break for separation -->

<p><strong>Homepage – Large 2-Across: (Homepage - Web) (Slot: 2-across-banner) (CPM: $0.018)</strong></p>
<p>HPWeb_2Across_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<p><strong>Homepage – Pencil Banner: (Homepage - Web) (Slot: pencil-banner) (CPM: $0.018)</strong></p>
<p>HPWeb_Pencil_${highlightSpecialChars(replaceSpaces(dealName))}_${dealId}</p>

<br>
<p> Thank you..!</P>`;
  }
  // Lockouts
  else if (tactic === "Lockouts") {
    const dealName = document.getElementById("lockouts_deal_name").value;
    const dealId = document.getElementById("lockouts_deal_id").value;
    const reason = document.getElementById("lockouts_reason").value;

    if (!dealName || !dealId || !reason) {
      alert("Please fill in all required fields for Lockouts.");
      return;
    }

    outputText = `Lockouts Ticket:
                  <br>Deal Name: ${dealName}
                  <br>Deal ID: ${dealId}
                  <br>Reason: ${reason}`;
  }

  // Output the generated text
  document.getElementById("output_text").innerHTML = outputText;

  // Show output box with animation
  const outputBox = document.getElementById("output");
  outputBox.classList.add('active');
};