/* ==================================================
   XCOTHIC
   MAIN SCRIPT
================================================== */


/* ==================================================
   ELEMENTS
================================================== */

const accountModal =
    document.getElementById("accountModal");

const openLogin =
    document.getElementById("openLogin");

const navRegister =
    document.getElementById("navRegister");

const closeAccountModal =
    document.getElementById("closeAccountModal");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");

const loginFormElement =
    document.getElementById("loginFormElement");

const registerFormElement =
    document.getElementById("registerFormElement");

const authGuest =
    document.getElementById("authGuest");

const authUser =
    document.getElementById("authUser");

const userButton =
    document.getElementById("userButton");


/* ==================================================
   ACCOUNT STORAGE
================================================== */

const ACCOUNTS_KEY =
    "xcothic_accounts";

const CURRENT_ACCOUNT_KEY =
    "xcothic_current_account";


function getAccounts() {

    return JSON.parse(
        localStorage.getItem(ACCOUNTS_KEY)
    ) || [];

}


function saveAccounts(accounts) {

    localStorage.setItem(
        ACCOUNTS_KEY,
        JSON.stringify(accounts)
    );

}


/* ==================================================
   MODAL
================================================== */

function openAccountModal() {

    accountModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeModal() {

    accountModal.classList.remove("active");

    document.body.style.overflow = "";

}


openLogin.addEventListener(
    "click",
    function () {

        openAccountModal();

        showLoginForm();

    }
);


navRegister.addEventListener(
    "click",
    function () {

        openAccountModal();

        showRegisterForm();

    }
);


closeAccountModal.addEventListener(
    "click",
    closeModal
);


accountModal.addEventListener(
    "click",
    function (event) {

        if (event.target === accountModal) {

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            accountModal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);


/* ==================================================
   SWITCH LOGIN / REGISTER
================================================== */

function showLoginForm() {

    loginForm.classList.add("active");

    registerForm.classList.remove("active");

}


function showRegisterForm() {

    registerForm.classList.add("active");

    loginForm.classList.remove("active");

}


showRegister.addEventListener(
    "click",
    showRegisterForm
);


showLogin.addEventListener(
    "click",
    showLoginForm
);


/* ==================================================
   REGISTER
================================================== */

registerFormElement.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("registerName")
                .value
                .trim();


        const email =
            document
                .getElementById("registerEmail")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById("registerPassword")
                .value;


        const confirmPassword =
            document
                .getElementById("registerConfirmPassword")
                .value;


        /* CHECK PASSWORD */

        if (password !== confirmPassword) {

            alert("Password tidak sama.");

            return;

        }


        /* PASSWORD MINIMUM */

        if (password.length < 6) {

            alert(
                "Password minimal 6 karakter."
            );

            return;

        }


        /* GET ACCOUNTS */

        const accounts =
            getAccounts();


        /* CHECK EMAIL */

        const existingAccount =
            accounts.find(
                account =>
                    account.email === email
            );


        if (existingAccount) {

            alert(
                "Email sudah terdaftar."
            );

            return;

        }


        /* CREATE ACCOUNT */

        const newAccount = {

            id:
                Date.now(),

            name:
                name,

            email:
                email,

            password:
                password,

            createdAt:
                new Date().toISOString()

        };


        accounts.push(newAccount);


        saveAccounts(accounts);


        /* AUTO LOGIN */

        localStorage.setItem(
            CURRENT_ACCOUNT_KEY,
            email
        );


        alert(
            "Akun berhasil dibuat."
        );


        registerFormElement.reset();


        closeModal();


        updateNavbarAccount();

    }
);


/* ==================================================
   LOGIN
================================================== */

loginFormElement.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        const accounts =
            getAccounts();


        const account =
            accounts.find(
                item =>
                    item.email === email &&
                    item.password === password
            );


        if (!account) {

            alert(
                "Email atau password salah."
            );

            return;

        }


        /* SAVE CURRENT ACCOUNT */

        localStorage.setItem(
            CURRENT_ACCOUNT_KEY,
            account.email
        );


        alert(
            "Login berhasil. Selamat datang, " +
            account.name + "!"
        );


        loginFormElement.reset();


        closeModal();


        updateNavbarAccount();

    }
);


/* ==================================================
   NAVBAR ACCOUNT STATE
================================================== */

function updateNavbarAccount() {

    const currentAccount =
        localStorage.getItem(
            CURRENT_ACCOUNT_KEY
        );


    if (currentAccount) {

        authGuest.style.display = "none";

        authUser.classList.add("active");

    } else {

        authGuest.style.display = "flex";

        authUser.classList.remove("active");

    }

}


/* ==================================================
   USER ICON
================================================== */

userButton.addEventListener(
    "click",
    function () {

        const currentAccount =
            localStorage.getItem(
                CURRENT_ACCOUNT_KEY
            );


        if (!currentAccount) {

            return;

        }


        const accounts =
            getAccounts();


        const account =
            accounts.find(
                item =>
                    item.email === currentAccount
            );


        if (!account) {

            return;

        }


        const logout =
            confirm(
                "Login sebagai " +
                account.name +
                ".\n\nKlik OK untuk logout."
            );


        if (logout) {

            localStorage.removeItem(
                CURRENT_ACCOUNT_KEY
            );

            updateNavbarAccount();

        }

    }
);


/* ==================================================
   SEARCH
================================================== */

const navSearch =
    document.getElementById("navSearch");


navSearch.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Enter") {

            return;

        }


        const keyword =
            navSearch.value
                .trim()
                .toLowerCase();


        if (!keyword) {

            return;

        }


        const products =
            document.querySelectorAll(
                ".product-card"
            );


        let found = false;


        products.forEach(
            function (product) {

                const text =
                    product.textContent
                        .toLowerCase();


                if (text.includes(keyword)) {

                    product.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    found = true;

                }

            }
        );


        if (!found) {

            alert(
                "Produk \"" +
                keyword +
                "\" belum ditemukan."
            );

        }

    }
);


/* ==================================================
   CART
================================================== */

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    const cart =
        JSON.parse(
            localStorage.getItem(
                "xcothic_cart"
            )
        ) || [];


    let totalItems = 0;


    cart.forEach(
        function (item) {

            totalItems +=
                Number(item.quantity) || 0;

        }
    );


    cartCount.textContent =
        totalItems;

}


/* ==================================================
   INITIALIZE
================================================== */

updateNavbarAccount();

updateCartCount();