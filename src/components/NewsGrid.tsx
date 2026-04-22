import { useState, useEffect } from "react"

const NEWS_API_URL = "https://functions.poehali.dev/cee2cc19-a216-45ec-8a38-670b643911bf"

const CATEGORY_STYLES: Record<string, { color: string; dot: string }> = {
  ai: { color: "text-violet-400 bg-violet-400/10 border-violet-400/20", dot: "bg-violet-400" },
  robotics: { color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", dot: "bg-cyan-400" },
  space: { color: "text-amber-400 bg-amber-400/10 border-amber-400/20", dot: "bg-amber-400" },
}

const filters = [
  { label: "Все", value: "all", activeClass: "bg-white text-black", dotClass: "" },
  { label: "Искусственный интеллект", value: "ai", activeClass: "bg-violet-500/20 text-violet-300 border-violet-400/40", dotClass: "bg-violet-400" },
  { label: "Робототехника", value: "robotics", activeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40", dotClass: "bg-cyan-400" },
  { label: "Космос", value: "space", activeClass: "bg-amber-500/20 text-amber-300 border-amber-400/40", dotClass: "bg-amber-400" },
]

interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  source: string
  url: string
  image: string
  category: string
  categoryKey: string
}

function formatDate(dateStr: string) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}

export default function NewsGrid() {
  const [active, setActive] = useState("all")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch(`${NEWS_API_URL}?category=${active}&pageSize=12`)
      .then((r) => r.json())
      .then((data) => {
        setArticles(data.articles || [])
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [active])

  return (
    <section className="relative z-10 w-full px-5 sm:px-10 lg:px-20 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Последние новости</h2>
          <span className="text-white/40 text-sm">Обновляется в реальном времени</span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                active === f.value
                  ? f.activeClass + " border-transparent"
                  : "border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
              }`}
            >
              {f.dotClass && <span className={`h-1.5 w-1.5 rounded-full ${f.dotClass}`}></span>}
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 animate-pulse">
                <div className="h-4 w-28 bg-white/10 rounded-full mb-4"></div>
                <div className="h-5 bg-white/10 rounded mb-2"></div>
                <div className="h-5 w-3/4 bg-white/10 rounded mb-4"></div>
                <div className="h-3 bg-white/5 rounded mb-1"></div>
                <div className="h-3 w-2/3 bg-white/5 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16 text-white/40">
            Не удалось загрузить новости. Попробуйте обновить страницу.
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((item) => {
              const style = CATEGORY_STYLES[item.categoryKey] || CATEGORY_STYLES.ai
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer no-underline"
                >
                  {item.image && (
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${style.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`}></span>
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-lg leading-snug mb-3 group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                    <span className="text-white/30 text-xs">{formatDate(item.date)}</span>
                    <span className="text-white/30 text-xs">{item.source}</span>
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
