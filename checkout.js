window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';

  document.querySelector('.checkout-container').classList.add('animate-fade-in');
});

function confirmPayment() {
  const message = encodeURIComponent(
    "Hello, I just made a payment to your account I would send the receipt now."
  );
  const whatsappNumber = "2347087336085";
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`);
}