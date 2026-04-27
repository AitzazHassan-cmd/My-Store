let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.addEventListener("DOMContentLoaded", () => {
  AddToCart();
});
function AddToCart() {
  const CARTITEMS = document.getElementById("cart-items");
  const TOTALEL = document.getElementById("total");

  CARTITEMS.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    CARTITEMS.innerHTML += `
   <div class="flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-4">
  <div class="flex items-center gap-4">
    <img src="${item.Image}" class="w-20 h-20 object-cover rounded-lg border">

    <div>
      <p class="text-lg font-semibold">${item.name}</p>
      <p class="text-gray-500 text-sm">$${item.price} × ${item.qty}</p>
    </div>
  </div>
  <div class="flex items-center gap-3">
    <div class="flex items-center border rounded-lg overflow-hidden">
      <button onclick="changeQty(${item.id},-1)" 
        class="px-3 py-1 bg-gray-100 hover:bg-gray-200">
        −
      </button>

      <span class="px-4 font-medium">${item.qty}</span>

      <button onclick="changeQty(${item.id},1)" 
        class="px-3 py-1 bg-gray-100 hover:bg-gray-200">
        +
      </button>
    </div>

    <button onclick="removeItem(${item.id})" 
      class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
      Remove
    </button>

  </div>
</div>
    `;
  });

  TOTALEL.innerText = total;

  localStorage.setItem("cart", JSON.stringify(cart));
}
function removeItem(id) {
  if (!confirm("Remove this item?")) return;

  cart = cart.filter((i) => i.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  AddToCart();
}
function changeQty(id, value) {
  let item = cart.find((p) => p.id == id);

  if (!item) return;

  item.qty += value;

  if (item.qty <= 0) {
    if (!confirm("Remove this item?")) return;
    cart = cart.filter((p) => p.id != id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  AddToCart();
}
window.removeItem = removeItem;
window.changeQty = changeQty;