document.addEventListener("DOMContentLoaded", () => {
   cart = JSON.parse(localStorage.getItem("cart")) || [];

  updateCartCount();
  loadProducts();
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];
let allProducts = [];
async function loadProducts() {
  try {
    const DATA = await fetch("./products.json");
    console.log(DATA);
    products = await DATA.json();
    allProducts = [...products];
    ShowProducts(allProducts);
    updateCartButtons();
  } catch (error) {
    console.log(error);
  }
}
const CONTAINER = document.getElementById("container");
function ShowProducts(productsli) {
  let fragment = document.createDocumentFragment();
  CONTAINER.innerHTML = "";
  if (productsli.length === 0) {
    notFound();
  } else {
    productsli.forEach((product) => {
      const CARD = document.createElement("div");
      CARD.dataset.id = product.id;
      CARD.className =
        "one bg-white p-4 rounded-md shadow-xl cursor-pointer product";
      CARD.innerHTML = `
     <img src="${product.Image}" 
     class="w-full h-52 object-cover object-center rounded-lg transition duration-300 hover:scale-105">
     <h2 class="text-lg font-bold product-name">${product.name}</h2>
     <p class="text-gray-600">$${product.price}</p>

  <button
    data-id="${product.id}"
    class=" add-to-cart cursor-pointer mt-3 bg-black text-white  px-4 py-2 rounded w-full">
    Add to Cart
  </button>
`;
      CARD.querySelector("img").onclick = () => openModal(product);
      fragment.appendChild(CARD);
    });
    CONTAINER.appendChild(fragment);
  }
}
// Open Model
function openModal(product) {
  document.getElementById("modalTitle").innerText = product.name;
  document.getElementById("modalPrice").innerText = `$${product.price}`;
  document.getElementById("modalImg").src = product.Image;

  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}
// close model
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
//search 
const SEARCHIP = document.getElementById("searchInput");
SEARCHIP.addEventListener("keyup", function () {
  currentSearch = this.value.toLowerCase();
  applyFilters();
});
function notFound() {
  CONTAINER.innerHTML = `
    <p class="text-center font-bold text-2xl">
      No Product Found
    </p>
  `;
}
function sort(value) {
  currentSort = value;
  emptySearch();
  applyFilters();
}
let currentSearch = "",
  currentCategory = "All",
  currentSort = "all";
function applyFilters() {
  let result = [...products];
  // 1. category
  if (currentCategory !== "All") {
    result = result.filter((p) => p.category === currentCategory);
  }

  // 2. search
  if (currentSearch !== "") {
    result = result.filter((p) => p.name.toLowerCase().includes(currentSearch));
  }

  // 3. SORT
  if (currentSort !== "all") {
    const dir = currentSort === "Low-to-Heigh" ? 1 : -1;

    result = result.sort((a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      return (priceA - priceB) * dir;
    });
  }

  allProducts = result;

  ShowProducts(result);
  updateCartButtons();
}
function emptySearch() {
  const SEARCHIPUNT = document.getElementById("searchInput");
  SEARCHIPUNT.value = "";
}
function Category(value) {
  currentCategory = value;
  emptySearch();
  applyFilters();
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
    if (cart.find((item) => item.id === id)) {
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
  updateCartCount();
  updateCartButtons();
  alert("Added to cart");
});

// Difference between let var const
// VAR
// var x = 10;
// var x = 20;  can be redeclared
// x = 30;  you can update its value also
// console.log(x);

// LET

// let x = 10;
// // let x = 20; can't redeclare
// x = 30;  update

//  CONST

// const x = 10;
// const x = 20;  Error can't redeclare
// x = 30;  Error can't update
