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

}