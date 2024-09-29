const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const orderMessage = document.getElementById('order-message');
const mybtn = document.getElementById('confirm-order');
let cart = {}; // To store cart items

// Function to add event listeners to add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const itemName = button.getAttribute('data-item');
    const itemPrice = parseFloat(button.getAttribute('data-price'));

    // If item exists in the cart, increase its quantity
    if (cart[itemName]) {
      cart[itemName].quantity += 1;
    } else {
      cart[itemName] = { price: itemPrice, quantity: 1 };
    }

    // Update cart display
    updateCart();
  });
});

// Function to update the cart display
function updateCart() {
  cartItems.innerHTML = ''; // Clear current cart display
  let total = 0; // Reset total price

  // Loop through each item in the cart
  for (const [itemName, itemData] of Object.entries(cart)) {
    const li = document.createElement('li');

    // Display item name, quantity, and price (no remove button)
    li.innerText = `${itemName} - ${
      itemData.quantity
    } x $${itemData.price.toFixed(2)} = $${(
      itemData.quantity * itemData.price
    ).toFixed(2)}`;
    cartItems.appendChild(li);

    total += itemData.quantity * itemData.price; // Add to total price
  }

  totalPriceElement.innerText = total.toFixed(2); // Update total price display
}

// Event listener for the Confirm Order button
document.getElementById('confirm-order').addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    orderMessage.innerText =
      'Your cart is empty. Please add items before confirming.';
  } else {
    let orderDetails = 'Order confirmed! Thank you for your purchase.\n';
    for (const [itemName, itemData] of Object.entries(cart)) {
      orderDetails += `${itemName} - ${
        itemData.quantity
      } x $${itemData.price.toFixed(2)} = $${(
        itemData.quantity * itemData.price
      ).toFixed(2)}\n`;
    }
    orderDetails += `Total: $${totalPriceElement.innerText}`; // Include total price
    orderMessage.innerText = orderDetails;
    mybtn.innerText = ' Order Confirmed😍';
    mybtn.style.background = 'linear-gradient(45deg, #ff7e5f, #feb47b)';
  }
  orderMessage.style.display = 'block'; // Show the confirmation message
});
