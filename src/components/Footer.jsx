import { Link } from 'react-router-dom'
import { Heart, Leaf, Mail, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/40 bg-white/50 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <Link to="/" className="font-brand text-2xl text-text-dark">
            FOODBRIDGE
          </Link>
          <p className="mt-3 max-w-sm text-sm text-text-muted">
            Connecting Communities, Combating Waste — bridging surplus food to
            hungry hearts through donors, acceptors, and volunteers.
          </p>
          <p className="mt-4 text-xs text-text-muted">
            Made with love to fight hunger.
          </p>
        </div>

        <div className="grid gap-2 text-sm">
          <p className="font-heading text-base font-extrabold text-text-dark">
            Quick links
          </p>
          <Link className="text-text-muted hover:text-text-dark" to="/about">
            About
          </Link>
          <Link
            className="text-text-muted hover:text-text-dark"
            to="/how-it-works"
          >
            How it works
          </Link>
          <Link
            className="text-text-muted hover:text-text-dark"
            to="/mission-vision"
          >
            Mission & Vision
          </Link>
          <Link className="text-text-muted hover:text-text-dark" to="/impact">
            Impact
          </Link>
          <Link className="text-text-muted hover:text-text-dark" to="/contact">
            Contact
          </Link>
        </div>

        <div>
          <p className="font-heading text-base font-extrabold text-text-dark">
            Follow
          </p>
          <div className="mt-3 flex gap-3">
            {[Heart, Leaf, Mail, Send].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 shadow-glass transition hover:-translate-y-1 hover:shadow-lift"
                aria-label="Social"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-text-muted">
            © {new Date().getFullYear()} FoodBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

