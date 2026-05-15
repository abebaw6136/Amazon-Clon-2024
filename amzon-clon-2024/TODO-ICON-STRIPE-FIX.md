# Icon & Stripe Fix - Approved Plan

Status: Implementing step-by-step.

1. [x] Create .env with REACT_APP_STRIPE_PUBLISHABLE_KEY

2. [x] Update public/index.html favicon href + .ico
3. [x] Update public/manifest.json icons to Amazon favicon
4. [x] Stripe Elements wrapper already in Router.jsx
5. [x] functions/index.js /payment/create good
6. [x] Stripe deps already installed
7. [x] Test: cd Amazon-Clon-2024 && npm start (restart dev server to load .env + icons), replace Stripe key, test payment
8. [x] Fixed Payment.jsx ESLint/Firestore compat syntax
9. [ ] firebase functions:config:set stripe.key="sk_test_your_secret_key" && firebase deploy --only functions
10. [ ] Mark complete
