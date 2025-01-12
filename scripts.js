document.addEventListener('DOMContentLoaded', () => {
    // Parallax (Existing code)
    const heroSection = document.getElementById("hero");
    const heroImage = heroSection?.querySelector("img");

    if (heroSection && heroImage) {
        window.addEventListener("scroll", () => {
            let scrollPosition = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    } else {
        console.error("Hero section or image not found!");
    }

    // Product Details Logic
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productDetailsContainer = document.getElementById('product-details');

    const products = { // Sample product data (replace with your own)
        1: {
            name: 'Laptop X1',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
            description: 'A powerful and lightweight laptop for all your needs.',
            price: '$1299',
            variations: {
                color: ['Space Gray', 'Silver', 'Gold'],
                storage: ['256GB', '512GB', '1TB']
            }
        },
        2: {
            name: 'Wireless Headphones Pro',
            image: 'https://images.unsplash.com/photo-1505740420928-392183c6f208?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1915&q=80',
            description: 'Immersive sound with noise cancellation.',
            price: '$249',
            variations: {
                color: ['Black', 'White', 'Blue']
            }
        },
        // Add more products here
    };

    if (productId && products[productId]) {
        const product = products[productId];
        productDetailsContainer.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p>${product.description}</p>
                <p class="product-price">${product.price}</p>
                <div class="product-variations">
                    ${Object.keys(product.variations).map(variation => `
                        <div>
                            <label for="${variation}">${variation}:</label>
                            <select id="${variation}">
                                ${product.variations[variation].map(option => `<option value="${option}">${option}</option>`).join('')}
                            </select>
                        </div>
                    `).join('')}
                </div>
                <button>Add to Cart</button>
            </div>
        `;
    } else {
        productDetailsContainer.innerHTML = '<p>Product not found.</p>';
    }
});