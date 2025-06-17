
const sampleProducts = [
  { id: 1, name: 'Pencil Pack', price: 500, image: 'https://via.placeholder.com/150?text=Pencil' },
  { id: 2, name: 'Notebook', price: 1200, image: 'https://via.placeholder.com/150?text=Notebook' },
  { id: 3, name: 'School Bag', price: 4500, image: 'https://via.placeholder.com/150?text=School+Bag' },
];


function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}


function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  alert('${product.name} added to cart');
}


function renderProducts() {
  if (!document.getElementById('products')) return;
  const container = document.getElementById('products');
  sampleProducts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₦${p.price}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    `;
    container.appendChild(div);
  });
}


function renderCart() {
  if (!document.getElementById('cartList')) return;
  const cart = getCart();
  const list = document.getElementById('cartList');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  list.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ₦${item.price} x ${item.qty}
      <button onclick="updateQty(${item.id}, 1)">+</button>
      <button onclick="updateQty(${item.id}, -1)">-</button>
    `;
    list.appendChild(li);
  });
  document.getElementById('totalPrice').textContent =' totalPrice: ₦${total}';
}


function updateQty(id, change) {
  const cart = getCart().map(item => {
    if (item.id === id) {
      item.qty += change;
    }
    return item;
  }).filter(item => item.qty > 0);
  saveCart(cart);
  renderCart();
}

const phone = '2347087336085'; 
function setupCheckout() {
  const btn = document.getElementById('checkoutBtn');
  if (!btn) return;
  btn.onclick = () => {
    const cart = getCart();
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    const lines = cart.map('i => ${i.name} x ${i.qty} = ₦${i.price * i.qty}');
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const message = encodeURIComponent`(Hello! I want to buy:\n${lines.join('\n')}\nTotal: ₦${total})`;
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };
}


document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  setupCheckout();
});