
window.onload = function() {

    // Reads the last 4 digits saved by pay.js
    var last4 = sessionStorage.getItem("last4") || "????";

    // Creates and adds the masked card number
    var billed = document.createElement("h2");
    billed.textContent = "**** **** **** " + last4;
    document.querySelector(".success-box").appendChild(billed);

    // Clears last4 from sessionStorage 
    sessionStorage.removeItem("last4");
};