let products = [
  {
    id: 1,
    name: "Laptop",
    price: "$550",
    category: "Electronics",
    Image: "images/laptop.jpg",
  },
  {
    id: 2,
    name: "Bag",
    price: "$150",
    category: "Fashion",
    Image: "images/bag.jpg",
  },
  {
    id: 3,
    name: "BagPack",
    price: "$170",
    category: "Fashion",
    Image: "images/bagpack.jpg",
  },
  {
    id: 4,
    name: "clothes",
    price: "$210",
    category: "Fashion",
    Image: "images/clothes.jpg",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: "$50",
    category: "Electronics",
    Image: "images/gammingmouse.jpg",
  },
  {
    id: 6,
    name: "Jursey",
    price: "$30",
    category: "Fashion",
    Image: "images/jursey.jpg",
  },
  {
    id: 7,
    name: "Keyboard",
    price: "$70",
    category: "Electronics",
    Image: "images/keyboard.jpg",
  },
  {
    id: 8,
    name: "Laptop Dell",
    price: "$450",
    category: "Electronics",
    Image: "images/laptop2.jpg",
  },
  {
    id: 9,
    name: "Shirt",
    price: "$20",
    category: "Fashion",
    Image: "images/shirts.jpg",
  },
];
let allProducts = [...products];
const container = document.getElementById("container");
function ShowProducts(productsli) {
  let fragment = document.createDocumentFragment();
  container.innerHTML = "";

  if (productsli.length === 0) {
    container.innerHTML = `
      <p class="text-center font-bold text-2xl">No Product Found</p>`;
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
    container.innerHTML = `
      <p class="text-center font-bold text-2xl">No Product Found</p>
    `;
  }
  updateCartButtons();
});
function sort(value) {
  emptySearch();
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

  ShowProducts(allProducts);
  updateCartButtons();
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
    filetred = [...products];
  }
  emptySearch();
  ShowProducts(allProducts);
  updateCartButtons();
}
function toggleCart() {
  document.getElementById("cart").classList.toggle("translate-x-full");
}
function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}
function updateCartButtons() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    let id = Number(btn.dataset.id);
    if (cart.includes(id) || cart.find((item) => item.id === id)) {
      btn.innerText = "Added";
      btn.classList.add("cursor-not-allowed", "opacity-50");
      btn.disabled = true;
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartButtons();
  updateCart();
  updateCartCount();
});
let cart = JSON.parse(localStorage.getItem("cart"));
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;
  const item = products.find((p) => p.id == btn.dataset.id);
  if (!item) return;
  const exists = cart.find((i) => i.id == btn.dataset.id);
  exists ? exists.qty++ : cart.push({ ...item, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateCartCount();
  updateCartButtons();
  alert("Added to cart");
});
function updateCart() {
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
  updateCart();
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
  updateCart();
  updateCartCount();
};
ShowProducts(products);
