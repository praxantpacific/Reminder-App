document.addEventListener("DOMContentLoaded", () => {

   // -------------------------
  // NAV ACTIVE (Cat/Dog tabs) FIXED
  // -------------------------
  const navLinks = document.querySelectorAll(".page-nav a");

  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {

    const linkPage = link.getAttribute("href");

    // highlight correct tab based on file name
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    // click effect (orange highlight)
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // -------------------------
  // KENNEL GRID GENERATION
  // -------------------------
  const kennels = [
    { id: 'C-01', label: '1', booked: false },
    { id: 'C-02', label: '2', booked: false },
    { id: 'C-03', label: '3', booked: false },
    { id: 'C-04', label: '4', booked: false },
  ];

  const grid = document.getElementById('kennel-grid');

  if (grid) {
    kennels.forEach(k => {

      const lbl = document.createElement('label');
      lbl.className = 'kennel-label';

      lbl.innerHTML = `
        <input type="radio" name="kennel" value="${k.id}" />
        <div class="kennel-tile">
          <span class="kennel-num">${k.label}</span>
          <span>${k.id}</span>
        </div>
      `;

      grid.appendChild(lbl);
    });
  }

  // -------------------------
  // DATE ELEMENTS
  // -------------------------
  const checkin = document.getElementById('check-in');
  const checkout = document.getElementById('check-out');
  const stayDays = document.getElementById('stay-days');

  if (checkin) checkin.addEventListener('change', calculateDuration);
  if (checkout) checkout.addEventListener('change', calculateDuration);

  function calculateDuration() {

    if (!checkin.value || !checkout.value) {
      if (stayDays) stayDays.value = '';
      return;
    }

    const diff =
      (new Date(checkout.value) - new Date(checkin.value)) / 86400000;

    if (diff <= 0) {
      if (stayDays) stayDays.value = '';
      showToast('⚠️ Check-out date must be after check-in date');
      checkout.value = '';
      return;
    }

    if (diff > 10) {
      if (stayDays) stayDays.value = '';
      showToast('⚠️ Only 10 days booking for your pets is valid');
      checkout.value = '';
      return;
    }

    if (stayDays) stayDays.value = diff;
  }

  // -------------------------
  // CAT AGE VALIDATION
  // -------------------------
  const catAge = document.getElementById('cat-age');

  if (catAge) {
    catAge.addEventListener('input', () => {
      const age = parseInt(catAge.value);

      if (age > 25) {
        catAge.value = 25;
        showToast('The average life span of cats is 25 years.');
      }
    });
  }

  // -------------------------
  // SUMMARY LOGIC
  // -------------------------
  const catNameInput = document.getElementById('cat-name');

  if (catNameInput) {
    catNameInput.addEventListener('input', updateSummary);
  }

  document.querySelectorAll('input[name="kennel"]')
    .forEach(radio => {
      radio.addEventListener('change', updateSummary);
    });

  function updateSummary() {

    const catName = document.getElementById('cat-name')?.value || "";

    const kennel = document.querySelector('input[name="kennel"]:checked');

    const summary = document.getElementById('summary-box');

    if (!summary) return;

    if (catName && kennel) {
      summary.classList.add('visible');

      const sCat = document.getElementById('s-cat');
      const sKennel = document.getElementById('s-kennel');

      if (sCat) sCat.textContent = catName;
      if (sKennel) sKennel.textContent = kennel.value;

    } else {
      summary.classList.remove('visible');
    }
  }

  // -------------------------
  // SUBMIT BUTTON
  // -------------------------
  const submitBtn = document.getElementById('submit-btn');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {

      const catName = document.getElementById('cat-name')?.value;
      const kennel = document.querySelector('input[name="kennel"]:checked');
      const age = parseInt(catAge?.value);

      if (!catName || !checkin.value || !checkout.value || !kennel) {
        showToast('⚠️ Please complete all required fields');
        return;
      }

      if (age > 25) {
        showToast('Error! The average life span of cats is 25 years.');
        return;
      }

      showToast('✅ Reservation confirmed!');
    });
  }

  // -------------------------
  // TOAST MESSAGE
  // -------------------------
  function showToast(message) {

    const toast = document.getElementById('toast');

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

});