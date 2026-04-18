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
      title: 'Track investment performance',
      text: 'Monitor your LEGO portfolio value, profit, and ROI in one place.',
      icon: '📊',
    },
    {
      title: 'Discover high-potential sets',
      text: 'Find sets with strong growth potential based on market trends and demand.',
      icon: '📈',
    },
    {
      title: 'Retirement tracking',
      text: 'Identify sets retiring soon so you can invest before prices increase.',
      icon: '⏳',
    },
    {
      title: 'Market insights',
      text: 'Understand price trends, demand, and long-term performance of LEGO sets.',
      icon: '🔥',
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
      retail: 'Price paid £349.99',
      market: '£475.00',
      qty: '1',
      image: 'https://images.brickset.com/sets/images/43222-1.jpg',
    },
    {
      id: '#10221',
      name: 'Super Star Destroyer',
      pieces: '3,152 pcs',
      retail: 'Price paid £349.99',
      market: '£970.00',
      qty: '1',
      image: 'https://images.brickset.com/sets/images/10221-1.jpg',
    },
    {
      id: '#10237',
      name: 'The Tower of Orthanc',
      pieces: '2,359 pcs',
      retail: 'Price paid £169.99',
      market: '£540.00',
      qty: '1',
      image: 'https://images.brickset.com/sets/large/10237-1.jpg',
    },
    {
      id: '#70620',
      name: 'NINJAGO City',
      pieces: '4,845 pcs',
      retail: 'Price paid £259.99',
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
        .insert([{ email: trimmedEmail, source: 'landing_page' }])

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
                LEGO investing platform coming soon
              </div>

              <p className="mt-5 text-sm font-semibold text-[#ffb11a]">
                Early access spots are limited
              </p>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl md:leading-[1.02]">
                Track, analyse, and grow your LEGO investment portfolio.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
                BrickFolio helps you track real market value, monitor ROI, and discover which LEGO sets are worth buying before they retire.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-lg bg-[#4b0f12] px-3 py-2">📈 Track ROI</span>
                <span className="rounded-lg bg-[#4b0f12] px-3 py-2">🔥 Find best sets</span>
                <span className="rounded-lg bg-[#4b0f12] px-3 py-2">⏳ Retirement alerts</span>
              </div>

              <form
                onSubmit={handleWaitlistSubmit}
                className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-14 flex-1 rounded-xl border border-white/10 bg-[#240506] px-4 text-white outline-none placeholder:text-white/35"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 rounded-xl bg-[#ffb11a] px-6 font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Joining...' : 'Start building your portfolio'}
                </button>
              </form>

              <p className="mt-3 text-sm text-white/60">
                ✓ Early access to the app &nbsp; ✓ First look at investment tools &nbsp; ✓ No spam — ever
              </p>

              <p className="mt-3 text-sm text-white/60">
                Join 127+ collectors already on the waitlist
              </p>

              {message && (
                <p className="mt-3 text-sm font-medium text-[#ffb11a]">
                  {message}
                </p>
              )}
            </div>

            <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#240506] p-4 shadow-2xl shadow-black/40">
              <div className="rounded-[1.75rem] bg-[#7c1014] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white/75">My Portfolio</p>
                    <p className="mt-2 text-4xl font-extrabold">£2,613.90</p>
                    <p className="mt-2 text-sm text-white/70">Estimated market price</p>
                    <div className="mt-4 rounded-[1rem] bg-[#4b0f12] px-4 py-3">
                      <p className="text-sm text-white/65">Price paid £1,129.97</p>
                      <p className="mt-1 text-base font-bold text-[#ffb11a]">
                        Profit +£1,483.93 (+131%)
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1rem] bg-[#ffb11a]/15 px-3 py-2 text-sm font-bold text-[#ffb11a]">
                    Live
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {statCards.map((card) => (
                    <div
                      key={card.label}
                      className="overflow-hidden rounded-[1.4rem] bg-[#4b0f12] p-3 text-center shadow-sm"
                    >
                      <div className="text-xl">{card.icon}</div>
                      <p className="mt-2 truncate text-lg font-extrabold leading-tight">
                        {card.value}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                        {card.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-10 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Most LEGO investors miss the best opportunities
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            By the time sets retire and prices rise, it is already too late. BrickFolio helps you spot opportunities early.
          </p>
        </section>

        <section id="preview" className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#240506] p-5 shadow-xl shadow-black/30">
            <div className="rounded-[1.75rem] bg-[#2c0608] p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Portfolio Preview</h2>
                <div className="rounded-[1rem] bg-[#ef3b3f] px-4 py-3 font-semibold">
                  Live market view
                </div>
              </div>

              <div className="mt-5 rounded-[1.4rem] bg-[#4b0f12] px-5 py-4 text-white/60">
                Search your portfolio...
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {collection.map((item) => (
                  <div key={item.id} className="overflow-hidden rounded-[1.6rem] bg-[#5a1216] shadow-md">
                    <div className="flex h-44 items-center justify-center bg-[#f2f2f2] text-5xl">
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
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
            <div className="rounded-[2rem] border border-white/10 bg-[#240506] p-6 text-center shadow-xl shadow-black/30">
              <h2 className="text-3xl font-extrabold">Know what to buy. Know when to sell.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/75">
                BrickFolio helps you identify the best LEGO investments by tracking market trends, retirement dates, and long-term performance.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-[#4b0f12] p-4">
                  <p className="text-sm text-white/60">Recently retired</p>
                  <p className="text-lg font-bold text-[#ffb11a]">High opportunity</p>
                </div>
                <div className="rounded-xl bg-[#4b0f12] p-4">
                  <p className="text-sm text-white/60">Top performers</p>
                  <p className="text-lg font-bold text-[#ffb11a]">+120% avg ROI</p>
                </div>
                <div className="rounded-xl bg-[#4b0f12] p-4">
                  <p className="text-sm text-white/60">Market insights</p>
                  <p className="text-lg font-bold text-[#ffb11a]">Live tracking</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[1.75rem] border border-white/10 bg-[#5a1216] p-5 shadow-md"
                >
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
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">
                Join the waitlist
              </p>
              <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
                Be first to access BrickFolio.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Get early access, investment tools, and market insights designed for serious LEGO investors.
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
                {isSubmitting ? 'Joining...' : 'Get early access'}
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

        <p className="mt-2 text-center text-xs text-white/40">
          Built for LEGO collectors and investors
        </p>

        <footer className="border-t border-white/10 py-8 text-sm text-white/50">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© 2026 BrickFolio. All rights reserved.</p>
            <p>This app is independent and is not affiliated with the LEGO Group.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}