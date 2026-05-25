# sareads
Project for MMU SWE year 1 coursework




Sareads — Online Bookshop with Payment Gateway
A three-page vanilla HTML/CSS/JS bookshop website built as university coursework. Features a dynamic book catalogue, a sessionStorage-powered shopping cart, full Mastercard validation, and a live payment API integration — all without any libraries or frameworks.
Pages
PageDescriptionindex.htmlBook catalogue with dynamic card rendering and cartpay.htmlPayment form with full client-side validationsuccess.htmlOrder confirmation with masked card number
Features
Book Catalogue (index.html + book.js)

Books rendered dynamically from a JS array using forEach and createElement — no hardcoded HTML cards
"Add to Cart" button on each card adds items to sessionStorage
Quantity tracking: adding the same book increments its quantity rather than duplicating it
Live cart counter in the navbar updates on every add

Payment Page (pay.html + pay.js)

Cart summary pulled from sessionStorage and rendered on load
Order total calculated and displayed dynamically
Clear cart button resets both storage and the displayed list instantly
Full card validation before any request is made:

Card number must be exactly 16 digits
Must be a Mastercard (prefix 51–55)
Expiry date must not be in the past
CVV must be 3 or 4 digits


Valid submissions POST { master_card, exp_year, exp_month, cvv_code } as JSON to the MMU payment API
Server errors caught and displayed inline without breaking the page

Success Page (success.html + success.js)

Reads the last 4 digits of the card number saved to sessionStorage by pay.js
Displays masked confirmation: **** **** **** XXXX
Clears last4 from storage after display

Tech Stack

Vanilla HTML5, CSS3, JavaScript — no frameworks, no libraries
Fetch API for the payment POST request
sessionStorage for cart state across pages
CSS Flexbox for responsive two-column (desktop) / one-column (mobile) layout

Project Structure
├── index.html
├── pay.html
├── success.html
├── js/
│   ├── book.js        # Dynamic book rendering and cart logic
│   ├── pay.js         # Cart display, card validation, API fetch
│   └── success.js     # Masked card confirmation display
├── style/
│   └── style.css      # All styles including responsive breakpoints
└── images/            # Book covers and logo assets
API
Payment endpoint: POST https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard
Request body:
json{
  "master_card": 5112345678901234,
  "exp_year": 2027,
  "exp_month": 6,
  "cvv_code": "123"
}
Success response: { "message": "Thank you for your payment." }
Skills Demonstrated

DOM manipulation without frameworks (createElement, appendChild, querySelector)
Client-side form validation with regex and date logic
Fetch API with .then() chaining and .catch() error handling
Cross-page state management with sessionStorage
Responsive CSS layout with media queries
Separation of concerns across three JS files
