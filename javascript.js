document.addEventListener("DOMContentLoaded", () => {
  updateCartButtons();
  AddToCart();
  updateCartCount();
});
var cart = JSON.parse(localStorage.getItem("cart") || [] );
let allProducts = [...products];
const container = document.getElementById("container");
function ShowProducts(productsli) {
  let fragment = document.createDocumentFragment();

  if (productsli.length === 0) {
    notFound(container);
  } else {
    productsli.forEach((product) => {
      const card = document.createElement("div");
      card.dataset.id = product.id;
      card.className =
        "one bg-white p-4 rounded shadow cursor-pointer product hover:translate-y-[-8px] transition-all duration-150";
      card.innerHTML = `
      <img src="${product.Image}" class="w-full mb-3 size-48 object-cover">
     <h2 class="text-lg font-bold product-name">${product.name}</h2>
     <p class="text-gray-600">${product.price}</p>

  <button
    data-id="${product.id}"
    class=" add-to-cart mt-3 bg-green-500 text-white px-4 py-2 rounded w-full">
    Add to Cart
  </button>
`;
      fragment.appendChild(card);
    });
    container.appendChild(fragment);
  }
}
//search trem
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", function () {
  const value = searchInput.value.toLowerCase();
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(value),
  );
  if (filtered.length > 0) {
    ShowProducts(filtered);
  } else {
    notFound(container);
  }
  updateCartButtons();
});
function notFound(container) {
  container.innerHTML = `
    <p class="text-center font-bold text-2xl">
      No Product Found
    </p>
  `;
}
function hello() {
  emptySearch();
  ShowProducts(allProducts);
  updateCartButtons();
  AddToCart();
  updateCartButtons();
  updateCartCount();
}
function sort(value) {
  if (value === "all") {
    allProducts = [...products];
  } else {
    const dir = value === "Low-to-Heigh" ? 1 : -1;
    allProducts.sort(
      (a, b) =>
        (Number(a.price.replace("$", "")) - Number(b.price.replace("$", ""))) *
        dir,
    );
  }
  hello();
}
function emptySearch() {
   const searchIn = document.getElementById("searchInput");
   searchIn.value = "";
}
const selectedCat = document.getElementById("Categories");
function Category(catvalue) {
  if (catvalue.value !== "All") {
    allProducts = products.filter(
      (product) => product.category === selectedCat.value,
    );
  } else {
    allProducts = [...products];
  }
 hello();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("translate-x-full");
}
function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}
function updateCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    let id = Number(btn.dataset.id);
    if (cart.includes(id) || cart.find((item) => item.id === id)) {
      btn.innerText = "Added";
      btn.classList.add("cursor-not-allowed", "opacity-50");
      btn.disabled = true;
    }
  });
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;
  const item = products.find((p) => p.id == btn.dataset.id);
  if (!item) return;
  const exists = cart.find((i) => i.id == btn.dataset.id);
  exists ? exists.qty++ : cart.push({ ...item, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  hello();
  alert("Added to cart");
});
function AddToCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  cartItems.innerHTML = "";
  let total = 0,totalQty = 0;
  cart.forEach((item) => {
  const price = item.price.replace("$", "");
    total += price * item.qty;
    totalQty += item.qty;
    cartItems.innerHTML += `
      <div class="flex justify-between items-center border p-2 rounded mb-2">
        <div>
          <p class="font-bold">${item.name}</p>
          <p>${item.price} x ${item.qty}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="changeQty(${item.id},-1)" class="bg-gray-300 text-sm px-1 rounded"><i class="fa-solid fa-minus"></i></button>
          <button onclick="changeQty(${item.id},1)" class="bg-gray-300 text-sm px-1 rounded"><i class="fa-solid fa-plus"></i></button>
          <button onclick="removeItem(${item.id})" class="bg-gray-300 text-sm px-1 rounded"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    `;
  });
  totalEl.innerText = total;
  localStorage.setItem("cart", JSON.stringify(cart));
}
// remove Items
function removeItem(id) {
  if (!confirm("Are you sure you want to remove this item?")) return;
  cart = cart.filter((i) => i.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  const btn = document.querySelector(`.add-to-cart[data-id="${id}"]`);
  if (btn) {
    btn.innerText = "Add to cart";
    btn.classList.remove("cursor-not-allowed", "opacity-50");
    btn.disabled = false;
  }
   hello();
}
window.changeQty = function (id, value) {
  let item = cart.find((p) => p.id == id);
  if (!item) {
    return;
  } else {
    item.qty += value;
  }
  if (item.qty <= 0) {
    cart = cart.filter((p) => p.id != id);
  }   
  hello();
};
ShowProducts(products);
// Difference between let var const
// VAR
// var x = 10;
// var x = 20;  (redeclare)
// x = 30;  (update)

// LET

// let x = 10;
// // let x = 20; (can't redeclare)
// x = 30; // (update)


//  CONST

// const x = 10;
// const x = 20;  Error (can't redeclare)
// x = 30;  Error (can't update)

