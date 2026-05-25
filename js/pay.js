// Runs when the page loads
window.onload = function() {
    displayCartSummary();
    document.getElementById("continue-btn").addEventListener("click", validateCard);
    // Clicking the clear button will remove all items from the cart incase of accident
    document.getElementById("clear").addEventListener("click", function() {
    sessionStorage.removeItem("cart");
    // This resets the cart list on the page without reloading
    document.getElementById("cart-items-list").innerHTML = "<li>No items in cart.</li>";
    document.getElementById("order-total").textContent = "£0.00";
    document.getElementById("cart-count").textContent = "0";
});
};

// Displays the cart items and total from sessionStorage
function displayCartSummary() {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    var list = document.getElementById("cart-items-list");
    var totalEl = document.getElementById("order-total");

    // Checks if the cart is empty
    if (cart.length === 0) {
        list.innerHTML = "<li>No items in cart.</li>";
        return;
    }

    var total = 0;

    // Loops through each cart item and displays it
    cart.forEach(function(item) {
        var li = document.createElement("li");
        li.textContent = item.title + " x" + item.quantity + " — £" + (item.price * item.quantity).toFixed(2);
        list.appendChild(li);
        total += item.price * item.quantity;
    });

    // Shows the final total
    totalEl.textContent = "£" + total.toFixed(2);
    sessionStorage.setItem("orderTotal", total.toFixed(2));
}

// Validates all card inputs before sending to the server
function validateCard() {
    var cardNumber = document.getElementById("card-number").value.trim();
    var expMonth   = parseInt(document.getElementById("exp-month").value);
    var expYear    = parseInt(document.getElementById("exp-year").value);
    var cvv        = document.getElementById("cvv").value.trim();
    var errorMsg   = document.getElementById("error-msg");

    // Checks the card is exactly 16 digits
    if (!/^\d{16}$/.test(cardNumber)) {
        errorMsg.textContent = "Card number must be exactly 16 digits.";
        return;
    }

    // Checks the card starts with 51-55 for Mastercard
    var prefix = parseInt(cardNumber.substring(0, 2));
    if (prefix < 51 || prefix > 55) {
        errorMsg.textContent = "Only Mastercard accepted (must start with 51-55).";
        return;
    }

    // Checks expiry has been selected
    if (!expMonth || !expYear) {
        errorMsg.textContent = "Please select an expiry date.";
        return;
    }

    // Checks the card is not expired
    var today        = new Date();
    var currentYear  = today.getFullYear();
    var currentMonth = today.getMonth() + 1;

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        errorMsg.textContent = "Your card has expired.";
        return;
    }

    // Checks CVV is 3 or 4 digits
    if (!/^\d{3,4}$/.test(cvv)) {
        errorMsg.textContent = "Security code must be 3 or 4 digits.";
        return;
    }

    // Clears any previous error and sends to server
    errorMsg.textContent = "";
    sendToServer(cardNumber, expMonth, expYear, cvv);
}

// Sends the card data to the payment API
function sendToServer(cardNumber, expMonth, expYear, cvv) {
    // This builds the JSON the server expects
    var data = {
        master_card: parseInt(cardNumber),
        exp_year:    expYear,
        exp_month:   expMonth,
        cvv_code:    cvv
    };

    // Sends a POST request to the payment API
    fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        // Checks if the server returned an error
        if (!response.ok) {
            return response.json().then(function(err) {
                throw new Error(err.message || "Server error.");
            });
        }
        return response.json();
    })
    .then(function(result) {
        // Saves the last 4 digits for the success page
        sessionStorage.setItem("last4", cardNumber.slice(-4));

        // Clears cart on purchase
        sessionStorage.removeItem("cart");

        window.location.href = "success.html";
    })
    .catch(function(error) {
        // Displays any server error to the user
        document.getElementById("error-msg").textContent = error.message;
    });
}





