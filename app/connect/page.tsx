const hours = [
  ['Monday', '11 am–1 pm · 6–8:30 pm'],
  ['Tuesday', '11 am–1 pm · 6–8:30 pm'],
  ['Wednesday', '11 am–1 pm · 6–8:30 pm'],
  ['Thursday', '11 am–1 pm · 6–8:30 pm'],
  ['Friday', '11 am–1 pm · 6–8:30 pm'],
  ['Saturday', '11 am–1 pm · 6–8:30 pm'],
  ['Sunday', 'Closed'],
];

const mapsUrl = 'https://www.google.com/maps?cid=13893047267463374293';

export default function ConnectPage() {
  return <main className="inner-page connect-page">
    <nav className="nav-shell inner-nav"><a className="brand logo-brand" href="/" aria-label="Panchved home"><img src="/panchved-logo.png" alt="Panchved — Balance your being, flourish your life" /></a><div className="nav-links"><a href="/">Home</a><a href="/qualifications">Dr. Rucha</a><a href="/reviews">Reviews</a></div><a className="nav-cta" href="https://wa.me/919689904237?text=Hello%20Panchved%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noreferrer">Book consultation <span>↗</span></a></nav>
    <section className="connect-hero"><div><p className="section-index">CONNECT WITH US</p><h1>Come in.<br /><em>Feel heard.</em></h1><p>Visit Panchved in Goodwill Square, Dhanori, or speak directly with the clinic on phone or WhatsApp.</p><div className="connect-actions"><a className="primary-button" href={mapsUrl} target="_blank" rel="noreferrer">Google directions <span>↗</span></a><a className="text-link" href="tel:+919689904237">Call 096899 04237 <span>↗</span></a></div></div><iframe title="Google Map to Panchved Ayurvedic Clinic" src="https://www.google.com/maps?q=Panchved%20Ayurvedic%20Clinic%2C%20226%20Goodwill%20Square%2C%20Dhanori%2C%20Pune%20411015&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>
    <section className="visit-details"><article><p className="section-index">CLINIC ADDRESS</p><h2>226, Second Floor,<br />Goodwill Square</h2><p>Dhanori–Lohegaon Road, Madhav Nagar, Dhanori, Pune, Maharashtra 411015.</p><a href={mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps ↗</a></article><article className="hours-card"><p className="section-index">OPENING HOURS · GOOGLE</p><h2>Plan your visit.</h2><div>{hours.map(([day, time]) => <p key={day}><strong>{day}</strong><span>{time}</span></p>)}</div><small>Hours verified from Panchved’s Google Business profile. Holiday hours may vary.</small></article></section>
    <section className="connect-strip"><a href="tel:+919689904237"><small>CALL THE CLINIC</small><strong>096899 04237</strong></a><a href="https://wa.me/919689904237?text=Hello%20Panchved%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noreferrer"><small>WHATSAPP</small><strong>Start a conversation ↗</strong></a></section>
    <a className="whatsapp-button" href="https://wa.me/919689904237?text=Hello%20Panchved%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noreferrer" aria-label="Chat with Panchved on WhatsApp"><b>☎</b><span>Chat on WhatsApp</span></a>
  </main>;
}
