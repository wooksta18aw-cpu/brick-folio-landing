import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function LegoInvestmentLandingPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const features = [
    {
      title: 'Track your collection',
      text: 'Log your LEGO sets, quantity owned, spend, and collection stats in one place with a clean, intuitive layout.',
      icon: '🧱',
    },
    {
      title: 'Follow set values',
      text: 'See retail pricing, monitor market movement, and understand how your collection performs over time.',
      icon: '📈',
    },
    {
      title: 'Measure profit potential',
      text: 'Compare what you paid against current value and spot your strongest long-term holds.',
      icon: '💰',
    },
    {
      title: 'Build your wishlist',
      text: 'Keep an eye on the sets you want next and stay ready for the best buying opportunities.',
      icon: '❤️',
    },
  ]

  const statCards = [
    { label: 'Sets', value: '4 (8)', icon: '🧱' },
    { label: 'Price paid', value: '£1,129.97', icon: '🏷️' },
    { label: 'Pieces', value: '15,553', icon: '🧊' },
  ]

  const collection = [
    {
      id: '#43222',
      name: 'Disney Castle',
      pieces: '4,837 pcs',
      retail: 'Retail £349.99',
      market: '£475.00',
      qty: '1',
      image: 'https://images.brickset.com/sets/images/43222-1.jpg',
    },
    {
      id: '#10221',
      name: 'Super Star Destroyer',
      pieces: '3,152 pcs',
      retail: 'Retail £349.99',
      market: '£970.00',
      qty: '1',
      image: 'https://images.brickset.com/sets/images/10221-1.jpg',
    },
    {
      id: '#10237',
      name: 'The Tower of Orthanc',
      pieces: '2,359 pcs',
      retail: 'Retail £169.99',
      market: '£540.00',
      qty: '1',
      image: 'https://images.brickset.com/sets/large/10237-1.jpg',
    },
    {
      id: '#70620',
      name: 'NINJAGO City',
      pieces: '4,845 pcs',
      retail: 'Retail £259.99',
      market: '£628.90',
      qty: '1',
      image: 'https://images.brickset.com/sets/large/70620-1.jpg',
    },
  ]

  async function handleWaitlistSubmit(e) {
    e.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedEmail) {
      setMessage('Please enter your email address.')
      return
    }

    try {
      setIsSubmitting(true)
      setMessage('')

      const { error } = await supabase
        .from('waitlist_signups')
        .insert([{ email: trimmedEmail }])

      if (error) {
        if (error.code === '23505') {
          setMessage('That email is already on the waitlist.')
        } else {
          setMessage('Something went wrong. Please try again.')
        }
      } else {
        setMessage('You are on the waitlist!')
        setEmail('')
      }
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#180203] text-white">
      <main className="mx-auto max-w-7xl px-5 py-5 md:px-8 lg:px-10">
        <header className="rounded-[2rem] border border-[#8b1a1d] bg-gradient-to-b from-[#b51419] to-[#8f0f14] px-6 py-6 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
                LEGO collection tracker coming soon
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl md:leading-[1.02]">
                Record and track your LEGO portfolio with a brand new app — coming soon.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
                A bold, mobile-first tracker for collectors and investors. Showing retail prices, market insight, wishlist management, and future investment tools.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#waitlist"
                  className="rounded-[1.25rem] bg-[#ffb11a] px-6 py-4 text-center text-lg font-bold text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5"
                >
                  Get early access
                </a>
                <a
                  href="#preview"
                  className="rounded-[1.25rem] border border-white/10 bg-[#4b0f12] px-6 py-4 text-center font-semibold text-white/90 transition hover:bg-[#5a1216]"
                >
                  View preview
                </a>
              </div>
            </div>

            <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#240506] p-4 shadow-2xl shadow-black/40">
              <div className="rounded-[1.75rem] bg-[#7c1014] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/75">My Collection</p>
                    <p className="mt-2 text-4xl font-extrabold">£2,613.90</p>
                    <p className="mt-2 text-sm text-white/70">Estimated market price</p>
                    <div className="mt-4 rounded-[1rem] bg-[#4b0f12] px-4 py-3">
                      <p className="text-sm text-white/65">Price paid £1,129.97</p>
                      <p className="mt-1 text-base font-bold text-[#ffb11a]">Profit +£1,483.93 (+131%)</p>
                    </div>
                  </div>
                  <div className="rounded-[1rem] bg-[#ffb11a]/15 px-3 py-2 text-sm font-bold text-[#ffb11a]">
                    Live
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {statCards.map((card) => (
                    <div key={card.label} className="rounded-[1.4rem] bg-[#4b0f12] p-3 text-center shadow-sm">
                      <div className="text-xl">{card.icon}</div>
                      <p className="mt-2 text-lg font-extrabold leading-tight break-words">{card.value}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">{card.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="preview" className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#240506] p-5 shadow-xl shadow-black/30">
            <div className="rounded-[1.75rem] bg-[#2c0608] p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Collection Preview</h2>
                <div className="rounded-[1rem] bg-[#ef3b3f] px-4 py-3 font-semibold">Grid view</div>
              </div>

              <div className="mt-5 rounded-[1.4rem] bg-[#4b0f12] px-5 py-4 text-white/60">
                Search collection...
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {collection.map((item) => (
                  <div key={item.id} className="overflow-hidden rounded-[1.6rem] bg-[#5a1216] shadow-md">
                    <div className="flex h-44 items-center justify-center bg-[#f2f2f2] text-5xl">
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white/65">{item.id}</p>
                          <h3 className="mt-1 text-xl font-bold leading-tight">{item.name}</h3>
                          <p className="mt-2 text-sm text-white/65">{item.retail}</p>
                        </div>
                        <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#ffb11a] px-2 text-sm font-bold text-white">
                          {item.qty}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <p className="text-white/65">{item.pieces}</p>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.16em] text-white/55">Market</p>
                          <p className="text-xl font-extrabold text-[#ffb11a]">{item.market}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-[1.75rem] border border-white/10 bg-[#5a1216] p-5 shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#7c1014] text-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="mt-8 pb-6">
          <div className="rounded-[2rem] border border-[#8b1a1d] bg-gradient-to-b from-[#a31317] to-[#5a1216] px-6 py-10 shadow-2xl shadow-black/30 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">Join the waitlist</p>
              <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Be first to try the app.</h2>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Get launch updates, early access news, and first look at features built for serious LEGO collectors and investors.
              </p>
            </div>

            <form
              onSubmit={handleWaitlistSubmit}
              className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-14 flex-1 rounded-[1.25rem] border border-white/10 bg-[#240506] px-5 text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 rounded-[1.25rem] bg-[#ffb11a] px-6 text-lg font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Joining...' : 'Join waitlist'}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-white/60">
              No spam. Just launch updates and early access info.
            </p>

            {message && (
              <p className="mt-3 text-center text-sm font-medium text-[#ffb11a]">
                {message}
              </p>
            )}
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 text-sm text-white/50">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Brick Vault. All rights reserved.</p>
            <p>This app is independent and is not affiliated with the LEGO Group.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}