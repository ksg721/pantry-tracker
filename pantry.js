// Toggle Cart Form
function toggleCartForm() {
    const form = document.getElementById('cart-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Add to Cart
function addToCart() {
    const name = document.getElementById('cart-item-name').value.trim();
    const quantity = document.getElementById('cart-item-quantity').value;
    const cartList = document.getElementById('cart-items');
    
    if (!name) return alert("Please enter a valid item name.");

    // Remove empty message
    const empty = cartList.querySelector('.empty-message');
    if (empty) empty.remove();

    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
        <div class="item-info">
            <span class="icon">🛒</span>
            <div>
                <div class="item-name">${name}</div>
            </div>
        </div>
        <div class="item-actions">
            <span class="quantity">x${quantity}</span>
            <button class="btn-icon" onclick="this.closest('.item').remove()">🗑️</button>
        </div>
    `;
    cartList.appendChild(item);

    // Reset form
    document.getElementById('cart-item-name').value = '';
    document.getElementById('cart-item-quantity').value = 1;
    toggleCartForm();
}

// Quick Add to Pantry
function quickAdd() {
    const input = document.getElementById('quick-add-input');
    const name = input.value.trim();
    if (!name) return alert("Enter an item name.");

    const pantryList = document.getElementById('pantry-items');
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
        <div class="item-info">
            <span class="icon">📦</span>
            <div>
                <div class="item-name">${name}</div>
                <div class="item-category">Uncategorized</div>
            </div>
        </div>
        <div class="item-actions">
            <span class="quantity">x1</span>
            <button class="btn-icon" onclick="this.closest('.item').remove()">🗑️</button>
        </div>
    `;
    pantryList.appendChild(item);

    input.value = '';
    showSuccessMessage();
}

// Toggle Pantry Form
function togglePantryForm() {
    const form = document.getElementById('pantry-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Add to Pantry (detailed form)
function addToPantry() {
    const name = document.getElementById('pantry-item-name').value.trim();
    const quantity = document.getElementById('pantry-item-quantity').value;
    const category = document.getElementById('pantry-item-category').value || "Uncategorized";

    if (!name || quantity < 1) {
        alert("Please enter a valid name and quantity.");
        return;
    }

    const pantryList = document.getElementById('pantry-items');
    const item = document.createElement('div');
    item.className = 'item';
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
            <button class="btn-icon" onclick="this.closest('.item').remove()">🗑️</button>
        </div>
    `;
    pantryList.appendChild(item);

    // Clear and hide form
    document.getElementById('pantry-item-name').value = '';
    document.getElementById('pantry-item-quantity').value = 1;
    document.getElementById('pantry-item-category').value = '';
    document.getElementById('pantry-item-expiry').value = '';
    togglePantryForm();
}

// Show quick add success message briefly
function showSuccessMessage() {
    const msg = document.getElementById('quick-add-success');
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 2000);
}

// Dummy removeFromPantry fallback
function removeFromPantry(name) {
    const pantryList = document.getElementById('pantry-items');
    const items = pantryList.querySelectorAll('.item-name');
    for (let item of items) {
        if (item.textContent.toLowerCase() === name.toLowerCase()) {
            item.closest('.item').remove();
            return;
        }
    }
}
