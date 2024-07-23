import  Stripe  from 'stripe';

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);  // Remplacez par votre clé secrète Stripe

export async function stripeCekoutSessionCreate(commande) {
    return await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: commande,
        mode: 'payment',
        return_url: `http://localhost:3001/return.html?session_id={CHECKOUT_SESSION_ID}`,
      })
}
export async function stripeCekoutSessionRetrive(req) {
    return await stripe.checkout.sessions.retrieve(req.query.session_id)
}
