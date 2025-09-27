// Check login
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser) window.location.href = "index.html";

const welcomeUser = document.getElementById("welcomeUser");
if(welcomeUser) welcomeUser.textContent = "Hi, " + loggedInUser.name;

const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
  logoutBtn.addEventListener("click", ()=>{
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}

// Products
const products = [
  {id:1, name:"iPhone 17", price:50000, img:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-model-unselect-gallery-2-202509?wid=5120&hei=2880&fmt=webp&qlt=90&.v=dU9qRExIQUlQTzVKeDd1V1dtUE1MUWFRQXQ2R0JQTk5udUZxTkR3ZVlpTEVqWElVVkRpc1V5YU5kb3VzUVZndzBoUVhuTWlrY2hIK090ZGZZbk9HeEJWb1BiTjRORlc1Y1lKU3JWempySktQVFcxaWdDV1ZRTjhLQ2h5TEk5bUxmbW94YnYxc1YvNXZ4emJGL0IxNFp3&traceId=1"},
  {id:2, name:"MacBook Pro", price:79999, img:"https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=940&hei=1112&fmt=png-alpha"},
  {id:3, name:"AirPods Pro", price:8449, img:"https://npr.brightspotcdn.com/dims3/default/strip/false/crop/3588x2392+0+0/resize/900/quality/85/format/webp/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F55%2F5a%2F849e9ec544d0b19bda7cb6a6bef7%2Fap24253731025560.jpg"},
  {id:4, name:"Apple Watch", price:72000, img:"https://goldenconcept.com/cdn/shop/files/WC-RO45-G_0001_367bc07b-0bc7-44cc-80a4-c76395fd7f80_863x.png?v=1702632824"}
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(){
  if(!productList) return;
  productList.innerHTML="";
  products.forEach(p=>{
    productList.innerHTML+=`
      <div class="col-md-3 mb-4">
        <div class="card shadow-sm">
          <img src="${p.img}" class="card-img-top" alt="${p.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">$${p.price}</p>
            <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      </div>`;
  });
}

function addToCart(id){
  const item = products.find(p=>p.id===id);
  const existing = cart.find(p=>p.id===id);
  if(existing) existing.qty++;
  else cart.push({...item, qty:1});
  saveCart();
  renderCart();
}

function renderCart(){
  if(!cartItems) return;
  if(cart.length===0){
    cartItems.innerHTML="<p>Your cart is empty.</p>";
    cartTotal.textContent=0;
    cartCount.textContent=0;
    return;
  }
  let html="<ul class='list-group'>";
  let total=0;
  cart.forEach(i=>{
    total+=i.price*i.qty;
    html+=`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <img src="${i.img}" width="50">
        <span>${i.name} (x${i.qty})</span>
        <span>$${i.price*i.qty}</span>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${i.id})">Remove</button>
      </li>`;
  });
  html+="</ul>";
  cartItems.innerHTML=html;
  cartTotal.textContent=total;
  cartCount.textContent=cart.reduce((sum,i)=>sum+i.qty,0);
}

function removeFromCart(id){
  cart=cart.filter(i=>i.id!==id);
  saveCart();
  renderCart();
}

function saveCart(){
  localStorage.setItem("cart",JSON.stringify(cart));
}

// Checkout
const checkoutBtn=document.getElementById("checkoutBtn");
if(checkoutBtn){
  checkoutBtn.addEventListener("click",()=>{
    if(cart.length===0){ alert("Your cart is empty!"); return; }
    alert("Checkout successful!");
    cart=[];
    saveCart();
    renderCart();
  });
}

// Cart modal
const cartBtn=document.getElementById("cartBtn");
if(cartBtn){
  cartBtn.addEventListener("click",()=>{
    const modal=new bootstrap.Modal(document.getElementById("cartModal"));
    modal.show();
  });
}

// Initialize
window.addEventListener("DOMContentLoaded",()=>{
  displayProducts();
  renderCart();
});
