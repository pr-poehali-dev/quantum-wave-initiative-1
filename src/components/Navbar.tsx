import { useState, useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"

const AI_LINKS = {
  free: [
    { name: "ChatGPT (Free)", url: "https://chat.openai.com", desc: "GPT-4o mini" },
    { name: "Gemini", url: "https://gemini.google.com", desc: "Google" },
    { name: "Claude (Free)", url: "https://claude.ai", desc: "Anthropic" },
    { name: "Grok", url: "https://grok.com", desc: "xAI" },
    { name: "DeepSeek", url: "https://chat.deepseek.com", desc: "Китай" },
    { name: "Mistral", url: "https://chat.mistral.ai", desc: "Европа" },
  ],
  paid: [
    { name: "ChatGPT Plus", url: "https://chat.openai.com", desc: "GPT-4o · $20/мес" },
    { name: "Claude Pro", url: "https://claude.ai", desc: "Sonnet & Opus · $20/мес" },
    { name: "Gemini Advanced", url: "https://gemini.google.com", desc: "Ultra · $20/мес" },
    { name: "Midjourney", url: "https://midjourney.com", desc: "Генерация изображений" },
    { name: "Perplexity Pro", url: "https://perplexity.ai", desc: "Поиск с ИИ · $20/мес" },
    { name: "Runway", url: "https://runwayml.com", desc: "Генерация видео" },
  ],
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [aiMenuOpen, setAiMenuOpen] = useState(false)
  const [mobileAiOpen, setMobileAiOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAiMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`fixed top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full backdrop-blur-md md:flex border transition-all duration-300 ${
          isScrolled ? "max-w-4xl px-2 border-white/20 shadow-lg" : "max-w-6xl px-4 border-transparent shadow-none"
        } py-2`}
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: "1000px",
          background: isScrolled ? "rgba(15, 15, 15, 0.8)" : "transparent",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <a className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 ${isScrolled ? "ml-4" : ""}`} href="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg">FutureWave</span>
          </div>
        </a>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium md:flex">
          <a className="relative px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer" href="#ai">
            <span className="relative z-20">Искусственный интеллект</span>
          </a>
          <a className="relative px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer" href="#robotics">
            <span className="relative z-20">Робототехника</span>
          </a>
          <a className="relative px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer" href="#space">
            <span className="relative z-20">Космос</span>
          </a>

          {/* Dropdown нейросети */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAiMenuOpen(!aiMenuOpen)}
              className="flex items-center gap-1 px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Нейросети
              <Icon name="ChevronDown" size={14} className={`transition-transform duration-200 ${aiMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {aiMenuOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] rounded-2xl border border-white/15 shadow-2xl backdrop-blur-xl p-5"
                style={{ background: "rgba(10, 10, 20, 0.95)" }}
              >
                <div className="grid grid-cols-2 gap-5">
                  {/* Бесплатные */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Бесплатные</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {AI_LINKS.free.map((item) => (
                        <a
                          key={item.url + item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setAiMenuOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/10 transition-colors group"
                        >
                          <span className="text-sm text-white/80 group-hover:text-white">{item.name}</span>
                          <span className="text-xs text-white/30">{item.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Платные */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Платные</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {AI_LINKS.paid.map((item) => (
                        <a
                          key={item.url + item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setAiMenuOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/10 transition-colors group"
                        >
                          <span className="text-sm text-white/80 group-hover:text-white">{item.name}</span>
                          <span className="text-xs text-white/30">{item.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`fixed top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full backdrop-blur-md md:hidden px-4 py-3 border transition-all duration-300 ${
          isScrolled ? "border-white/20 shadow-lg" : "border-transparent shadow-none"
        }`}
        style={{
          background: isScrolled ? "rgba(15, 15, 15, 0.8)" : "transparent",
          left: "1rem",
          right: "1rem",
          width: "calc(100% - 2rem)",
        }}
      >
        <a className="flex items-center justify-center gap-2" href="/">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-white font-semibold">FutureWave</span>
        </a>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 transition-colors hover:bg-white/10"
          aria-label="Toggle menu"
          style={{ background: "rgba(255, 255, 255, 0.05)" }}
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div
            className="absolute top-24 left-4 right-4 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          >
            <nav className="flex flex-col space-y-2">
              <a href="#ai" onClick={() => setIsMobileMenuOpen(false)} className="text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                Искусственный интеллект
              </a>
              <a href="#robotics" onClick={() => setIsMobileMenuOpen(false)} className="text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                Робототехника
              </a>
              <a href="#space" onClick={() => setIsMobileMenuOpen(false)} className="text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                Космос
              </a>

              {/* Нейросети мобильное */}
              <button
                onClick={() => setMobileAiOpen(!mobileAiOpen)}
                className="flex items-center justify-between px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                Нейросети
                <Icon name="ChevronDown" size={18} className={`transition-transform duration-200 ${mobileAiOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileAiOpen && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-1.5 px-2 mb-2 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Бесплатные</span>
                  </div>
                  {AI_LINKS.free.map((item) => (
                    <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                      <span>{item.name}</span>
                      <span className="text-white/30 text-xs">{item.desc}</span>
                    </a>
                  ))}
                  <div className="flex items-center gap-1.5 px-2 mb-2 mt-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Платные</span>
                  </div>
                  {AI_LINKS.paid.map((item) => (
                    <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                      <span>{item.name}</span>
                      <span className="text-white/30 text-xs">{item.desc}</span>
                    </a>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
