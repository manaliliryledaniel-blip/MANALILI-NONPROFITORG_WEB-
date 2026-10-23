# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Stripe donation checkout demo

The home page includes a one-time donation checkout built with
`@stripe/react-stripe-js` and `@stripe/stripe-js`. The demo securely sends card
details to Stripe to create a test PaymentMethod, then displays a simulated
receipt ID. It does **not** create a charge or send a donation.

### Set up the test payment screen

1. Install dependencies:

   ```sh
   npm install
   ```

2. In the Stripe Dashboard, copy a **test-mode publishable key** beginning
   with `pk_test_`. Never put a Stripe secret key (`sk_...`) in this frontend.

3. Create `.env.local` in the project root (the file is ignored by Git) and add:

   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_test_key
   ```

   `.env.example` shows the expected variable name and placeholder.

4. Start or restart the Vite server:

   ```sh
   npm run dev
   ```

5. Scroll to the donation checkout. Use Stripe test card `4242 4242 4242 4242`,
   any future expiry date, and any CVC to preview the validation and simulated
   success screen. Use other Stripe test card numbers to preview validation
   errors.

The success message and receipt ID are only for a UI demonstration.
`createPaymentMethod` does not charge the card. For live donations, add a
trusted backend that creates a Stripe PaymentIntent for the selected amount,
then confirm it in the browser with `stripe.confirmCardPayment` or use
`PaymentElement` with `stripe.confirmPayment`. Do not accept the amount as
trusted from the browser, and do not expose a secret key in Vite environment
variables.

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
