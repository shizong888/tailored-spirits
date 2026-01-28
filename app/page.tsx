import ScrollVideoHero from '@/components/ScrollVideoHero';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <ScrollVideoHero />

      <section className="bg-zinc-950 text-amber-100 py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div>
              <h3 className="text-3xl font-light tracking-wider mb-4">CURATED</h3>
              <p className="text-amber-200/70 tracking-wide leading-relaxed">
                Each bottle selected with meticulous attention to character and provenance
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-light tracking-wider mb-4">REFINED</h3>
              <p className="text-amber-200/70 tracking-wide leading-relaxed">
                Spirits that embody the pinnacle of craftsmanship and tradition
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-light tracking-wider mb-4">DISTINCTIVE</h3>
              <p className="text-amber-200/70 tracking-wide leading-relaxed">
                For those who appreciate the extraordinary in every pour
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-amber-100 py-32 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light tracking-wider mb-8">
            THE COLLECTION
          </h2>
          <p className="text-xl text-amber-200/80 tracking-wide leading-relaxed mb-12">
            A carefully curated selection of the world&apos;s finest whisky,
            chosen for the connoisseur who demands nothing less than perfection.
          </p>
          <button className="px-12 py-4 border border-amber-100 text-amber-100 tracking-widest text-sm hover:bg-amber-100 hover:text-black transition-colors duration-300">
            VIEW COLLECTION
          </button>
        </div>
      </section>

      <footer className="bg-zinc-950 text-amber-200/60 py-12 px-8 text-center">
        <p className="tracking-widest text-sm">
          TAILORED SPIRITS &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
