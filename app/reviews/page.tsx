import { googleReviews, googleReviewUrl } from '../review-data';

export default function ReviewsPage() {
  return <main className="inner-page">
    <nav className="nav-shell inner-nav"><a className="brand logo-brand" href="/" aria-label="Panchved home"><img src="/panchved-logo.png" alt="Panchved — Balance your being, flourish your life" /></a><div className="nav-links"><a href="/">Home</a><a href="/qualifications">Dr. Rucha</a><a href="/connect">Connect</a></div><a className="nav-cta" href="/#consultation">Book consultation <span>↗</span></a></nav>
    <section className="inner-hero"><p className="section-index">5.0 · 27 GOOGLE REVIEWS</p><h1>Care, in<br /><em>their words.</em></h1><p>Patient feedback shown directly from Panchved Ayurvedic Clinic’s Google Business profile.</p><a className="primary-button" href={googleReviewUrl} target="_blank" rel="noreferrer">View Google profile <span>↗</span></a></section>
    <section className="reviews-page-grid">{googleReviews.map((review) => <article key={review.name}><span aria-label="5 out of 5 stars">★★★★★</span><blockquote>“{review.copy}”</blockquote><footer><strong>{review.name}</strong><small>GOOGLE REVIEW · PANCHVED DHANORI</small></footer></article>)}</section>
    <p className="source-note">These are concise excerpts from publicly visible Google reviews. Patient-reported experiences are individual and are not a guarantee of outcomes.</p>
    <a className="whatsapp-button" href="https://wa.me/919689904237?text=Hello%20Panchved%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noreferrer" aria-label="Chat with Panchved on WhatsApp"><b>☎</b><span>Chat on WhatsApp</span></a>
  </main>;
}
