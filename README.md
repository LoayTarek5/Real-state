# E-commerce Website

This project is a full-stack Real-state website built with vanilla JavaScript for the frontend, Node.js with Express for the backend, and EJS as the templating engine. It features a responsive design, product catalog, shopping cart functionality, user authentication, and integrated payment processing.

## Features

1. **Product Catalog**: Browse through a variety of products with details like price, discounts, and images.
2. **Shopping Cart**: Add items to cart, update quantities, and remove items.
3. **Search Functionality**: Search for products with real-time results.
4. **User Authentication**: Register, log in, and manage your account using Passport.js for local authentication.
5. **Responsive Design**: Works on desktop and mobile devices.
6. **Checkout Process**: Integrated with Stripe for secure payment processing.
7. **Individual Product Pages**: Detailed view of each product with image gallery and add-to-cart functionality.
8. **Contact Page**: Allow users to get in touch.

## File Structure

### Frontend
- `items.js`: Handles product display, cart functionality, and local storage operations.
- `main.js`: Manages general page functionality, including sliders and newsletter sign-up.
- `shoppingCart.js`: Implements shopping cart page functionality and checkout process.
- `account.js`: Manages user account-related features.
- `header.js`: Controls header behavior, search functionality, and mega menu interactions.
- `contact.js`: Manages the contact page functionality.
- `itemPage.js`: Handles individual product page display and interactions.
- `products.js`: Manages the product listing page, including grid/list view toggling.
- `showCart.js`: Controls the cart preview functionality when hovering over the cart icon.

### Backend
- `server.js`: Main Express server file handling routes, authentication, and Stripe integration.
- `passport-config.js`: Configuration file for Passport.js (not provided, but referenced in the code).

### Views
- `login.ejs`: Template for the login page.
- `register.ejs`: Template for the user registration page.

## Technologies Used

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express.js
- Authentication: Passport.js with local strategy
- View Engine: EJS
- Payment Processing: Stripe
- Database: In-memory array (for demonstration purposes)

## Setup and Usage

1. Clone the repository to your local machine.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     SESSION_SECRET=your_session_secret
     STRIPE_PRIVATE_KEY=your_stripe_private_key
     SERVER_URL=http://localhost:3000
     ```
4. Start the server:
   ```
   npm start
   ```
5. Open `http://localhost:3000` in your browser to view the website.

## Main Backend Functions

- User Registration: Handles user registration with bcrypt for password hashing.
- User Authentication: Uses Passport.js for local authentication strategy.
- Session Management: Utilizes express-session for managing user sessions.
- Checkout Process: Integrates with Stripe API to handle payment processing.

## API Endpoints

- POST `/create-checkout-session`: Creates a Stripe checkout session for processing payments.
- GET `/success`: Renders a success page after successful authentication.
- GET/POST `/login`: Handles user login.
- GET/POST `/register`: Handles user registration.
- DELETE `/logout`: Logs out the current user.

## Authentication Pages

### Login Page (`login.ejs`)
- Provides a form for existing users to log in.
- Includes fields for email and password.
- Displays error messages for failed login attempts.
- Offers a link to the registration page for new users.

### Registration Page (`register.ejs`)
- Offers a form for new users to create an account.
- Includes fields for first name, last name, email, password, and password confirmation.
- Provides a link to the login page for existing users.

Both pages maintain the site's overall design, including the header with navigation and search functionality, and the footer with additional links and information.

## Security Features

- Password Hashing: Uses bcrypt to securely hash user passwords.
- CSRF Protection: Implements CSRF protection using csurf middleware.
- Session Security: Configures secure session settings.
- Environment Variables: Utilizes dotenv for managing sensitive configuration.

## Dependencies

Main dependencies include:
- express
- bcrypt
- passport
- express-flash
- express-session
- method-override
- ejs
- stripe

For a full list of dependencies, refer to the `package.json` file.

## Contributing

Contributions to improve the project are welcome. Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request with a description of your changes.

## License

[Add your chosen license here]