function handleSubmit() {

  const name = document.getElementById('name').value.trim();
  const addr = document.getElementById('address').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const animal = document.querySelector(
    'input[name="animal"]:checked'
  );

  // Check empty fields
  if (!name || !addr || !email || !phone) {
    shake();
    return;
  }

  // Check animal selection
  if (!animal) {

    const cards = document.querySelector('.animal-cards');

    cards.style.animation = 'none';

    setTimeout(() => {
      cards.style.animation = 'shake 0.4s ease';
    }, 10);

    return;
  }

  // Show success toast
  showToast();

  // Redirect after short delay
  setTimeout(() => {

    if (animal.value === "cat") {
      window.location.href = "cat.html";
    }

    else if (animal.value === "dog") {
      window.location.href = "dog.html";
    }

  }, 1500);
}

function shake() {

  const card = document.querySelector('.form-card');

  card.style.animation = 'none';

  void card.offsetWidth;

  card.style.animation = 'shake 0.4s ease';
}

function showToast() {

  const toast = document.getElementById('toast');

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* Inject shake animation */

const style = document.createElement('style');

style.textContent = `
@keyframes shake {

  0%, 100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-8px);
  }

  40% {
    transform: translateX(8px);
  }

  60% {
    transform: translateX(-5px);
  }

  80% {
    transform: translateX(5px);
  }
}
`;

document.head.appendChild(style);