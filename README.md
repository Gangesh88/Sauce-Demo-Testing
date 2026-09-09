Hello,

This is an end-to-end automated test suite for the Sauce Demo e-commerce application, built using Playwright and JavaScript.

Repository Structure
```
├── pages/                  # Page Object Model classes (Locators & Actions)
│   ├── Blog.js
|   ├── Cart.js
│   ├── CheckoutPage.js
│   ├── Products.js
│   ├── SearchBox.js
│   └── SignUp.js
├── tests/                  # Test specification files (.spec.js)
│   ├── Blog.spec.js
│   ├── BuyAndCheckout.spec.js
│   ├── SignUp.spec.js
│   ├── SocialMedia.spec.js
│   └── SoldOutProducts.spec.js
├── Test-Data/              # JSON/Fixture files for data-driven testing
│   ├── Card_Details.json
│   ├── Signup_Data.json
│   ├── address_details.json
│   ├── invalid_data.json
│   └── valid_data.json
├── playwright.config.js    # Playwright configuration file
├── .gitattributes          # Line ending normalization (LF)
├── .gitignore
├── package.json
└── README.md
```
