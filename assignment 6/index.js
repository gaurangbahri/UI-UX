// ---------------------- PACKAGE DATA ----------------------
const packages = [
  { id: 1, destination: "Goa", durationDays: 4, basePrice: 12000, season: "summer" },
  { id: 2, destination: "Manali", durationDays: 5, basePrice: 15000, season: "winter" },
  { id: 3, destination: "Jaipur", durationDays: 3, basePrice: 10000, season: "spring" },
  { id: 4, destination: "Kerala", durationDays: 6, basePrice: 18000, season: "monsoon" }
];

// Function to calculate final price
function calculateFinalPrice(pkg) {
  let multiplier;
  switch (pkg.season) {
    case "summer": multiplier = 1.1; break;
    case "winter": multiplier = 1.2; break;
    case "monsoon": multiplier = 0.9; break;
    default: multiplier = 1.0;
  }

  // weekend surcharge if duration > 4 days
  let surcharge = pkg.durationDays > 4 ? 1000 : 0;

  return pkg.basePrice * multiplier + surcharge;
}

// Render packages table
const tbody = document.querySelector("#packagesTable tbody");
packages.forEach(pkg => {
  const finalPrice = calculateFinalPrice(pkg);
  const row = `
    <tr>
      <td>${pkg.id}</td>
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays}</td>
      <td>${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td>${finalPrice.toFixed(0)}</td>
    </tr>`;
  tbody.innerHTML += row;
});

// Populate package dropdown
const packageSelect = document.getElementById("packageSelect");
packages.forEach(pkg => {
  const option = document.createElement("option");
  option.value = pkg.id;
  option.textContent = `${pkg.destination} (${pkg.durationDays} days)`;
  packageSelect.appendChild(option);
});

// ---------------------- BOOKING FORM ----------------------
const form = document.getElementById("bookingForm");
const totalPriceEl = document.getElementById("totalPrice");
const submitBtn = form.querySelector("button");

function validateForm() {
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const guests = document.getElementById("guests").value;
  const pkg = packageSelect.value;

  if (checkIn && checkOut && guests && pkg) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

form.addEventListener("input", () => {
  validateForm();
  updatePrice();
});

function updatePrice() {
  const pkgId = parseInt(packageSelect.value);
  const checkIn = new Date(document.getElementById("checkIn").value);
  const checkOut = new Date(document.getElementById("checkOut").value);
  const guests = parseInt(document.getElementById("guests").value);
  const promo = document.getElementById("promo").value.trim().toUpperCase();

  if (!pkgId || isNaN(checkIn) || isNaN(checkOut) || checkOut <= checkIn) {
    totalPriceEl.textContent = "Estimated Total: ₹0";
    return;
  }

  const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
  let pkg = packages.find(p => p.id === pkgId);
  let base = calculateFinalPrice(pkg);

  let total = base * nights;

  // Guest multiplier
  if (guests > 2) total *= 1.2;

  // Promo code logic
  switch (promo) {
    case "EARLYBIRD": total *= 0.9; break;
    case "FESTIVE": total *= 0.85; break;
    case "WELCOME": total *= 0.95; break;
  }

  totalPriceEl.textContent = `Estimated Total: ₹${total.toFixed(0)}`;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  alert("Booking submitted successfully!");
  form.reset();
  totalPriceEl.textContent = "Estimated Total: ₹0";
  submitBtn.disabled = true;
});

// ---------------------- GALLERY MODAL ----------------------
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery-grid img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.dataset.large;
    modalImg.alt = img.alt;
    modalImg.title = img.title;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// ---------------------- ACTIVE NAV ----------------------
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    navLinks.forEach(l => l.classList.remove("active"));
    e.target.classList.add("active");
  });
});
</script> 