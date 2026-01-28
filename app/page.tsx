import ScrollVideoHero from '@/components/ScrollVideoHero';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <ScrollVideoHero />

      <section className="bg-[#215151] text-[#F6F1E9] py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div>
              <h3 className="text-3xl font-normal tracking-wider mb-4">CURATED</h3>
              <p className="text-[#F6F1E9]/70 tracking-wide leading-relaxed">
                Each bottle selected with meticulous attention to character and provenance
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-normal tracking-wider mb-4">REFINED</h3>
              <p className="text-[#F6F1E9]/70 tracking-wide leading-relaxed">
                Spirits that embody the pinnacle of craftsmanship and tradition
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-normal tracking-wider mb-4">DISTINCTIVE</h3>
              <p className="text-[#F6F1E9]/70 tracking-wide leading-relaxed">
                For those who appreciate the extraordinary in every pour
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-[#F6F1E9] py-32 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-normal tracking-wider mb-8">
            THE COLLECTION
          </h2>
          <p className="text-xl text-[#F6F1E9]/80 tracking-wide leading-relaxed mb-12">
            A carefully curated selection of the world&apos;s finest whisky,
            chosen for the connoisseur who demands nothing less than perfection.
          </p>
          <button className="px-12 py-4 bg-[#F6F1E9] text-black tracking-widest text-sm hover:bg-[#F6F1E9]/90 transition-colors duration-300 rounded-full">
            VIEW COLLECTION
          </button>
        </div>
      </section>

      <footer className="bg-[#215151] text-[#F6F1E9]/60 py-12 px-8 text-center">
        <p className="tracking-widest text-sm">
          TAILORED SPIRITS &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
