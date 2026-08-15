// ==========================
// CART
// ==========================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ==========================
// ADD TO CART
// ==========================

function addToCart(name, price) {

    let existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,
            price: price,
            quantity: 1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(name + " added to cart!");

    updateCartCount();
}


// ==========================
// CART COUNT
// ==========================

function updateCartCount() {

    let cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    let totalQuantity = 0;

    cart.forEach(function(product) {

        totalQuantity += product.quantity;

    });

    cartCount.innerText =
        totalQuantity;
}


// ==========================
// PRODUCT IMAGE
// ==========================

function getProductImage(name) {

    let images = {

        "Smart Phone": "📱",

        "Laptop": "💻",

        "Wireless Headphones": "🎧",

        "Cotton T-Shirt": "👕",

        "Sports Shoes": "👟",

        "Smart Watch": "⌚"

    };

    return images[name] || "🛍️";
}


// ==========================
// SEARCH PRODUCTS
// ==========================

function searchProducts() {

    let searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    let searchText =
        searchInput.value
        .toLowerCase()
        .trim();

    let products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        let productName =
            product.querySelector("h3")
            .innerText
            .toLowerCase();

        let category =
            product.querySelector(".category")
            .innerText
            .toLowerCase();


        if (
            searchText === "" ||
            productName.includes(searchText) ||
            category.includes(searchText)
        ) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";

        }

    });

}


// ==========================
// CATEGORY FILTER
// ==========================

function filterProducts(category) {

    let products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        let productCategory =
            product.querySelector(".category")
            .innerText
            .trim();


        if (
            category === "All" ||
            productCategory === category
        ) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";

        }

    });

}


// ==========================
// DISPLAY CART
// ==========================

function displayCart() {

    let cartItems =
        document.getElementById("cart-items");

    if (!cartItems) {
        return;
    }


    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cartItems.innerHTML = "";


    let subtotal = 0;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty 🛒
                </h2>

                <br>

                <a href="products.html">
                    Continue Shopping
                </a>

            </div>

        `;

        let subtotalElement =
            document.getElementById("subtotal");

        let totalElement =
            document.getElementById("total");


        if (subtotalElement) {
            subtotalElement.innerText = "0";
        }

        if (totalElement) {
            totalElement.innerText = "0";
        }

        return;
    }


    // Display products

    cart.forEach(function(product, index) {

        let itemTotal =
            product.price * product.quantity;

        subtotal += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-product-image">
                    ${getProductImage(product.name)}
                </div>


                <div class="cart-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="cart-price">
                        ₹${product.price}
                    </p>

                </div>


                <div class="quantity">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <strong class="cart-item-total">
                    ₹${itemTotal}
                </strong>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    // Total

    let delivery = 50;

    let total =
        subtotal + delivery;


    let subtotalElement =
        document.getElementById("subtotal");

    let totalElement =
        document.getElementById("total");


    if (subtotalElement) {
        subtotalElement.innerText =
            subtotal;
    }

    if (totalElement) {
        totalElement.innerText =
            total;
    }

}


// ==========================
// INCREASE QUANTITY
// ==========================

function increaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}


// ==========================
// DECREASE QUANTITY
// ==========================

function decreaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) {
        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}


// ==========================
// REMOVE PRODUCT
// ==========================

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}
// ==========================
// CHECKOUT
// ==========================

function goToCheckout() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href =
        "checkout.html";
}


// ==========================
// CHECKOUT PAGE
// ==========================

function displayCheckout() {

    let checkoutItems =
        document.getElementById("checkout-items");

    if (!checkoutItems) {
        return;
    }

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    checkoutItems.innerHTML = "";

    let subtotal = 0;


    // Empty cart

    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your cart is empty.</p>";

        let checkoutSubtotal =
            document.getElementById("checkout-subtotal");

        let checkoutTotal =
            document.getElementById("checkout-total");

        if (checkoutSubtotal) {
            checkoutSubtotal.innerText = "0";
        }

        if (checkoutTotal) {
            checkoutTotal.innerText = "0";
        }

        return;
    }


    // Display products

    cart.forEach(function(product) {

        let itemTotal =
            Number(product.price) *
            Number(product.quantity);

        subtotal += itemTotal;

        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <span>
                    ${product.name}
                    × ${product.quantity}
                </span>

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>

        `;

    });


    // Delivery

    let delivery = 50;

    let total =
        subtotal + delivery;


    // Update subtotal

    let checkoutSubtotal =
        document.getElementById(
            "checkout-subtotal"
        );

    if (checkoutSubtotal) {

        checkoutSubtotal.innerText =
            subtotal;

    }


    // Update total

    let checkoutTotal =
        document.getElementById(
            "checkout-total"
        );

    if (checkoutTotal) {

        checkoutTotal.innerText =
            total;

    }

}


// ==========================
// LOAD CHECKOUT
// ==========================

displayCheckout();


// ==========================
// PLACE ORDER
// ==========================

function placeOrder() {

    let name =
        document.getElementById(
            "customerName"
        ).value.trim();

    let email =
        document.getElementById(
            "customerEmail"
        ).value.trim();

    let phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();

    let address =
        document.getElementById(
            "customerAddress"
        ).value.trim();

    let city =
        document.getElementById(
            "customerCity"
        ).value.trim();

    let pincode =
        document.getElementById(
            "customerPincode"
        ).value.trim();


    // Check empty fields

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {

        alert(
            "Please fill all customer details."
        );

        return;
    }


    // Get cart

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Check empty cart

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;
    }


    // Save order

    let orderDetails = {

        name: name,

        email: email,

        phone: phone,

        address: address,

        city: city,

        pincode: pincode,

        items: cart,

        date: new Date().toLocaleString()

    };


    localStorage.setItem(
        "lastOrder",
        JSON.stringify(orderDetails)
    );


    // Clear cart

    localStorage.removeItem("cart");


    // Success

    


    window.location.href =
        "order-success.html";
}

// ==========================
// LOGIN
// ==========================

function loginUser(event) {

    event.preventDefault();


    let email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    let password =
        document.getElementById(
            "loginPassword"
        ).value.trim();


    if (
        email === "" ||
        password === ""
    ) {

        alert(
            "Please enter email and password."
        );

        return;
    }


    localStorage.setItem(
        "loggedInUser",
        email
    );


    alert(
        "Login successful!"
    );


    window.location.href =
        "index.html";

}


// ==========================
// REGISTER
// ==========================

function registerUser(event) {

    event.preventDefault();


    let name =
        document.getElementById(
            "registerName"
        ).value.trim();


    let email =
        document.getElementById(
            "registerEmail"
        ).value.trim();


    let password =
        document.getElementById(
            "registerPassword"
        ).value;


    let confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;


    if (
        password !== confirmPassword
    ) {

        alert(
            "Passwords do not match!"
        );

        return;
    }


    let user = {

        name: name,
        email: email

    };


    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );


    alert(
        "Account created successfully!"
    );


    window.location.href =
        "login.html";

}


// ==========================
// PRODUCT DETAILS
// ==========================

let detailsQuantity = 1;

let selectedProduct = null;


const productDetails = {

    "Smart Phone": {

        price: 25999,
        category: "Electronics",
        image: "📱",
        description:
            "A powerful smart phone with modern features."

    },


    "Laptop": {

        price: 55999,
        category: "Electronics",
        image: "💻",
        description:
            "A fast and reliable laptop for work and study."

    },


    "Wireless Headphones": {

        price: 1999,
        category: "Electronics",
        image: "🎧",
        description:
            "Enjoy clear sound with these wireless headphones."

    },


    "Cotton T-Shirt": {

        price: 799,
        category: "Fashion",
        image: "👕",
        description:
            "Comfortable cotton T-shirt for everyday use."

    },


    "Sports Shoes": {

        price: 2499,
        category: "Footwear",
        image: "👟",
        description:
            "Comfortable sports shoes for everyday activities."

    },


    "Smart Watch": {

        price: 3499,
        category: "Electronics",
        image: "⌚",
        description:
            "A stylish smart watch with useful features."

    }

};


// ==========================
// OPEN PRODUCT DETAILS
// ==========================

function openProductDetails(name) {

    localStorage.setItem(
        "selectedProduct",
        name
    );


    window.location.href =
        "product-details.html";

}


// ==========================
// LOAD PRODUCT DETAILS
// ==========================

function loadProductDetails() {

    let productName =
        localStorage.getItem(
            "selectedProduct"
        );


    if (!productName) {
        return;
    }


    let product =
        productDetails[productName];


    if (!product) {
        return;
    }


    selectedProduct =
        productName;


    let nameElement =
        document.getElementById(
            "detailsName"
        );


    let priceElement =
        document.getElementById(
            "detailsPrice"
        );


    let categoryElement =
        document.getElementById(
            "detailsCategory"
        );


    let imageElement =
        document.getElementById(
            "detailsImage"
        );


    let descriptionElement =
        document.getElementById(
            "detailsDescription"
        );


    if (nameElement) {

        nameElement.innerText =
            productName;

    }


    if (priceElement) {

        priceElement.innerText =
            product.price;

    }


    if (categoryElement) {

        categoryElement.innerText =
            product.category;

    }


    if (imageElement) {

        imageElement.innerText =
            product.image;

    }


    if (descriptionElement) {

        descriptionElement.innerText =
            product.description;

    }

}


// ==========================
// PRODUCT DETAILS QUANTITY
// ==========================

function changeDetailsQuantity(change) {

    detailsQuantity += change;


    if (detailsQuantity < 1) {

        detailsQuantity = 1;

    }


    let quantityElement =
        document.getElementById(
            "detailsQuantity"
        );


    if (quantityElement) {

        quantityElement.innerText =
            detailsQuantity;

    }

}


// ==========================
// ADD DETAILS PRODUCT TO CART
// ==========================

function addDetailsProductToCart() {

    if (!selectedProduct) {
        return;
    }


    let product =
        productDetails[selectedProduct];


    if (!product) {
        return;
    }


    for (
        let i = 0;
        i < detailsQuantity;
        i++
    ) {

        addToCart(
            selectedProduct,
            product.price
        );

    }

}


// ==========================
// INITIALIZE
// ==========================

updateCartCount();

displayCart();

displayCheckout();

loadProductDetails();
// ==========================
// WISHLIST
// ==========================

function addToWishlist(name) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.includes(name)) {

        alert(name + " is already in wishlist!");

        return;
    }

    wishlist.push(name);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert(name + " added to wishlist! ❤️");
}
// ==========================
// DISPLAY WISHLIST
// ==========================

function displayWishlist() {

    let wishlistItems =
        document.getElementById("wishlist-items");

    if (!wishlistItems) {
        return;
    }

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `
            <div class="empty-wishlist">

                <h2>
                    Your wishlist is empty ❤️
                </h2>

                <br>

                <a href="products.html">
                    Browse Products
                </a>

            </div>
        `;

        return;
    }

    wishlist.forEach(function(name) {

        let product = productDetails[name];

        if (!product) {
            return;
        }

        wishlistItems.innerHTML += `

            <div class="wishlist-item">

                <div class="wishlist-image">
                    ${product.image}
                </div>

                <div class="wishlist-info">

                    <h3>
                        ${name}
                    </h3>

                    <p>
                        ${product.category}
                    </p>

                    <strong>
                        ₹${product.price}
                    </strong>

                </div>

                <button
                    class="cart-button"
                    onclick="addToCart('${name}', ${product.price})">

                    Add to Cart

                </button>
                <button
                class="remove-wishlist-button"
                onclick="removeFromWishlist('${name}')">

                Remove ❤️

                </button>

            </div>

        `;

    });
}


// ==========================
// LOAD WISHLIST
// ==========================

displayWishlist();
// ==========================
// REMOVE FROM WISHLIST
// ==========================

function removeFromWishlist(name) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist = wishlist.filter(function(product) {
        return product !== name;
    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();

    alert(name + " removed from wishlist!");
}
// ==========================
// DISPLAY ORDERS
// ==========================

function displayOrders() {

    let ordersContainer =
        document.getElementById("orders-container");

    if (!ordersContainer) {
        return;
    }

    let lastOrder =
        JSON.parse(
            localStorage.getItem("lastOrder")
        );

    if (!lastOrder) {

        ordersContainer.innerHTML = `

            <div class="empty-orders">

                <h2>
                    No orders yet 📦
                </h2>

                <p>
                    You haven't placed any orders yet.
                </p>

                <br>

                <a href="products.html">
                    Start Shopping
                </a>

            </div>

        `;

        return;
    }


    let itemsHTML = "";

    lastOrder.items.forEach(function(product) {

        let itemTotal =
            product.price * product.quantity;

        itemsHTML += `

            <div class="order-item">

                <span>
                    ${product.name}
                    × ${product.quantity}
                </span>

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>

        `;

    });


    ordersContainer.innerHTML = `

        <div class="order-card">

            <div class="order-header">

                <h2>
                    Order Details
                </h2>

                <span>
                    ${lastOrder.date}
                </span>

            </div>


            <div class="customer-info">

                <h3>
                    Delivery Details
                </h3>

                <p>
                    ${lastOrder.name}
                </p>

                <p>
                    ${lastOrder.phone}
                </p>

                <p>
                    ${lastOrder.email}
                </p>

                <p>
                    ${lastOrder.address},
                    ${lastOrder.city} -
                    ${lastOrder.pincode}
                </p>

            </div>


            <div class="order-products">

                <h3>
                    Products
                </h3>

                ${itemsHTML}

            </div>

        </div>

    `;
}


// Load orders

displayOrders();
// ==========================
// USER LOGIN STATUS
// ==========================

function updateUserStatus() {

    let loggedInUser =
        localStorage.getItem("loggedInUser");

    let userStatus =
        document.getElementById("user-status");

    if (!userStatus) {
        return;
    }

    if (loggedInUser) {

        userStatus.innerHTML = `
            <span>Hi, ${loggedInUser}</span>
            <button onclick="logoutUser()">
                Logout
            </button>
        `;

    } else {

        userStatus.innerHTML = `
            <a href="login.html">
                Login
            </a>
        `;

    }
}


// ==========================
// LOGOUT
// ==========================

function logoutUser() {

    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    updateUserStatus();
}


// Load user status

updateUserStatus();
// ==========================
// USER STATUS
// ==========================

function updateUserStatus() {

    let userStatus =
        document.getElementById("user-status");

    if (!userStatus) {
        return;
    }

    let loggedInUser =
        localStorage.getItem("loggedInUser");

    if (loggedInUser) {

        userStatus.innerHTML = `
            <span>Hi, ${loggedInUser}</span>

            <button onclick="logoutUser()">
                Logout
            </button>
        `;

    } else {

        userStatus.innerHTML = `
            <a href="login.html">
                Login
            </a>
        `;

    }
}


// ==========================
// LOGOUT
// ==========================

function logoutUser() {

    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    updateUserStatus();
}


updateUserStatus();
// ==========================
// CHECK LOGIN
// ==========================

function checkLogin() {

    let loggedInUser =
        localStorage.getItem("loggedInUser");

    if (!loggedInUser) {

        alert("Please login to continue.");

        window.location.href = "login.html";

        return false;
    }

    return true;
}