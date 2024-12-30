// Abrir o cerrar la barra lateral cuando se hace clic en el icono de hamburguesa
document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
});

// Cerrar la barra lateral cuando se hace clic en cualquier enlace del menú lateral
const menuItems = document.querySelectorAll('.sidebar ul li a');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('active');
    });
});

// Cerrar la barra lateral si se hace clic fuera de ella
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger-menu');
    
    // Si el clic fue fuera del sidebar y del hamburger, cerramos el sidebar
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Carrito de compras
const cart = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');
const cartList = document.querySelector('#cart ul');
const cartIcon = document.querySelector('.cart-icon');
const cancelButton = document.querySelector('.cancel-purchase');

// Cargar los productos del carrito desde localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito
function updateCart() {
    cartCount.textContent = cartItems.length; // Actualiza el contador de productos

    // Renderiza los productos dentro del carrito
    cartList.innerHTML = ''; // Limpia la lista del carrito antes de actualizarla
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price}</span>
        `;
        cartList.appendChild(li);
    });

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Función para añadir un producto al carrito
function addToCart(product) {
    cartItems.push(product);
    updateCart(); // Actualiza el carrito después de añadir el producto
}

// Añadir el evento de añadir al carrito a cada botón
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = {
            name: e.target.parentElement.querySelector('h3').textContent,
            price: e.target.parentElement.querySelector('.precio').textContent.replace('$', ''),
        };
        addToCart(product);
    });
});

// Mostrar el carrito al hacer clic en el ícono del carrito
cartIcon.addEventListener('click', () => {
    cart.classList.toggle('active'); // Usa toggle para abrir/cerrar el carrito
});

// Función para cancelar la compra (vaciar el carrito y resetear el contador)
function cancelPurchase() {
    cartItems = []; // Vacía el carrito
    updateCart(); // Actualiza la interfaz
    cart.classList.remove('active'); // Cierra el carrito
}

// Evento para cerrar el carrito cuando se hace clic en "Cancelar compra"
cancelButton.addEventListener('click', cancelPurchase);

// Cerrar el carrito si se hace clic fuera de él
document.addEventListener('click', function(event) {
    if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
        cart.classList.remove('active');
    }
});

// Cerrar el carrito si se hace clic fuera de él (al hacer clic en la barra lateral también)
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger-menu');
    
    // Si el clic fue fuera del sidebar y del hamburger, cerramos el sidebar
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Función para manejar la visibilidad del carrito
function toggleCartVisibility() {
    cart.classList.toggle('active');
}





// Llamar a `updateCart()` para cargar los productos y actualizar el contador al cargar la página
document.addEventListener('DOMContentLoaded', updateCart);

// (Opcional) Eliminar los productos del carrito cuando se cierra la pestaña o se recarga la página
window.addEventListener('beforeunload', function() {
    
});
// Función para calcular el total del precio del carrito
function calculateTotal() {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
}

// Función para actualizar el carrito (modificada para incluir el total)
function updateCart() {
    cartCount.textContent = cartItems.length; // Actualiza el contador de productos

    // Renderiza los productos dentro del carrito
    cartList.innerHTML = ''; // Limpia la lista del carrito antes de actualizarla
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price}</span>
        `;
        cartList.appendChild(li);
    });

    // Calcula y muestra el total
    const total = calculateTotal();
    const totalElement = document.createElement('li');
    totalElement.classList.add('cart-total');
    totalElement.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
    cartList.appendChild(totalElement);

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}
