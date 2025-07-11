let loadingPantry = false; // prevent double-saving during load

function toggleCartForm() {
  const form = document.getElementById("cart-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function togglePantryForm() {
  const form = document.getElementById("pantry-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function updatePantryEmptyMessage() {
  const pantryList = document.getElementById("pantry-items");
  const message = document.getElementById("pantry-empty-message");
  const hasItems = pantryList.querySelectorAll(".item").length > 0;
  message.style.display = hasItems ? "none" : "block";
}

function addToCart(name = null, quantity = 1) {
  const cartList = document.getElementById("cart-items");

  if (!name) {
    name = document.getElementById("cart-item-name").value.trim();
    quantity = document.getElementById("cart-item-quantity").value;
  }

  if (!name) return alert("Please enter a valid item name.");

  const empty = cartList.querySelector(".empty-message");
  if (empty) empty.remove();

  const item = document.createElement("div");
  item.className = "item";
  item.innerHTML = `
    <div class="item-info">
      <span class="icon">🛒</span>
      <div><div class="item-name">${name}</div></div>
    </div>
    <div class="item-actions">
      <span class="quantity">x${quantity}</span>
      <button class="btn-icon" onclick="this.closest('.item').remove()">🗑️</button>
    </div>
  `;
  cartList.appendChild(item);

  if (!arguments.length) {
    document.getElementById("cart-item-name").value = "";
    document.getElementById("cart-item-quantity").value = 1;
    toggleCartForm();
  }
}

function addToPantry(name = null, quantity = 1, category = "Uncategorized") {
  const pantryList = document.getElementById("pantry-items");

  if (!name) {
    name = document.getElementById("pantry-item-name").value.trim();
    quantity = document.getElementById("pantry-item-quantity").value;
    category = document.getElementById("pantry-item-category").value || "Uncategorized";
  }

  if (!name) return alert("Please enter a valid item name.");

  const item = document.createElement("div");
  item.className = "item";
  item.innerHTML = `
    <div class="item-info">
      <span class="icon">📦</span>
      <div>
        <div class="item-name">${name}</div>
        <div class="item-category">${category}</div>
      </div>
    </div>
    <div class="item-actions">
      <span class="quantity">x${quantity}</span>
      <button class="btn-icon" onclick="this.closest('.item').remove(); updatePantryEmptyMessage(); savePantry()">🗑️</button>
    </div>
  `;
  pantryList.appendChild(item);

  if (!arguments.length) {
    document.getElementById("pantry-item-name").value = "";
    document.getElementById("pantry-item-quantity").value = 1;
    document.getElementById("pantry-item-category").value = "";
    document.getElementById("pantry-item-expiry").value = "";
    togglePantryForm();
  }

  updatePantryEmptyMessage();
  if (!loadingPantry) savePantry(); // only save if not loading
}

function quickAdd() {
  const input = document.getElementById("quick-add-input");
  const name = input.value.trim();
  if (!name) return alert("Enter an item name.");
  addToPantry(name);
  input.value = "";

  const success = document.getElementById("quick-add-success");
  success.style.display = "block";
  setTimeout(() => {
    success.style.display = "none";
  }, 2000);
}

function removeFromPantry(name) {
  const pantryList = document.getElementById("pantry-items");
  const items = pantryList.querySelectorAll(".item");
  items.forEach(item => {
    const itemName = item.querySelector(".item-name")?.textContent.toLowerCase();
    if (itemName === name.toLowerCase()) {
      item.remove();
    }
  });
  updatePantryEmptyMessage();
  savePantry();
}

function populateQuickAdd() {
  const container = document.querySelector(".quick-add-content");
  const commonItems = [
    { name: "Milk", category: "Dairy" },
    { name: "Eggs", category: "Dairy" },
    { name: "Bread", category: "Grains" },
    { name: "Apples", category: "Produce" },
    { name: "Chicken", category: "Meat" },
    { name: "Cereal", category: "Grains" },
    { name: "Chips", category: "Snacks" },
    { name: "Beans", category: "Canned Goods" },
  ];

  const list = document.createElement("div");
  list.style.marginTop = "1rem";
  list.style.display = "grid";
  list.style.gap = "0.5rem";

  commonItems.forEach(item => {
    const entry = document.createElement("div");
    entry.style.display = "flex";
    entry.style.justifyContent = "space-between";
    entry.innerHTML = `
      <span>${item.name}</span>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-secondary" onclick="addToCart('${item.name}')">Cart</button>
        <button class="btn btn-primary" onclick="addToPantry('${item.name}', 1, '${item.category}')">Pantry</button>
      </div>
    `;
    list.appendChild(entry);
  });

  container.appendChild(list);
}

function savePantry() {
  const pantryItems = [];
  document.querySelectorAll("#pantry-items .item").forEach(item => {
    const name = item.querySelector(".item-name")?.textContent;
    const category = item.querySelector(".item-category")?.textContent || "Uncategorized";
    const quantity = item.querySelector(".quantity")?.textContent.replace("x", "") || "1";
    pantryItems.push({ name, category, quantity });
  });
  localStorage.setItem("pantry", JSON.stringify(pantryItems));
}

function loadPantry() {
  const pantryItems = JSON.parse(localStorage.getItem("pantry") || "[]");
  loadingPantry = true;
  pantryItems.forEach(item => {
    addToPantry(item.name, item.quantity, item.category);
  });
  loadingPantry = false;
}

window.addEventListener("DOMContentLoaded", () => {
  loadPantry(); // restore pantry from memory
  populateQuickAdd();
  updatePantryEmptyMessage();
});
