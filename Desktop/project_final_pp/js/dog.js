document.addEventListener("DOMContentLoaded", () => {

  // -------------------------
  // NAV ACTIVE
  // -------------------------
  const navLinks = document.querySelectorAll(".page-nav a");

  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // -------------------------
  // ELEMENTS
  // -------------------------
  const dogName = document.getElementById("dog-name");
  const dogAge = document.getElementById("dog-age");
  const checkin = document.getElementById("check-in");
  const checkout = document.getElementById("check-out");
  const stayDays = document.getElementById("stay-days");
  const summaryBox = document.getElementById("summary-box");
  const sDog = document.getElementById("s-dog");
  const sizeSection = document.getElementById("size-section");

  // -------------------------
  // BREED LOGIC
  // -------------------------
  document.querySelectorAll('input[name="breed-class"]').forEach(r => {
    r.addEventListener("change", () => {
      sizeSection.classList.add("visible");
      updateSummary();
    });
  });

  // -------------------------
  // DATE + DURATION VALIDATION
  // -------------------------
  function calculateDays() {
    if (!checkin.value || !checkout.value) {
      stayDays.value = "";
      return;
    }

    const diff = (new Date(checkout.value) - new Date(checkin.value)) / 86400000;

    if (diff <= 0) {
      checkout.value = "";
      stayDays.value = "";
      showToast("⚠️ Check-out must be after check-in");
      return;
    }

    if (diff > 10) {
      checkout.value = "";
      stayDays.value = "";
      showToast("⚠️ Max stay is 10 days for the selected pet");
      return;
    }

    stayDays.value = diff;
  }

  checkin.addEventListener("change", calculateDays);
  checkout.addEventListener("change", calculateDays);

  // -------------------------
  // AGE VALIDATION
  // -------------------------
  dogAge.addEventListener("input", () => {
    let age = parseInt(dogAge.value);

    if (age > 25) {
      dogAge.value = 25;
      showToast("⚠️ Dogs average lifespan is 25 years");
    }

    if (age < 0) {
      dogAge.value = 0;
      showToast("⚠️ Age cannot be negative");
    }
  });

  // -------------------------
  // SUMMARY
  // -------------------------
  dogName.addEventListener("input", updateSummary);

  function updateSummary() {
    if (dogName.value.trim()) {
      summaryBox.classList.add("visible");
      sDog.textContent = dogName.value;
    } else {
      summaryBox.classList.remove("visible");
    }
  }

  // -------------------------
  // SUBMIT
  // -------------------------
  document.getElementById("submit-btn").addEventListener("click", () => {

    if (!dogName.value || !checkin.value || !checkout.value) {
      showToast("⚠️ Please fill all required fields");
      return;
    }

    showToast("✅ Reservation confirmed!");
  });

  // -------------------------
  // TOAST
  // -------------------------
  function showToast(msg) {
    const toast = document.getElementById("toast");

    toast.textContent = msg;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

});