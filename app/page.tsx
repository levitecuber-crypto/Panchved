'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { googleReviews, googleReviewUrl } from './review-data';

const elements = [
  { name: 'Earth', sanskrit: 'Prithvi', color: '#A9734F' },
  { name: 'Water', sanskrit: 'Jal', color: '#8FB5AA' },
  { name: 'Fire', sanskrit: 'Agni', color: '#DB7D47' },
  { name: 'Air', sanskrit: 'Vayu', color: '#BCC7A7' },
  { name: 'Space', sanskrit: 'Akash', color: '#6D7560' },
];

const concerns = [
  { number: '01', title: 'Digestive balance', copy: 'Rebuild agni, reduce discomfort and create a calmer relationship with food.', tone: 'ochre' },
  { number: '02', title: 'Stress & sleep', copy: 'Settle the nervous system with therapies designed around your daily rhythm.', tone: 'sage' },
  { number: '03', title: 'Pain management', copy: 'Address inflammation and mobility through physician-guided traditional care.', tone: 'clay' },
  { number: '04', title: 'Women’s wellness', copy: 'Personalised support through hormonal shifts, cycles and life transitions.', tone: 'moss' },
  { number: '05', title: 'And more', copy: 'Skin health, metabolic concerns, respiratory wellbeing, immunity and preventive care—guided by a physician assessment.', tone: 'sand' },
];

const journey = [
  ['01', 'Listen', 'A thoughtful conversation about your health, history, routine and goals.'],
  ['02', 'Understand', 'Your physician reads your constitution, imbalance and the patterns behind it.'],
  ['03', 'Restore', 'A personal combination of therapy, herbs, food and daily practices.'],
  ['04', 'Sustain', 'Follow-ups turn treatment into a rhythm you can carry into real life.'],
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let frame = 0;
    let animation = 0;
    const particles = Array.from({ length: 92 }, (_, index) => ({
      angle: (index / 92) * Math.PI * 2,
      orbit: 68 + (index % 9) * 7,
      size: 1 + (index % 4) * 0.55,
      speed: 0.0012 + (index % 7) * 0.00016,
      lift: Math.sin(index * 1.83) * 58,
      alpha: 0.2 + (index % 6) * 0.1,
    }));

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = canvas.getBoundingClientRect();
      canvas.width = bounds.width * ratio;
      canvas.height = bounds.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const glow = context.createRadialGradient(cx, cy, 20, cx, cy, 190);
      glow.addColorStop(0, 'rgba(218, 184, 115, .2)');
      glow.addColorStop(0.55, 'rgba(142, 164, 130, .09)');
      glow.addColorStop(1, 'rgba(248, 244, 234, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        const angle = particle.angle + frame * particle.speed;
        const depth = (Math.sin(angle) + 1) / 2;
        const x = cx + Math.cos(angle) * particle.orbit * (0.55 + depth * 0.55);
        const y = cy + particle.lift + Math.sin(angle * 2.1) * 19;
        context.beginPath();
        context.arc(x, y, particle.size * (0.7 + depth), 0, Math.PI * 2);
        context.fillStyle = index % 5 === 2
          ? `rgba(203, 120, 66, ${particle.alpha})`
          : `rgba(74, 92, 65, ${particle.alpha})`;
        context.fill();
      });

      frame += 1;
      animation = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animation);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting)),
      { threshold: 0.16 },
    );
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const submitConsultation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const body = encodeURIComponent(`Hello Panchved, I would like to book a consultation.\n\nName: ${fields.get('name')}\nPhone: ${fields.get('phone')}\n\nMessage: ${fields.get('message') || 'Not provided'}`);
    window.open(`https://wa.me/919689904237?text=${body}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <main>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand logo-brand" href="#top" aria-label="Panchved home"><img src="/panchved-logo.png" alt="Panchved — Balance your being, flourish your life" /></a>
        <div className="nav-links">
          <a href="/#philosophy">Our approach</a>
          <a href="/#treatments">Treatments</a>
          <a href="/qualifications">Dr. Rucha</a>
          <a href="/reviews">Reviews</a>
          <a href="/connect">Connect</a>
        </div>
        <a className="nav-cta" href="#consultation">Book consultation <span>↗</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Authentic Ayurveda · Personalised care</p>
          <h1>Return to your<br /><em>natural balance.</em></h1>
          <p className="hero-intro">
            Doctor-led Ayurvedic care that understands your whole story—then creates a path to wellbeing that is entirely your own.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#consultation">Begin your consultation <span>↗</span></a>
            <a className="text-link" href="#philosophy">Discover Panchved <span>↓</span></a>
          </div>
          <div className="trust-line">
            <span className="avatar-stack"><i>5</i><i>★</i><i>+</i></span>
            <p><strong>5.0 / 5</strong><br />27 directory ratings</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="The five elements forming one living system">
          <canvas ref={canvasRef} />
          <div className="element-rings"><i /><i /><i /><i /></div>
          <div className="core-sculpture">
            <span className="leaf leaf-one" />
            <span className="leaf leaf-two" />
            <span className="leaf leaf-three" />
            <span className="oil-drop" />
          </div>
          <div className="visual-note note-one"><span>01</span><p>Body<br /><strong>Sharira</strong></p></div>
          <div className="visual-note note-two"><span>02</span><p>Mind<br /><strong>Manas</strong></p></div>
          <div className="visual-note note-three"><span>03</span><p>Spirit<br /><strong>Atma</strong></p></div>
        </div>

        <div className="element-rail" aria-label="Five elements of Ayurveda">
          {elements.map((element, index) => (
            <div className="element-item" key={element.name}>
              <span style={{ backgroundColor: element.color }}>{index + 1}</span>
              <p>{element.name}<small>{element.sanskrit}</small></p>
            </div>
          ))}
        </div>
      </section>

      <section className="philosophy-section" id="philosophy">
        <div className="philosophy-heading reveal">
          <p className="section-index">01 · OUR PHILOSOPHY</p>
          <h2>Five elements.<br /><em>One complete you.</em></h2>
          <p>Ayurveda sees your health as a living relationship between the elements. When one shifts, the whole story changes. We begin by understanding that story.</p>
        </div>
        <div className="element-stage" aria-hidden="true">
          <div className="stage-orbit orbit-a" /><div className="stage-orbit orbit-b" /><div className="stage-orbit orbit-c" />
          <div className="element-orbit orbit-earth"><div className="element-sphere sphere-earth"><span>Earth</span></div></div>
          <div className="element-orbit orbit-water"><div className="element-sphere sphere-water"><span>Water</span></div></div>
          <div className="element-orbit orbit-fire"><div className="element-sphere sphere-fire"><span>Fire</span></div></div>
          <div className="element-orbit orbit-air"><div className="element-sphere sphere-air"><span>Air</span></div></div>
          <div className="element-orbit orbit-space"><div className="element-sphere sphere-space"><span>Space</span></div></div>
          <div className="human-core"><i /><i /><i /></div>
        </div>
        <div className="philosophy-foot reveal">
          <p>Not a protocol for everyone.</p>
          <p>A path designed for <em>you.</em></p>
        </div>
      </section>

      <section className="dosha-section">
        <div className="dosha-intro reveal">
          <p className="section-index dark-index">02 · YOUR CONSTITUTION</p>
          <h2>Your nature is<br />your starting point.</h2>
          <p>Vata, Pitta and Kapha are not labels. They are patterns that help us understand how you move, transform and restore.</p>
        </div>
        <div className="dosha-wheel reveal" aria-label="The three doshas">
          <div className="dosha-center"><span>YOUR UNIQUE<br /><strong>PRAKRITI</strong></span></div>
          <article className="dosha dosha-vata"><small>01 · AIR + SPACE</small><h3>Vata</h3><p>Movement · creativity · flow</p></article>
          <article className="dosha dosha-pitta"><small>02 · FIRE + WATER</small><h3>Pitta</h3><p>Transformation · focus · heat</p></article>
          <article className="dosha dosha-kapha"><small>03 · EARTH + WATER</small><h3>Kapha</h3><p>Stability · strength · calm</p></article>
        </div>
        <a className="outline-button reveal" href="#consultation">Understand your constitution <span>↗</span></a>
      </section>

      <section className="treatments-section" id="treatments">
        <header className="treatments-header reveal">
          <div><p className="section-index">03 · HOW WE CAN HELP</p><h2>Care for the life<br />you actually live.</h2></div>
          <p>We look beyond isolated symptoms to understand the patterns beneath them—then build a plan that feels practical, personal and deeply considered.</p>
        </header>
        <div className="concern-grid">
          {concerns.map((concern) => (
            <article className={`concern-card ${concern.tone} reveal`} key={concern.title}>
              <span>{concern.number}</span>
              <div className="concern-symbol"><i /><i /></div>
              <h3>{concern.title}</h3>
              <p>{concern.copy}</p>
              <a href="#consultation" aria-label={`Explore ${concern.title}`}>Explore care <b>↗</b></a>
            </article>
          ))}
        </div>
        <div className="signature-feature reveal">
          <div className="care-constellation" aria-hidden="true"><div className="care-ring ring-one" /><div className="care-ring ring-two" /><div className="care-core"><i /><i /><i /></div><span /><span /><span /><span /><span /></div>
          <div className="signature-copy">
            <p className="section-index light-index">SIGNATURE PROGRAMME</p>
            <h2>Personal care,<br /><em>from the roots.</em></h2>
            <p>A physician-guided care programme that brings together food, herbs, restorative therapies and daily practices—thoughtfully adapted to your constitution, health and real life.</p>
            <a href="#consultation">Explore our approach <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="journey-section">
        <header className="journey-heading reveal">
          <p className="section-index">04 · YOUR JOURNEY</p>
          <h2>Care that unfolds<br />at the right pace.</h2>
        </header>
        <div className="journey-list">
          {journey.map(([number, title, copy]) => (
            <article className="journey-step reveal" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="practitioner-section" id="practitioners">
        <div className="doctor-portrait doctor-monogram reveal" aria-label="Dr. Rucha, Panchved's Ayurvedic physician">
          <div className="portrait-halo" />
          <div className="doctor-seal"><span>DR</span><small>RUCHA</small></div>
          <p>Personal care<br />with presence.</p>
          <i className="monogram-leaf leaf-left" /><i className="monogram-leaf leaf-right" />
        </div>
        <div className="doctor-copy reveal">
          <p className="section-index">05 · OUR PRACTITIONERS</p>
          <blockquote>“The first treatment is to make a patient feel truly heard.”</blockquote>
          <p>Dr. Rucha begins every consultation with time, attention and the whole picture. The aim is a care plan that respects both classical Ayurvedic principles and the pace of your everyday life.</p>
          <h3>Dr. Rucha <span>AYURVEDIC PHYSICIAN · PANCHVED</span></h3>
          <a className="text-link" href="#consultation">Book with Dr. Rucha <span>↗</span></a>
        </div>
      </section>

      <section className="clinic-gallery" aria-label="Inside Panchved Ayurvedic Clinic">
        <div className="gallery-copy reveal"><p className="section-index dark-index">PANCHVED · DHANORI</p><h2>A calm setting<br />for considered care.</h2><p>Find Panchved on the second floor of Goodwill Square, Dhanori–Lohegaon Road, Pune.</p><a className="text-link" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Panchved+Ayurvedic+Clinic%2C+226+Goodwill+Square%2C+Dhanori-Lohegaon+Road%2C+Pune+411015">Get directions <span>↗</span></a></div>
        <div className="gallery-grid reveal">
          <img src="https://lh3.googleusercontent.com/sitesv/AG8ngQXP3i7gju4XytBdoac1LHf0z1kPYrog-2_R9ZhpVfTBioWUF1zsf2_0w7z9gVj2nFIAMTVsGr8yxhG2-nbAf_4mAMugR0G5ViyF-Hs_A-iY6synQHEgjZfTAJvRXHFGQh8RVxO6OGDSdaUt1xC7jHLWt57KfTpIjftFXolEmGQEFRZ-Up_VJyPfCacROon5Y6Y1mArHHFJugXGfYTx0Py5LzXNY6mwksoQIq91CPrw%3Dw1280" alt="Panchved Ayurvedic Clinic interior" />
          <img src="https://lh3.googleusercontent.com/sitesv/AG8ngQUxHux6geh2GVkxKJ71AvAPjB_15d0lNde7Ikm3XBHlm1b0R1XcQXcwb3G89lK0-SFrlm-naPWkK4pqO2OpJ-PkRbXQC30d5kVE5oqH5z3_-fU7oC0B4Pi1zYIclwEHEkbUnu9CnBeA-XzYBPfHvnzJhnXp72wAWqnFcb_xQ-IAx5IxT6Zx4xZYZOFF1pyXMdizmmzRe0yU-LnArdA6a-aZ7EojtlYupRVvCoc7Fmg%3Dw1280" alt="Panchved Ayurvedic Clinic space" />
          <img src="https://lh3.googleusercontent.com/sitesv/AG8ngQXVrVplk_CnMjbSGZOdfpJJwI2I4vJ79x2KpV-Winiu8dbRC-lS-FWnbtYblCn24DGoqX-26PdIJh_9AvEdyuXOhCz56NPky2E9hU7pkr2TZdi6ugn5ZIhZix_VTSrHN398VDw7a5XQl852HMOx_PKRjUaZ4c_GsfW2n9tpek5bmTvvM62OY4lLzbWX8JAPAeC8G3wPBajSP6FGA21iChfaEgzHHkrjAv-R9Flj374%3Dw1280" alt="Panchved Ayurvedic Clinic" />
        </div>
      </section>

      <section className="map-section" aria-label="Panchved location map">
        <div><p className="section-index">VISIT PANCHVED</p><h2>Goodwill Square,<br />Dhanori.</h2><p>226, Second Floor, Goodwill Square, Dhanori–Lohegaon Road, Pune 411015.</p><a className="text-link" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Panchved+Ayurvedic+Clinic%2C+226+Goodwill+Square%2C+Dhanori-Lohegaon+Road%2C+Pune+411015">Open in Google Maps <span>↗</span></a></div>
        <iframe title="Map to Panchved Ayurvedic Clinic" src="https://www.google.com/maps?q=Panchved%20Ayurvedic%20Clinic%2C%20226%20Goodwill%20Square%2C%20Dhanori%2C%20Pune%20411015&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>

      <section className="reviews-section" id="reviews">
        <header className="reviews-heading"><p className="section-index dark-index">5.0 · 27 GOOGLE REVIEWS</p><h2>Care, in their words.</h2><a href={googleReviewUrl} target="_blank" rel="noreferrer">View Google profile ↗</a></header>
        <div className="review-lane" aria-label="Patient reviews">
          <div className="review-track review-track-left">{googleReviews.concat(googleReviews).map((review, i) => <article className="review-card" key={`${review.name}-${i}`}><span aria-label="5 out of 5 stars">★★★★★</span><p>“{review.copy}”</p><small>{review.name.toUpperCase()} · GOOGLE REVIEW</small></article>)}</div>
        </div>
        <p className="review-note">Patient-reported experiences from Panchved’s Google Business profile; individual outcomes vary.</p>
      </section>

      <section className="consultation-section" id="consultation">
        <div className="consultation-copy reveal">
          <p className="section-index light-index">BEGIN YOUR JOURNEY</p>
          <h2>Let’s begin with<br /><em>your story.</em></h2>
          <p>Share a few details to open a ready-to-send email for the Panchved care team, or reach us directly by phone.</p>
          <div className="consultation-details"><span>01</span><p>Personal consultation</p><span>02</span><p>Constitution assessment</p><span>03</span><p>Clear next-step care plan</p></div>
        </div>
        <form className="consultation-form reveal" onSubmit={submitConsultation}>
          {submitted ? (
            <div className="form-success" role="status" aria-live="polite"><span>✓</span><h3>Your chat is ready.</h3><p>We’ve opened WhatsApp with your consultation request prepared for Panchved.</p><button type="button" onClick={() => setSubmitted(false)}>Send another enquiry</button></div>
          ) : (
            <>
              <label>Your name<input required name="name" autoComplete="name" placeholder="Full name" /></label>
              <label>Phone number<input required name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" /></label>
              <label>Anything you’d like us to know?<textarea name="message" rows={3} placeholder="Tell us a little about what brings you here" /></label>
              <button className="submit-button" type="submit">Request a consultation <span>↗</span></button>
              <small>Submitting opens WhatsApp with your enquiry addressed to Panchved.</small>
            </>
          )}
        </form>
      </section>

      <footer>
        <a className="brand footer-brand logo-brand" href="#top"><img src="/panchved-logo.png" alt="Panchved" /></a>
        <p>Ancient wisdom. Thoughtful care.<br />A healthier way forward.</p>
        <div><a href="/#philosophy">Our approach</a><a href="/#treatments">Treatments</a><a href="/qualifications">Dr. Rucha’s qualifications</a><a href="/reviews">Reviews</a><a href="/connect">Connect with us</a><a href="tel:+919689904237">Call +91 96899 04237</a><a href="mailto:panchvedclinic@gmail.com">Email Panchved</a></div>
        <small>© 2026 Panchved Ayurvedic Clinic · 226, Second Floor, Goodwill Square, Dhanori–Lohegaon Road, Pune 411015.</small>
      </footer>
      <a className="whatsapp-button" href="https://wa.me/919689904237?text=Hello%20Panchved%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noreferrer" aria-label="Chat with Panchved on WhatsApp"><b>☎</b><span>Chat on WhatsApp</span></a>
    </main>
  );
}
