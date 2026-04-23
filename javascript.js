document.addEventListener("DOMContentLoaded", () => {
  updateCartButtons();
  AddToCart();
  updateCartCount();
});
var cart = JSON.parse(localStorage.getItem("cart") || 0 );
let allProducts = [...products];
const CONTAINER = document.getElementById("container");
function ShowProducts(productsli) {
  let fragment = document.createDocumentFragment();
  CONTAINER.innerHTML = "";
  if (productsli.length === 0) {
    notFound(CONTAINER);
  } else {
    productsli.forEach((product) => {
      const CARD = document.createElement("div");
      CARD.dataset.id = product.id;
      CARD.className =
        "one bg-white p-4 rounded shadow cursor-pointer product";
      CARD.innerHTML = `
      <img src="${product.Image}" class="w-full mb-3 size-48 object-cover">
     <h2 class="text-lg font-bold product-name">${product.name}</h2>
     <p class="text-gray-600">${product.price}</p>

  <button
    data-id="${product.id}"
    class=" add-to-cart cursor-pointer mt-3 bg-green-500 text-white px-4 py-2 rounded w-full">
    Add to Cart
  </button>
`;
      fragment.appendChild(CARD);
    });
    CONTAINER.appendChild(fragment);
  }
}
//search trem
const SEARCHIP = document.getElementById("searchInput");
SEARCHIP.addEventListener("keyup", function () {
  const VALUE = SEARCHIP.value.toLowerCase();
  const FILTERED = products.filter((product) =>
    product.name.toLowerCase().includes(VALUE),
  );
  if (FILTERED.length > 0) {
    ShowProducts(FILTERED);
  } else {
    notFound(CONTAINER);
  }
  updateCartButtons();
});
function notFound(CONTAINER) {
  CONTAINER.innerHTML = `
    <p class="text-center font-bold text-2xl">
      No Product Found
    </p>
  `;
}
function hello() {
  emptySearch();
  ShowProducts(allProducts);
  updateCartButtons();
}
function sort(value) {
  if (value === "all") {
    allProducts = [...products];
  } else {
    const DIR = value === "Low-to-Heigh" ? 1 : -1;
    allProducts.sort(
      (a, b) =>
        (Number(a.price.replace("$", "")) - Number(b.price.replace("$", ""))) *
        DIR,
    );
  }
  hello();
}
function emptySearch() {
   const SEARCHIPUNT = document.getElementById("searchInput");
   SEARCHIPUNT.value = "";
}
function Category(value) {
  if (value !== "All") {
    allProducts = products.filter(
      product => product.category === value
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
  const BTN = e.target.closest(".add-to-cart");
  if (!BTN) return;
  const item = products.find((p) => p.id == BTN.dataset.id);
  if (!item) return;
  const EXISTS = cart.find((i) => i.id == BTN.dataset.id);
  EXISTS ? EXISTS.qty++ : cart.push({ ...item, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  AddToCart();
  hello();
  alert("Added to cart");
});
function AddToCart() {
  const CARTITEMS = document.getElementById("cart-items");
  const TOTALEL = document.getElementById("total");
  CARTITEMS.innerHTML = "";
  let total = 0,totalQty = 0;
  cart.forEach((item) => {
  const price = item.price.replace("$", "");
    total += price * item.qty;
    totalQty += item.qty;
    CARTITEMS.innerHTML += `
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
  TOTALEL.innerText = total;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
// remove Items
function removeItem(id) {
  if (!confirm("Are you sure you want to remove this item?")) return;
  cart = cart.filter((i) => i.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  const BTN = document.querySelector(`.add-to-cart[data-id="${id}"]`);
  if (BTN) {
    BTN.innerText = "Add to cart";
    BTN.classList.remove("cursor-not-allowed", "opacity-50");
    BTN.disabled = false;
  }
 AddToCart();
  updateCartCount();
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
  AddToCart();
  updateCartCount();
};
ShowProducts(products);
// Difference between let var const
// VAR
// var x = 10;
// var x = 20;  redeclare
// x = 30;  update

// LET

// let x = 10;
// // let x = 20; can't redeclare
// x = 30; // update


//  CONST

// const x = 10;
// const x = 20;  Error can't redeclare
// x = 30;  Error can't update