import { loadStripe } from '@stripe/stripe-js'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim()

export const stripePromise =
  publishableKey && publishableKey !== 'pk_test_...'
    ? loadStripe(publishableKey)
    : null

export const hasStripeKey = Boolean(stripePromise)
