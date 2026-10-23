import { useState, type FormEvent } from 'react'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { hasStripeKey, stripePromise } from './stripe'

const donationAmounts = [10, 25, 50, 100]

export default function DonationSection() {
  const [amount, setAmount] = useState(25)

  return (
    <section className="donation-section" id="donate">
      <div className="donation-layout">
        <div className="donation-intro">
          <span className="eyebrow">A LITTLE CARE GOES A LONG WAY</span>
          <h2>Help write their<br /><em>next chapter.</em></h2>
          <p>
            Your support helps provide safe shelter, thoughtful care, and a
            fresh start for animals who need one.
          </p>
          <p className="donation-demo-note">
            This checkout is a demonstration. It creates a Stripe test payment
            method only; no donation is charged.
          </p>
        </div>

        <div className="donation-card">
          <div className="donation-heading">
            <div>
              <span className="section-label">MAKE A DONATION</span>
              <h3>Choose an amount</h3>
            </div>
            <span className="donation-paw" aria-hidden="true">♥</span>
          </div>
          <div className="donation-amounts" aria-label="Donation amount">
            {donationAmounts.map((option) => (
              <button
                className={amount === option ? 'amount-option selected' : 'amount-option'}
                key={option}
                type="button"
                aria-pressed={amount === option}
                onClick={() => setAmount(option)}
              >
                ${option}
              </button>
            ))}
          </div>
          <div className="donation-summary">
            <span>One-time donation</span>
            <strong>${amount}.00 USD</strong>
          </div>
          {hasStripeKey && stripePromise ? (
            <Elements
              stripe={stripePromise}
              options={{
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#454cc8',
                    colorText: '#282638',
                    colorDanger: '#b42318',
                    borderRadius: '4px',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                  },
                },
              }}
            >
              <DemoCheckoutForm amount={amount} />
            </Elements>
          ) : (
            <div className="stripe-config-notice" role="status">
              <strong>Connect Stripe to preview payment fields.</strong>
              <span>
                Add your test publishable key as
                {' '}<code>VITE_STRIPE_PUBLISHABLE_KEY</code> in
                {' '}<code>.env.local</code>, then restart the dev server.
              </span>
            </div>
          )}
          <p className="secure-payment-note">
            Card details are entered into Stripe’s secure field.
          </p>
        </div>
      </div>
    </section>
  )
}

function DemoCheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [name, setName] = useState('')
  const [cardError, setCardError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [demoReceiptId, setDemoReceiptId] = useState('')

  function handleCardChange(event: StripeCardElementChangeEvent) {
    setCardError(event.error?.message ?? '')
    setSubmitError('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')

    if (!name.trim()) {
      setSubmitError('Enter the name shown on the card.')
      return
    }

    if (!stripe || !elements) {
      setSubmitError('Stripe is still loading. Please try again in a moment.')
      return
    }

    const card = elements.getElement(CardElement)
    if (!card) {
      setSubmitError('The card field is unavailable. Please refresh and try again.')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: { name: name.trim() },
      })

      if (result.error) {
        setSubmitError(result.error.message ?? 'Stripe could not validate this card.')
        return
      }

      setDemoReceiptId(`DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Stripe could not process the test card. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (demoReceiptId) {
    return (
      <div className="donation-success" role="status">
        <span className="success-icon" aria-hidden="true">✓</span>
        <h3>Test payment method ready</h3>
        <p>
          Stripe validated the card for a ${amount}.00 donation. No payment was
          made.
        </p>
        <p className="demo-receipt">Demo receipt ID: <strong>{demoReceiptId}</strong></p>
        <button
          className="text-link reset-donation"
          type="button"
          onClick={() => setDemoReceiptId('')}
        >
          Make another test donation
        </button>
      </div>
    )
  }

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <label className="field-label" htmlFor="donor-name">Name on card</label>
      <input
        autoComplete="cc-name"
        id="donor-name"
        name="name"
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        required
        value={name}
      />

      <label className="field-label" htmlFor="card-element">Card details</label>
      <div className="stripe-card-field" id="card-element">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                color: '#282638',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '14px',
                '::placeholder': { color: '#92919d' },
              },
              invalid: { color: '#b42318' },
            },
          }}
          onChange={handleCardChange}
        />
      </div>
      {cardError && <p className="payment-error" role="alert">{cardError}</p>}
      {submitError && <p className="payment-error" role="alert">{submitError}</p>}
      <button className="button donation-submit" disabled={!stripe || isSubmitting} type="submit">
        {isSubmitting && <span className="spinner" aria-hidden="true" />}
        {isSubmitting ? 'Checking card…' : 'Pay now (demo — no charge)'}
        {!isSubmitting && <span aria-hidden="true">↗</span>}
      </button>
      <p className="payment-disclaimer">
        Demo only. A real donation needs a server-created PaymentIntent.
      </p>
    </form>
  )
}
