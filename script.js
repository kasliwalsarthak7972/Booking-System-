function showSection(sectionId) {
  document.querySelectorAll(".container").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

function goHome() {
  showSection("home");
}

let selectedItem = "";
let price = 0;

// ===== MOVIE BOOKING =====
function selectMovie(movie, cost) {
  selectedItem = movie;
  price = cost;

  let seatHTML = "<h3>🎟 Select Seats for " + movie + "</h3>";
  for (let i = 1; i <= 20; i++) {
    seatHTML += `<div class="seat" onclick="toggleSeat(this)"></div>`;
    if (i % 5 === 0) seatHTML += "<br>";
  }

  document.getElementById("seatSelection").innerHTML = seatHTML;
  document.getElementById("seatSelection").classList.remove("hidden");
  document.getElementById("payBtnMovie").classList.remove("hidden");
}

function toggleSeat(seat) {
  if (!seat.classList.contains("booked")) {
    seat.classList.toggle("selected");
  }
}

function goToPayment() {
  showSection("paymentSection");
  let seats = document.querySelectorAll(".seat.selected").length;
  let total = seats * price;
  if (total === 0) total = price; // If no seat selected, at least 1 ticket
  document.getElementById("paymentDetails").innerText =
    `Booking: ${selectedItem} | Amount: ₹${total}`;
  sessionStorage.setItem("successMsg", `You booked ${selectedItem} for ₹${total}`);
}

// ===== HOTEL BOOKING =====
function bookHotel() {
  let checkin = document.getElementById("checkin").value;
  let checkout = document.getElementById("checkout").value;
  let roomType = document.getElementById("roomType").value;

  if (checkout <= checkin) {
    alert("Check-out date must be after check-in!");
    return false;
  }

  selectedItem = `${roomType} Room`;
  price = (roomType === "AC") ? 1500 : 1000;

  showSection("paymentSection");
  document.getElementById("paymentDetails").innerText =
    `Booking: ${selectedItem} | Amount: ₹${price}`;
  sessionStorage.setItem("successMsg", `You booked a ${selectedItem} for ₹${price}`);
  return false;
}

// ===== RESTAURANT BOOKING =====
function selectDish(dish, cost) {
  selectedItem = dish;
  price = cost;

  showSection("paymentSection");
  document.getElementById("paymentDetails").innerText =
    `Order: ${dish} | Amount: ₹${cost}`;
  sessionStorage.setItem("successMsg", `You ordered ${dish} for ₹${cost}`);
}

// ===== PAYMENT =====
function completePayment() {
  showSection("paymentSuccess");
  document.getElementById("successMsg").innerText = sessionStorage.getItem("successMsg");
}
