import GradientBlinds from "@/components/GradientBlinds"
import Navbar from "@/components/Navbar"
import NewsGrid from "@/components/NewsGrid"

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 w-full h-full flex items-center justify-center">
        <GradientBlinds
          gradientColors={["#0d0d1a", "#1a0533", "#3b0764", "#4c1d95"]}
          angle={15}
          noise={0.25}
          blindCount={13}
          blindMinWidth={50}
          spotlightRadius={0.38}
          spotlightSoftness={1.6}
          spotlightOpacity={0.42}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="overlay"
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center justify-center min-h-screen w-full px-5 sm:px-20">
            <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                Технологии будущего — сегодня
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl text-balance drop-shadow-2xl">
                Новости AI,
                <br />
                Роботов и Космоса
              </h1>
              <p className="text-xl text-white/90 max-w-3xl text-pretty drop-shadow-lg">
                Самые актуальные события в мире искусственного интеллекта, робототехники и космических технологий — в одном месте.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent shadow-2xl">
                  Читать новости
                </button>
              </div>
            </div>
          </div>
        </div>
        <NewsGrid />
      </div>
    </main>
  )
}

export default Index