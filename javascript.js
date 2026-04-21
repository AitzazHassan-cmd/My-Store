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

function ShowProducts(productsli) {
  let container = document.getElementById("container");
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
let searchInput = document.getElementById("searchInput");
const notFound = document.getElementById("notFound");

searchInput.addEventListener("keyup", function () {
  const value = searchInput.value.toLowerCase();
  const Allproducts = document.querySelectorAll(".one");

  let found = false;
  Allproducts.forEach((product) => {
    const name = product.querySelector(".product-name").innerText.toLowerCase();

    if (name.includes(value)) {
      product.classList.remove("hidden");
      found = true;
    } else {
      product.classList.add("hidden");
    }
  });

  if (found) {
    notFound.classList.add("hidden");
  } else {
    notFound.classList.remove("hidden");
  }
  updateCartButtons();
});

function sort(value) {
  if (value === "Low-to-Heigh") {
    allProducts.sort((a, b) => {
      const priceA = Number(a.price.replace("$", ""));
      const priceB = Number(b.price.replace("$", ""));
      return priceA - priceB;
    });
  } else if (value === "Heigh-to-Low") {
    allProducts.sort((a, b) => {
      const priceA = Number(a.price.replace("$", ""));
      const priceB = Number(b.price.replace("$", ""));
      return priceB - priceA;
    });
  } else if (value === "all") {
    allProducts = [...products];
  }
  const searchIn = document.getElementById("searchInput");
  searchIn.value = "";
  ShowProducts(allProducts);
  updateCartButtons();
}
const selectedCat = document.getElementById("Categories");
function Category(catvalue) {
  let filetred = [...products];
  if (catvalue.value !== "All") {
    filetred = products.filter(
      (product) => product.category === selectedCat.value,
    );
  } else {
    filetred = products;
  }
  const searchIn = document.getElementById("searchInput");
  searchIn.value = "";
  allProducts = filetred;
  ShowProducts(allProducts);
  updateCartButtons();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("translate-x-full");
}
const CountEl = document.getElementById("cart-count");
function updateCartCount() {
  CountEl.innerText = cart.length;
}
function updateCartButtons() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    let id = Number(btn.dataset.id);

    if (cart.includes(id) || cart.find(item => item.id === id)) {
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
let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;
  let id = btn.dataset.id;
  let item = products.find((p) => p.id == id);
  if (!item) return;
  let exists = cart.find((item) => item.id === id);

  if (exists) {
    exists.qty += 1;
  } else {
    cart.push({
      ...item,
      qty: 1,
    });
  }
  alert("Added to cart");
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateCartCount();
  btn.innerText = "Added";
  btn.classList.add("cursor-not-allowed");
  btn.classList.add("opacity-50");
  btn.disabled = true;
});
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  cartItems.innerHTML = "";
  let total = 0;
  let totalQty = 0;

  cart.forEach((item) => {
    total += item.price.replace("$", "") * item.qty;
    totalQty += item.qty;
    cartItems.innerHTML += `
      <div class="flex justify-between items-center border p-2 rounded mb-2">
        
        <div>
          <p class="font-bold">${item.name}</p>
          <p>${item.price} x ${item.qty}</p>
        </div>

        <div class="flex gap-2">
          <button onclick="changeQty(${item.id}, -1)" class="bg-gray-300 px-2 rounded">-</button>
          <button onclick="changeQty(${item.id}, 1)" class="bg-gray-300 px-2 rounded">+</button>
           <button onclick="removeItem(${item.id})" class="bg-gray-300 px-2 cursor-pointer rounded">x</button>
        </div>

      </div>
    `;
  });

  totalEl.innerText = total;

  localStorage.setItem("cart", JSON.stringify(cart));
}
// remove Items
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
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
