import { useEffect, useState } from 'react'
import './App.css'

type Page = 'home' | 'about'
type PageLinkHandler = (event: React.MouseEvent<HTMLAnchorElement>, page: Page) => void

const programs = [
  {
    number: '01',
    title: 'Rescue & recovery',
    description: 'A safe landing, patient care, and time to feel at home again.',
    icon: 'heart',
  },
  {
    number: '02',
    title: 'Foster families',
    description: 'Everyday homes give animals room to relax while they wait.',
    icon: 'home',
  },
  {
    number: '03',
    title: 'Thoughtful adoptions',
    description: 'We help each animal find a person who feels like their person.',
    icon: 'paw',
  },
]

function App() {
  const [page, setPage] = useState<Page>(() =>
    window.location.pathname.replace(/\/+$/, '') === '/about' ? 'about' : 'home',
  )

  useEffect(() => {
    const syncPage = () => {
      setPage(window.location.pathname.replace(/\/+$/, '') === '/about' ? 'about' : 'home')
    }
    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, nextPage: Page) {
    event.preventDefault()
    const path = nextPage === 'about' ? '/about' : '/'
    if (window.location.pathname !== path) window.history.pushState({}, '', path)
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <Brand navigate={navigate} />
        <nav className="main-nav" aria-label="Main navigation">
          <a className={page === 'home' ? 'nav-link active' : 'nav-link'} href="/" onClick={(event) => navigate(event, 'home')}>Home</a>
          <a className={page === 'about' ? 'nav-link active' : 'nav-link'} href="/about" onClick={(event) => navigate(event, 'about')}>About</a>
          <a className="nav-cta" href="mailto:hello@goodpawsrescue.org?subject=How%20can%20I%20help%3F">Help an animal <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      {page === 'home' ? <HomePage navigate={navigate} /> : <AboutPage />}

      <footer className="site-footer">
        <Brand navigate={navigate} />
        <p>More second chances. More happy tails.</p>
        <a className="footer-email" href="mailto:hello@goodpawsrescue.org">
          hello@goodpawsrescue.org <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  )
}

function Brand({ navigate }: { navigate: PageLinkHandler }) {
  return (
    <a className="brand" href="/" onClick={(event) => navigate(event, 'home')} aria-label="Good Paws Rescue home">
      <span className="brand-mark" aria-hidden="true"><PawIcon /></span>
      <span className="brand-name">good paws<span>ANIMAL RESCUE</span></span>
    </a>
  )
}

function HomePage({ navigate }: { navigate: PageLinkHandler }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">A SECOND CHANCE STARTS HERE</span>
          <h1>Every good<br />story needs a<br /><em>paw-some turn.</em></h1>
          <p className="hero-intro">
            We give cats and dogs a safe place to land, kind people in their corner,
            and the chance to find a family of their own.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:hello@goodpawsrescue.org?subject=I%27d%20like%20to%20adopt">
              Meet your match <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="/about" onClick={(event) => navigate(event, 'about')}>
              Our story <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1400&q=85"
            alt="A happy golden dog enjoying a sunny day outside"
          />
        </div>
      </section>

      <section className="welcome-section section-wrap">
        <div className="section-label"><span>01</span> A PLACE TO BEGIN AGAIN</div>
        <div className="welcome-content">
          <h2>From “what now?”<br />to <em>“welcome home.”</em></h2>
          <div className="welcome-aside">
            <p>
              A new start can be a lot to take in. We provide practical care,
              patient support, and a safe place for rescued animals to settle in.
            </p>
            <p>
              Then we bring together the right people — foster carers,
              adopters, and volunteers — to make the next chapter a good one.
            </p>
            <a className="text-link" href="/about" onClick={(event) => navigate(event, 'about')}>
              Get to know Good Paws <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="care-section">
        <div className="section-wrap">
          <div className="care-heading">
            <div>
              <div className="section-label light-label"><span>02</span> HOW WE HELP</div>
              <h2>Care first.<br /><em>Always.</em></h2>
            </div>
            <p>Every animal has their own story. We meet them where they are and take the next step at their pace.</p>
          </div>
          <div className="care-grid">
            {programs.map((program) => (
              <article className="care-card" key={program.number}>
                <div className="care-card-top">
                  <span className="care-number">{program.number}</span>
                  <CareIcon name={program.icon} />
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section section-wrap">
        <div className="story-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=85"
            alt="A rescued dog being gently cared for by a person"
            loading="lazy"
          />
          <span className="photo-tag">ROOM TO FEEL SAFE</span>
        </div>
        <div className="story-copy">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>It’s not just finding a home. It’s finding the right one.</blockquote>
          <p>We take time to understand each animal and the people hoping to welcome them. A thoughtful match is worth the wait.</p>
          <a className="text-link" href="/about" onClick={(event) => navigate(event, 'about')}>
            How we find a match <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="join-section">
        <span className="eyebrow">GOOD PEOPLE MAKE GOOD PAWS</span>
        <h2>There’s more than<br /><em>one way to help.</em></h2>
        <p>Foster for a while, lend a hand, or help cover the everyday essentials. Every bit of care counts.</p>
        <a className="button button-light" href="mailto:hello@goodpawsrescue.org?subject=I%27d%20like%20to%20help">
          Find your way to help <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  )
}

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <span className="eyebrow">THE PEOPLE BEHIND THE PAWS</span>
          <h1>Hi, I’m <em>Ryle.</em></h1>
          <h2 className="about-tagline">Big hearts. Open arms.<br />Second chances.</h2>
          <p>
            I created Good Paws Rescue because I believe every animal deserves
            kindness, care, and a chance to find a loving home.
          </p>
        </div>
        <div className="about-hero-image">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85"
            alt="Two happy dogs spending time together outdoors"
          />
        </div>
      </section>

      <section className="about-mission section-wrap">
        <div className="section-label">WHAT WE BELIEVE</div>
        <div className="mission-content">
          <h2>Every animal deserves to be met with <em>kindness.</em></h2>
          <div>
            <p>
              I believe every animal deserves to feel safe, cared for, and loved.
              A difficult beginning should never decide the rest of their story.
            </p>
            <p>
              That belief is what inspired me to create Good Paws: a place built
              around second chances and finding animals a home where they belong.
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}

function PawIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none">
      <ellipse cx="13" cy="16" rx="4" ry="6" transform="rotate(-24 13 16)" />
      <ellipse cx="23" cy="11" rx="4" ry="6" />
      <ellipse cx="34" cy="16" rx="4" ry="6" transform="rotate(24 34 16)" />
      <path d="M10 31c0-6 6-11 14-11s14 5 14 11-5 9-10 7c-3-1-5-1-8 0-5 2-10-1-10-7Z" />
    </svg>
  )
}

function CareIcon({ name }: { name: string }) {
  if (name === 'heart') {
    return <svg className="care-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 39S7 29 7 17c0-8 10-12 17-3 7-9 17-5 17 3 0 12-17 22-17 22Z" /><path d="m17 24 5 5 10-11" /></svg>
  }
  if (name === 'home') {
    return <svg className="care-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="m6 22 18-15 18 15M11 19v22h26V19M20 41V28h8v13" /><path d="M31 12V8h5v8" /></svg>
  }
  return <span className="care-icon-paw"><PawIcon /></span>
}

export default App
