import { commande } from "./script.js";

const stripe = Stripe("pk_test_51PXOvV2NiETwuA3Lvh7ciMFLPYrJO2fNTXEEVfraNn4lBcZt98HKbEAHpZZpbxcK0Uf7KleLZllQ3GK0yOtHJXDP00C2A5CeD9");

// Create a Checkout Session
window.initialize = async function () {
  const fetchClientSecret = async () => {
    
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      body:JSON.stringify(commande)
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };
  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

//   Mount Checkout
  checkout.mount('#checkout');

}

