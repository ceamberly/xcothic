const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    // Tutup menu ketika link diklik

    const navLinks = navMenu.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}
const shopProductGrid = document.getElementById("shopProductGrid");

if (shopProductGrid) {

    if (products.length === 0) {

        shopProductGrid.innerHTML = `
            <div class="shop-empty">
                <span>COMING SOON</span>

                <p>
                    XCOTHIC products are currently
                    being prepared.
                </p>
            </div>
        `;

    }

}/* =========================================
   XCOTHIC CART SYSTEM
   ========================================= */

const XCOTHIC_CART_KEY = "xcothic_cart";


/* -----------------------------------------
   GET CART
----------------------------------------- */

function getCart() {
    try {
        const cart = JSON.parse(
            localStorage.getItem(XCOTHIC_CART_KEY)
        );

        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
}


/* -----------------------------------------
   SAVE CART
----------------------------------------- */

function saveCart(cart) {
    localStorage.setItem(
        XCOTHIC_CART_KEY,
        JSON.stringify(cart)
    );
}


/* -----------------------------------------
   CART COUNT
----------------------------------------- */

function updateCartCount() {

    const cart = getCart();

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    /* Existing cart count */
    const cartCounts = document.querySelectorAll(
        ".cart-count"
    );

    cartCounts.forEach((count) => {
        count.textContent = totalQuantity;
    });


    /* Product page / alternative cart format */
    const navCartCounts = document.querySelectorAll(
        ".nav-cart span"
    );

    navCartCounts.forEach((count) => {
        count.textContent = totalQuantity;
    });
}


/* -----------------------------------------
   ADD PRODUCT TO CART
----------------------------------------- */

function addToCart(product) {

    const cart = getCart();

    const existingProduct = cart.find(
        (item) =>
            item.id === product.id &&
            item.size === product.size
    );

    if (existingProduct) {

        existingProduct.quantity += product.quantity;

    } else {

        cart.push(product);

    }

    saveCart(cart);

    updateCartCount();

    showCartMessage(
        `${product.name} added to cart`
    );
}


/* -----------------------------------------
   CART MESSAGE
----------------------------------------- */

function showCartMessage(message) {

    const oldMessage =
        document.querySelector(".cart-message");

    if (oldMessage) {
        oldMessage.remove();
    }

    const messageBox =
        document.createElement("div");

    messageBox.className = "cart-message";

    messageBox.textContent = message;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.classList.add("show");
    }, 10);

    setTimeout(() => {

        messageBox.classList.remove("show");

        setTimeout(() => {
            messageBox.remove();
        }, 250);

    }, 2000);
}


/* -----------------------------------------
   PRODUCT PAGE
----------------------------------------- */

const addCartButton =
    document.querySelector(".add-cart-btn");

if (addCartButton) {

    addCartButton.addEventListener(
        "click",
        () => {

            const productName =
                document.querySelector(
                    ".product-detail-info h1"
                )?.textContent.trim()
                || "XCOTHIC Product";

            const priceText =
                document.querySelector(
                    ".product-price"
                )?.textContent
                || "Rp 0";

            const price =
                Number(
                    priceText
                        .replace(/[^0-9]/g, "")
                ) || 0;

            const sizeSelect =
                document.querySelector("#size");

            const selectedSize =
                sizeSelect?.value || "";

            const quantityElement =
                document.querySelector(
                    ".quantity-control span"
                );

            const quantity =
                Number(
                    quantityElement?.textContent
                ) || 1;

            const product = {

                id: productName
                    .toLowerCase()
                    .replace(/\s+/g, "-"),

                name: productName,

                price: price,

                size: selectedSize,

                quantity: quantity

            };

            addToCart(product);

        }
    );
}


/* -----------------------------------------
   QUANTITY CONTROL
----------------------------------------- */

const quantityControl =
    document.querySelector(".quantity-control");

if (quantityControl) {

    const buttons =
        quantityControl.querySelectorAll("button");

    const quantityDisplay =
        quantityControl.querySelector("span");

    let quantity = 1;


    if (buttons.length >= 2) {

        /* MINUS */

        buttons[0].addEventListener(
            "click",
            () => {

                if (quantity > 1) {
                    quantity--;
                }

                quantityDisplay.textContent =
                    quantity;
            }
        );


        /* PLUS */

        buttons[1].addEventListener(
            "click",
            () => {

                quantity++;

                quantityDisplay.textContent =
                    quantity;
            }
        );

    }
}


/* -----------------------------------------
   CART LINK
----------------------------------------- */

const cartLinks =
    document.querySelectorAll(
        ".cart, .nav-cart"
    );

cartLinks.forEach((cartLink) => {

    cartLink.setAttribute(
        "href",
        "cart.html"
    );

});


/* -----------------------------------------
   INITIALIZE CART
----------------------------------------- */

updateCartCount();


/* -----------------------------------------
   CART MESSAGE STYLE
----------------------------------------- */

if (!document.getElementById(
    "xcothic-cart-style"
)) {

    const cartStyle =
        document.createElement("style");

    cartStyle.id =
        "xcothic-cart-style";

    cartStyle.textContent = `

        .cart-message {
            position: fixed;
            left: 50%;
            bottom: 30px;

            transform:
                translate(-50%, 20px);

            padding: 14px 22px;

            background: #082f72;
            color: #ffffff;

            font-family: "Inter", sans-serif;
            font-size: 11px;
            font-weight: 600;

            letter-spacing: 1px;

            opacity: 0;

            z-index: 9999;

            pointer-events: none;

            transition:
                opacity 0.25s ease,
                transform 0.25s ease;
        }


        .cart-message.show {

            opacity: 1;

            transform:
                translate(-50%, 0);

        }


        @media (max-width: 480px) {

            .cart-message {

                width: calc(100% - 30px);

                text-align: center;

                bottom: 20px;

            }

        }

    `;

    document.head.appendChild(cartStyle);
}