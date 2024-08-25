const stripe = Stripe("pk_test_51PXOvV2NiETwuA3Lvh7ciMFLPYrJO2fNTXEEVfraNn4lBcZt98HKbEAHpZZpbxcK0Uf7KleLZllQ3GK0yOtHJXDP00C2A5CeD9");

// Create a Checkout Session
async function initialize () {
  const commande = new URLSearchParams(window.location.search).get('commande');

  const fetchClientSecret = async () => {
    
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      body:commande
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };
  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

// //   Mount Checkout
  checkout.mount('#checkout');

}

initialize()