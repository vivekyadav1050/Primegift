# PrimeGift Frontend

> A modern and responsive React frontend for **PrimeGift**, a digital gift voucher platform that helps users discover and purchase branded gift cards.

**Live Website:** https://www.primegift.in

**GitHub:** https://github.com/vivekyadav1050/Primegift

---

## About PrimeGift

PrimeGift is a digital gift voucher platform designed to make discovering and purchasing branded gift cards simple and convenient.

The frontend provides a responsive shopping experience where users can browse gift cards, explore categories, search for products, view voucher details, and proceed through the purchase flow.

The application communicates with a Node.js and Express backend through REST APIs.

---

## Features

### User

* User Registration
* User Login
* JWT-based Authentication
* Profile Management
* Secure Logout

### Gift Cards

* Browse Gift Cards
* Browse by Category
* Search Products
* Product Details
* Brand Information
* Offers and Discounts

### Orders

* Create Orders
* Order History
* Order Details
* Voucher Status
* Transaction Status

### UI & Experience

* Responsive Design
* Mobile-friendly Interface
* Reusable React Components
* Clean Product Cards
* Category-based Navigation
* Responsive layouts for desktop and mobile

---

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

### Libraries

* React Router
* Axios

### Authentication

* JWT
* Local Storage

### Deployment

* Vercel
* GitHub

---

## Architecture

```text
                    PrimeGift Frontend
                           │
                           ▼
                    React + Vite
                           │
              ┌────────────┴────────────┐
              │                         │
        React Components           React Router
              │                         │
              └────────────┬────────────┘
                           │
                         Axios
                           │
                      REST APIs
                           │
                           ▼
                Node.js + Express Backend
                           │
                 ┌─────────┴─────────┐
                 │                   │
              MongoDB        Third-Party Services
                                     │
                              Voucher Aggregator
```

---

## Project Structure

```text
primegift/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── Services/
│   ├── Styles/
│   ├── context/
│   ├── Content/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## Folder Description

### `components/`

Contains reusable UI components used throughout the application, such as navigation, product cards, category sections, and other interface elements.

### `pages/`

Contains application pages such as:

* Home
* Login
* Register
* OTP
* Product Details
* Orders
* Profile

### `Services/`

Contains frontend API services responsible for communicating with the backend REST APIs.

### `Styles/`

Contains reusable and page-specific CSS styles.

### `context/`

Contains React Context used for managing application-level state.

### `assets/`

Contains images, logos, icons, and other frontend assets.

---

## Application Flow

```text
User
  │
  ▼
Homepage
  │
  ▼
Browse Gift Cards
  │
  ▼
Select Category / Brand
  │
  ▼
Product Details
  │
  ▼
Login / Authentication
  │
  ▼
Create Order
  │
  ▼
Payment
  │
  ▼
Order Confirmation
  │
  ▼
Voucher Delivery
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/vivekyadav1050/Primegift.git
```

### 2. Navigate to Frontend

```bash
cd Primegift/primegift
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will start on the Vite development server.

---

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Environment Variables

If the frontend requires environment variables, create a `.env` file inside the `primegift` directory.

Example:

```env
VITE_API_BASE_URL=your_backend_api_url
```

Do not commit `.env` files or private API keys to GitHub.

---

## Deployment

The frontend can be deployed using Vercel or any static hosting platform that supports React/Vite applications.

```text
GitHub Repository
       │
       ▼
   Build Process
       │
       ▼
React + Vite
       │
       ▼
Production Website
```

**Live Website:** https://www.primegift.in

---

## Learning Outcomes

Working on PrimeGift provided practical experience with:

* React.js
* Vite
* Component-based UI development
* React Router
* REST API integration
* Axios
* JWT authentication
* Responsive web design
* State management
* Git and GitHub
* Production deployment
* Frontend-backend integration

---

## Future Improvements

* Improved product search and filtering
* Personalized gift recommendations
* Better sorting and category discovery
* Progressive Web App support
* Performance optimization
* Accessibility improvements
* Automated frontend testing
* Enhanced mobile experience
* Analytics and user insights

---

## Developer

**Vivek Yadav**

GitHub: https://github.com/vivekyadav1050

---

## License

This project is shared for portfolio and educational purposes.
