const mockApiData = [
  { id: 1, name: "Coloring Book", price: 1500, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Crayons Pack", price: 1000, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "School Backpack", price: 3500, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Math Textbook", price: 2500, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Poster Color", price: 1000, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Sweat Shirt", price: 1000, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Tote Bag", price: 1000, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Lunch Pack", price: 1000, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 9, name: "Pens", price: 1000, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" }
];

const productsDiv = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];

// Display products
function loadProducts() {
  productsDiv.innerHTML = ""; // clear previous
  mockApiData.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₦${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productsDiv.appendChild(card);
  });
}

// Add to cart
function addToCart(productId) {
  const product = mockApiData.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Update cart display
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x ${item.quantity} - ₦${item.price * item.quantity}
      <button onclick="removeFromCart(${item.id})" class="remove-btn">❌</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total;
}

// Load products initially
loadProducts();

