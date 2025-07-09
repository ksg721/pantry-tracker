let pantry = [];

function loadPantry() {
  const data = localStorage.getItem('pantry');
  pantry = data ? JSON.parse(data) : [];
}

function savePantry() {
  localStorage.setItem('pantry', JSON.stringify(pantry));
}

function renderPantry() {
  const list = document.getElementById('pantry-list');
  list.innerHTML = '';
  if (pantry.length === 0) {
    list.innerHTML = '<li>No items in pantry.</li>';
    return;
  }
  pantry.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} (x${item.quantity}) `;
    const btn = document.createElement('button');
    btn.textContent = 'Remove';
    btn.onclick = () => {
      pantry.splice(idx, 1);
      savePantry();
      renderPantry();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadPantry();
  renderPantry();

  document.getElementById('add-item-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value.trim();
    const quantity = parseInt(document.getElementById('item-quantity').value, 10);
    if (name && quantity > 0) {
      const existing = pantry.find(item => item.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        existing.quantity += quantity;
      } else {
        pantry.push({ name, quantity });
      }
      savePantry();
      renderPantry();
      e.target.reset();
    }
  });
});
