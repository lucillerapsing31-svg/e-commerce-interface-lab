class Product {
    constructor(id, name, price, image, description = "", category = "") {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category = category;
    }
}

const products = [

    new Product(1, "Wireless Headphones", 59.99, "https://placehold.co/300x200?text=Headphones", "Premium wireless headphones with noise cancellation", "electronics"),
    new Product(2, "Smart Watch", 129.99, "https://placehold.co/300x200?text=Smart+Watch", "Fitness tracker with heart rate monitor", "electronics"),
    new Product(5, "LED Desk Lamp", 59.99, "https://placehold.co/300x200?text=Lamp", "Adjustable brightness desk lamp", "electronics"),
    new Product(6, "Bluetooth Speaker", 45.00, "https://placehold.co/300x200?text=Speaker", "Portable waterproof speaker", "electronics"),
    new Product(7, "Fitness Tracker", 89.00, "https://placehold.co/300x200?text=Fitness", "Activity and sleep tracker", "electronics"),
    new Product(8, "Tablet Stand", 29.00, "https://placehold.co/300x200?text=Stand", "Adjustable aluminum tablet stand", "electronics"),
    new Product(10, "Wireless Mouse", 24.99, "https://placehold.co/300x200?text=Mouse", "Ergonomic wireless mouse", "electronics"),
    new Product(12, "Wireless Earbuds", 59.99, "https://placehold.co/300x200?text=Earbuds", "True wireless earbuds with charging case", "electronics"),
    
    new Product(13, "Cotton T-Shirt", 19.99, "https://placehold.co/300x200?text=T-Shirt", "Soft cotton t-shirt, available in multiple colors", "clothing"),
    new Product(14, "Denim Jeans", 49.99, "https://placehold.co/300x200?text=Jeans", "Classic denim jeans with stretch fit", "clothing"),
    new Product(15, "Summer Dress", 39.99, "https://placehold.co/300x200?text=Dress", "Lightweight floral summer dress", "clothing"),
    new Product(9, "Hooded Sweatshirt", 41.99, "https://placehold.co/300x200?text=Sweatshirt", "Comfortable cotton blend hoodie", "clothing"),
    
    new Product(16, "JavaScript Guide", 34.99, "https://placehold.co/300x200?text=JS+Book", "Complete guide to modern JavaScript", "books"),
    new Product(17, "Web Design Basics", 29.99, "https://placehold.co/300x200?text=Web+Book", "Learn HTML, CSS, and responsive design", "books"),
    new Product(18, "Python Programming", 39.99, "https://placehold.co/300x200?text=Python+Book", "Introduction to Python programming", "books"),
    
    new Product(3, "Slim Leather Wallet", 39.99, "https://placehold.co/300x200?text=Wallet", "Genuine leather wallet with RFID protection", "accessories"),
    new Product(11, "Phone Case", 19.99, "https://placehold.co/300x200?text=Case", "Shockproof phone case", "accessories"),
    
    new Product(4, "Ceramic Travel Mug", 24.99, "https://placehold.co/300x200?text=Mug", "Double-wall insulated ceramic mug", "kitchen")
];

let cart = [];

let currentUser = {
    name: "Lucille Rapsing",
    email: "lucille@example.com",
    orderHistory: [
        { date: "March 12, 2025", items: ["Slim Leather Wallet", "Ceramic Travel Mug"], total: 64.98 },
        { date: "February 2, 2025", items: ["LED Desk Lamp", "Bluetooth Speaker"], total: 104.99 },
        { date: "January 15, 2025", items: ["Fitness Tracker", "Tablet Stand"], total: 118.00 },
        { date: "December 20, 2024", items: ["Hooded Sweatshirt", "Wireless Mouse"], total: 66.98 },
        { date: "November 5, 2024", items: ["Wireless Earbuds", "Phone Case"], total: 79.98 }
    ]
};

function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        currentUser = { ...currentUser, ...userData };
    }
}

function saveUser() {
    localStorage.setItem('currentUser', JSON.stringify({
        name: currentUser.name,
        email: currentUser.email,
        orderHistory: currentUser.orderHistory
    }));
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
    
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (productCard) {
        productCard.classList.add('fade-in');
        setTimeout(() => {
            productCard.classList.remove('fade-in');
        }, 500);
    }
    
    updateOrderSummary();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-success';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function createProductCard(product) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.setAttribute('data-product-id', product.id);
    
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    
    const title = document.createElement('h3');
    title.textContent = product.name;
    
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${product.price.toFixed(2)}`;
    
    const desc = document.createElement('p');
    desc.className = 'product-description';
    desc.textContent = product.description;
    
    const viewLink = document.createElement('a');
    viewLink.href = `detail.html?id=${product.id}`;
    viewLink.className = 'view-btn';
    viewLink.textContent = 'View details';
    
    const addBtn = document.createElement('button');
    addBtn.className = 'add-to-cart-btn';
    addBtn.textContent = 'Add to Cart';
    addBtn.setAttribute('data-id', product.id);
    
    article.appendChild(img);
    article.appendChild(title);
    article.appendChild(price);
    article.appendChild(desc);
    article.appendChild(viewLink);
    article.appendChild(addBtn);
    
    return article;
}

function getCategoryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
}

function filterProductsByCategory(productsToFilter, category) {
    if (!category || category === 'all') return productsToFilter;
    if (category === 'sale') {
        return productsToFilter.filter(p => p.price < 30);
    }
    return productsToFilter.filter(product => product.category === category);
}

function updatePageTitle(category) {
    const titleElement = document.getElementById('page-title');
    if (titleElement) {
        const categoryNames = {
            'clothing': 'Clothing Collection',
            'electronics': 'Electronics',
            'books': 'Books',
            'accessories': 'Accessories',
            'kitchen': 'Kitchen Essentials',
            'sale': 'Sale Items - Up to 40% Off'
        };
        titleElement.textContent = categoryNames[category] || 'All Products';
    }
}

function filterProducts() {
    const productGrid = document.querySelector('.product-grid:not(#featured-products):not(#discounted-products)');
    if (!productGrid) return;
    
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.value);
    
    const selectedPrice = document.querySelector('input[name="price"]:checked');
    let priceRange = selectedPrice ? selectedPrice.value : 'all';
    
    let filteredProducts = [...products];
    
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }
    
    if (priceRange !== 'all') {
        filteredProducts = filteredProducts.filter(product => {
            if (priceRange === 'under30') {
                return product.price < 30;
            } else if (priceRange === '30-60') {
                return product.price >= 30 && product.price <= 60;
            } else if (priceRange === 'over60') {
                return product.price > 60;
            }
            return true;
        });
    }
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<div style="text-align: center; padding: 40px;">No products match your filters</div>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }
    
    showNotification(`Showing ${filteredProducts.length} products`);
}

function resetFilters() {
    document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
    
    const allPrice = document.querySelector('input[name="price"][value="all"]');
    if (allPrice) allPrice.checked = true;
    
    const urlCategory = getCategoryFromURL();
    if (urlCategory) {
        const filtered = filterProductsByCategory(products, urlCategory);
        renderFilteredProducts(filtered);
        updatePageTitle(urlCategory);
    } else {
        renderProductsPage();
    }
    showNotification('Filters reset');
}

function renderFilteredProducts(filteredProducts) {
    const productGrid = document.querySelector('.product-grid:not(#featured-products):not(#discounted-products)');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<div style="text-align: center; padding: 40px;">No products found in this category</div>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }
}

function setupFilterEvents() {
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterProducts);
    }
    
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
}

function renderProductsPage() {
    const productGrid = document.querySelector('.product-grid:not(#featured-products):not(#discounted-products)');
    if (!productGrid) return false;
    
    const urlCategory = getCategoryFromURL();
    
    if (urlCategory && urlCategory !== 'all') {
        const filteredProducts = filterProductsByCategory(products, urlCategory);
        updatePageTitle(urlCategory);
        
        productGrid.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
        
        if (urlCategory !== 'sale') {
            const categoryCheckbox = document.querySelector(`input[name="category"][value="${urlCategory}"]`);
            if (categoryCheckbox) {
                categoryCheckbox.checked = true;
            }
        }
        
        console.log(`Rendered ${filteredProducts.length} products for category: ${urlCategory}`);
    } else {

        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = 'All Products';
        }
        
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
        
        document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
        
        const allPrice = document.querySelector('input[name="price"][value="all"]');
        if (allPrice) allPrice.checked = true;
        
        console.log(`Rendered ${products.length} products on products page`);
    }
    
    return true;
}

function renderLandingPage() {
    const featuredGrid = document.getElementById('featured-products');
    const discountedGrid = document.getElementById('discounted-products');
    
    let rendered = false;
    
    if (featuredGrid) {
        console.log("Rendering featured products...");
        featuredGrid.innerHTML = '';

        const featuredProducts = products.filter(p => 
            p.category === 'electronics' || p.category === 'clothing'
        ).slice(0, 6);
        featuredProducts.forEach(product => {
            const productCard = createProductCard(product);
            featuredGrid.appendChild(productCard);
        });
        rendered = true;
    }
    
    if (discountedGrid) {
        console.log("Rendering discounted products...");
        discountedGrid.innerHTML = '';

        const discountedProducts = products.filter(p => 
            p.category === 'accessories' || p.category === 'kitchen' || p.category === 'books'
        ).slice(0, 6);
        discountedProducts.forEach(product => {
            const productCard = createProductCard(product);
            discountedGrid.appendChild(productCard);
        });
        rendered = true;
    }
    
    if (rendered) {
        console.log("Rendered products on landing page");
    }
    
    return rendered;
}

function renderCartPage() {
    const cartList = document.querySelector('.cart-list');
    if (!cartList) return;
    
    if (cart.length === 0) {
        cartList.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><a href="products.html" class="shop-now-btn">Shop Now</a></div>';
        const subtotalSpan = document.querySelector('.cart-summary .price');
        if (subtotalSpan) subtotalSpan.textContent = '0.00';
        updateOrderSummary();
        return;
    }
    
    cartList.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const li = document.createElement('li');
        li.className = 'cart-item';
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'cart-item-details';
        
        const h3 = document.createElement('h3');
        h3.textContent = item.name;
        
        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = `$${item.price.toFixed(2)}`;
        
        detailsDiv.appendChild(h3);
        detailsDiv.appendChild(price);
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'cart-item-actions';
        
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'quantity-control';
        
        const label = document.createElement('label');
        label.textContent = 'Qty:';
        
        const input = document.createElement('input');
        input.type = 'number';
        input.value = item.quantity;
        input.min = '1';
        input.addEventListener('change', (e) => {
            const newQty = parseInt(e.target.value);
            if (newQty <= 0) {
                cart = cart.filter(i => i.id !== item.id);
            } else {
                item.quantity = newQty;
            }
            saveCart();
            renderCartPage();
            updateCartCount();
            updateOrderSummary();
        });
        
        quantityDiv.appendChild(label);
        quantityDiv.appendChild(input);
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            cart = cart.filter(i => i.id !== item.id);
            saveCart();
            renderCartPage();
            updateCartCount();
            updateOrderSummary();
        });
        
        actionsDiv.appendChild(quantityDiv);
        actionsDiv.appendChild(removeBtn);
        
        li.appendChild(img);
        li.appendChild(detailsDiv);
        li.appendChild(actionsDiv);
        
        cartList.appendChild(li);
    });
    
    const subtotalSpan = document.querySelector('.cart-summary .price');
    if (subtotalSpan) subtotalSpan.textContent = subtotal.toFixed(2);
    
    updateOrderSummary();
}

function updateOrderSummary() {
    const orderItemsDiv = document.getElementById('order-items-list');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + shipping;
    
    const itemsSpan = document.querySelector('.order-summary .items-total');
    const shippingSpan = document.querySelector('.order-summary .shipping-cost');
    const totalSpan = document.querySelector('.order-summary .total-amount');
    
    if (itemsSpan) itemsSpan.textContent = subtotal.toFixed(2);
    if (shippingSpan) shippingSpan.textContent = shipping.toFixed(2);
    if (totalSpan) totalSpan.textContent = total.toFixed(2);
    
    if (orderItemsDiv) {
        if (cart.length === 0) {
            orderItemsDiv.innerHTML = '<p style="color: #666;">Your cart is empty</p>';
        } else {
            let itemsHtml = '<div style="margin-bottom: 10px;"><strong>Items:</strong></div>';
            itemsHtml += '<ul style="list-style: none; padding-left: 0; margin-bottom: 15px;">';
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                itemsHtml += `
                    <li style="margin-bottom: 10px; padding: 8px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                        <span>${item.name} x ${item.quantity}</span>
                        <span style="color: #e67e22;">$${itemTotal.toFixed(2)}</span>
                    </li>
                `;
            });
            itemsHtml += '</ul>';
            orderItemsDiv.innerHTML = itemsHtml;
        }
    }
}

function setupEventDelegation() {
    document.body.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            e.preventDefault();
            const productId = addBtn.getAttribute('data-id');
            addToCart(productId);
        }
    });
}

function setupAccountPage() {
    const welcomeHeader = document.querySelector('header h1');
    if (welcomeHeader) {
        welcomeHeader.textContent = `Welcome back, ${currentUser.name}`;
    }
    
    const orderHistorySection = document.querySelector('.order-history');
    if (orderHistorySection) {
        orderHistorySection.innerHTML = '<h2>Recent Purchases</h2>';
        
        currentUser.orderHistory.forEach((order, index) => {
            const details = document.createElement('details');
            
            const summary = document.createElement('summary');
            summary.innerHTML = `<strong>${order.date}</strong> - Total: $${order.total.toFixed(2)}`;
            
            const content = document.createElement('div');
            content.className = 'order-details';
            
            const itemsList = document.createElement('ul');
            itemsList.innerHTML = '<strong>Items:</strong>';
            order.items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                itemsList.appendChild(li);
            });
            
            const total = document.createElement('p');
            total.innerHTML = `<strong>Order Total:</strong> $${order.total.toFixed(2)}`;
            
            content.appendChild(itemsList);
            content.appendChild(total);
            
            details.appendChild(summary);
            details.appendChild(content);
            orderHistorySection.appendChild(details);
            
            summary.addEventListener('click', () => {
                content.style.animation = 'fadeIn 0.5s ease';
                setTimeout(() => {
                    content.style.animation = '';
                }, 500);
            });
        });
        
        if (currentUser.orderHistory.length === 0) {
            orderHistorySection.innerHTML += '<p>No orders yet. Start shopping!</p>';
        }
    }
}

function setupProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId && window.location.pathname.includes('detail.html')) {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            const title = document.querySelector('h1');
            const price = document.querySelector('.price');
            const img = document.querySelector('article img');
            const addBtn = document.querySelector('.add-to-cart-btn');
            
            if (title) title.textContent = product.name;
            if (price) price.textContent = `$${product.price.toFixed(2)}`;
            if (img) img.src = product.image;
            if (addBtn) addBtn.setAttribute('data-id', product.id);
        }
    }
}

function setupSignupForm() {
    const signupForm = document.querySelector('.signup-form');
    if (!signupForm) return;
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        let isValid = true;
        
        if (!fullname.value.trim()) {
            showFieldError(fullname, 'Full name is required');
            isValid = false;
        }
        
        if (!email.value.trim()) {
            showFieldError(email, 'Email is required');
            isValid = false;
        } else if (!email.value.includes('@')) {
            showFieldError(email, 'Please enter a valid email');
            isValid = false;
        }
        
        if (!password.value) {
            showFieldError(password, 'Password is required');
            isValid = false;
        } else if (password.value.length < 8) {
            showFieldError(password, 'Password must be at least 8 characters');
            isValid = false;
        }
        
        if (password.value !== confirmPassword.value) {
            showFieldError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }
        
        if (isValid) {
            currentUser.name = fullname.value.trim();
            currentUser.email = email.value.trim();
            saveUser();
            
            showNotification(`Account created successfully! Welcome, ${currentUser.name}!`);
            
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 2000);
        }
    });
}

function showFieldError(input, message) {
    input.classList.add('error');
    const errorMsg = document.createElement('span');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    errorMsg.style.color = '#e74c3c';
    errorMsg.style.fontSize = '0.85em';
    errorMsg.style.marginTop = '5px';
    errorMsg.style.display = 'block';
    input.parentNode.insertBefore(errorMsg, input.nextSibling);
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;
    
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const street = document.getElementById('street');
        const zip = document.getElementById('zip');
        
        let isValid = true;
        
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        if (!name.value.trim()) {
            showFieldError(name, 'Full name is required');
            isValid = false;
        }
        
        if (!street.value.trim()) {
            showFieldError(street, 'Street address is required');
            isValid = false;
        }
        
        if (!zip.value.trim()) {
            showFieldError(zip, 'ZIP code is required');
            isValid = false;
        } else if (!/^\d{5}$/.test(zip.value.trim())) {
            showFieldError(zip, 'Please enter a valid 5-digit ZIP code');
            isValid = false;
        }
        
        const paymentSelected = document.querySelector('input[name="payment"]:checked');
        if (!paymentSelected) {
            const paymentFieldset = document.querySelector('fieldset:last-of-type');
            showFieldError(paymentFieldset, 'Please select a payment method');
            isValid = false;
        }
        
        if (isValid) {
            const orderItems = cart.map(item => item.name);
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = 4.99;
            const total = subtotal + shipping;
            
            const today = new Date();
            const orderDate = today.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const newOrder = {
                date: orderDate,
                items: orderItems,
                total: total
            };
            
            currentUser.orderHistory.unshift(newOrder);
            
            saveUser();
            
            cart = [];
            saveCart();
            
            showNotification('Order placed successfully! Redirecting to your account...');
            
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 2000);
        }
    });
}

function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: highlightFade 0.5s ease;
        }
        
        @keyframes highlightFade {
            0% { background-color: rgba(230, 126, 34, 0.5); transform: scale(1); }
            100% { background-color: transparent; transform: scale(1); }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .notification-success {
            background-color: #27ae60;
        }
        
        .notification.fade-out {
            animation: fadeOut 0.3s ease forwards;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .error {
            border-color: #e74c3c !important;
            background-color: #fff5f5 !important;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.85em;
            margin-top: 5px;
        }
        
        .product-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        
        .product-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .product-card h3 {
            margin: 15px 0 10px;
            font-size: 1.2em;
        }
        
        .product-card .price {
            font-size: 1.3em;
            font-weight: bold;
            color: #e67e22;
            margin: 10px 0;
        }
        
        .product-description {
            font-size: 0.9em;
            color: #666;
            margin: 10px 0;
        }
        
        .add-to-cart-btn {
            background-color: #e67e22;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
            transition: background-color 0.3s;
        }
        
        .add-to-cart-btn:hover {
            background-color: #d35400;
        }
        
        .view-btn {
            display: inline-block;
            margin-top: 10px;
            color: #e67e22;
            text-decoration: none;
        }
        
        .empty-cart {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 10px;
        }
        
        .shop-now-btn {
            display: inline-block;
            background-color: #e67e22;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            margin-top: 10px;
        }
        
        .cart-item {
            display: flex;
            gap: 20px;
            padding: 20px;
            background: white;
            border-radius: 10px;
            margin-bottom: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .cart-item img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .cart-item-details {
            flex: 1;
        }
        
        .cart-item-actions {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        
        .quantity-control {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        
        .quantity-control input {
            width: 60px;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            text-align: center;
        }
        
        .remove-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
        }
        
        .remove-btn:hover {
            background-color: #c0392b;
        }
        
        .cart-summary {
            text-align: right;
            padding: 20px;
            background: white;
            border-radius: 10px;
            margin-top: 20px;
        }
        
        .checkout-btn {
            display: inline-block;
            background-color: #e67e22;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            margin-top: 10px;
        }
        
        #cart-count {
            background-color: #e67e22;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
            margin-left: 5px;
            display: none;
        }
        
        .order-details {
            margin-top: 10px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
            margin: 20px 0;
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded, initializing...");
    
    addStyles();
    loadCart();
    loadUser();
    
    const productsRendered = renderProductsPage();
    const landingRendered = renderLandingPage();
    
    if (!productsRendered && !landingRendered) {
        console.log("No product grid found on this page");
    }
    
    renderCartPage();
    setupEventDelegation();
    setupFilterEvents();
    setupAccountPage();
    setupProductDetail();
    setupSignupForm();
    setupCheckoutForm();
    updateCartCount();
    
    updateOrderSummary();
    
    console.log("Initialization complete");
});
