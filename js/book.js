






// Array of books to display in the home page.
var books = [
    {
        title: "Minute Cryptic",
        description: "A puzzle book to really test your critical thinking and attention to detail! Each day find a new cryptic clue to uncover",
        price: 13.59,
        image: "images/cryptic.png"
    },
    {
        title: "Six of Crows",
        description: "Six of Crows by Leigh Bardugo is a high-stakes YA fantasy heist novel focusing on six dangerous outcasts in the bustling city of Ketterdam. Criminal prodigy Kaz Brekker is offered a chance at an impossible heist that could make him rich, but he requires a specialized crew—a spy, a convict, a sharpshooter, a runaway, and a Heartrender—to survive.",
        price: 12.02,
        image: "images/crows.png"
    },
    {
        title: "Invincible Compendium 3",
        description: "The final chapter in Mark Grayson’s Journey! Follow through in the final Compendium.",
        price: 43.96,
        image: "images/invincible.png"
    },
    {
        title: "The Poppy War",
        description: "The Poppy War by R.F. Kuang is a dark, military fantasy inspired by 20th-century Chinese history, following Rin, a war orphan who aces a national test to enter an elite military academy. She discovers a lethal aptitude for shamanism and must harness forbidden godly powers as a brutal war threatens her nation.",
        price: 15.00,
        image: "images/poppy.png"
    },

]


window.onload = function() {

    // Gets the container element from the page
    var grid = document.getElementById("container");

    // Loops through every book in the array
    books.forEach(function(book) {

        // Creates a card element for each book
        var card = document.createElement("div");
        card.className = "card";

        // Fills the card with the book's data
        card.innerHTML =
            '<img src="' + book.image + '" alt="' + book.title + '">' +
            '<div class="card-info">' +
                '<h2>' + book.title + '</h2>' +
                '<p>' + book.description + '</p>' +
                '<h3>£' + book.price.toFixed(2) + '</h3>' +
                '<button class="pay-btn">Add to Cart</button>' +
            '</div>';
        
        // Attaches addToCart to the right book's button
    card.querySelector(".pay-btn").addEventListener("click", function() {
        addToCart(book);
    });

            

        // Adds the card into the grid
        grid.appendChild(card);
    });


    
};




// Updates the cart counter on the button
function updateCartCount() {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    var total = 0;
    cart.forEach(function(item) {
        total += item.quantity;
    });
    document.getElementById("cart-count").textContent = total;
}





// Adds a book to the cart in sessionStorage
function addToCart(book) {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Checks if the book is already in the cart
    var existing = cart.find(function(item) {
        return item.title === book.title;
    });

    if (existing) {
        // Increases quantity if already there
        existing.quantity += 1;
    } else {
        // Adds new book with quantity 1
        cart.push({ title: book.title, price: book.price, quantity: 1 });
    }

    // Saves the updated cart
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Refreshes the counter
    updateCartCount();





}



// Whenever page first loads, cart quantity is displayed.
updateCartCount();