import Icon from "@/components/ui/icon"

const courses = [
  {
    id: 1,
    title: "ChatGPT для начинающих — полный курс",
    channel: "Артём Коломиец",
    url: "https://www.youtube.com/results?search_query=chatgpt+для+начинающих+курс",
    duration: "2 ч 15 мин",
    level: "Начинающий",
    levelColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    tag: "ChatGPT",
    tagColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    views: "850K",
  },
  {
    id: 2,
    title: "Midjourney — создаём изображения с нуля",
    channel: "AI Уроки",
    url: "https://www.youtube.com/results?search_query=midjourney+уроки+русский",
    duration: "1 ч 40 мин",
    level: "Начинающий",
    levelColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    tag: "Изображения",
    tagColor: "text-pink-400 bg-pink-400/10 border-pink-400/20",
    views: "620K",
  },
  {
    id: 3,
    title: "Stable Diffusion — локальная генерация изображений",
    channel: "Tech Обзоры",
    url: "https://www.youtube.com/results?search_query=stable+diffusion+урок+русский",
    duration: "3 ч 10 мин",
    level: "Средний",
    levelColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    tag: "Изображения",
    tagColor: "text-pink-400 bg-pink-400/10 border-pink-400/20",
    views: "430K",
  },
  {
    id: 4,
    title: "Машинное обучение — курс с нуля на Python",
    channel: "Диджитализируй!",
    url: "https://www.youtube.com/results?search_query=машинное+обучение+python+курс",
    duration: "8 ч 00 мин",
    level: "Продвинутый",
    levelColor: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    tag: "Python",
    tagColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    views: "1.2M",
  },
  {
    id: 5,
    title: "Промпт-инжиниринг — как правильно общаться с ИИ",
    channel: "Нейросети для людей",
    url: "https://www.youtube.com/results?search_query=промпт+инжиниринг+урок",
    duration: "55 мин",
    level: "Начинающий",
    levelColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    tag: "Промпты",
    tagColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    views: "390K",
  },
  {
    id: 6,
    title: "Sora, Runway, Pika — генерация видео с ИИ",
    channel: "Future Tech RU",
    url: "https://www.youtube.com/results?search_query=sora+runway+генерация+видео+ии",
    duration: "1 ч 20 мин",
    level: "Средний",
    levelColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    tag: "Видео",
    tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    views: "280K",
  },
  {
    id: 7,
    title: "Claude и GPT-4 для работы и бизнеса",
    channel: "AI Productivity",
    url: "https://www.youtube.com/results?search_query=claude+gpt+для+бизнеса+урок",
    duration: "1 ч 50 мин",
    level: "Начинающий",
    levelColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    tag: "Бизнес",
    tagColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    views: "510K",
  },
  {
    id: 8,
    title: "Нейросети в дизайне — Figma + AI плагины",
    channel: "Design Hub",
    url: "https://www.youtube.com/results?search_query=нейросети+дизайн+figma+ai",
    duration: "2 ч 05 мин",
    level: "Средний",
    levelColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    tag: "Дизайн",
    tagColor: "text-pink-400 bg-pink-400/10 border-pink-400/20",
    views: "340K",
  },
]

export default function CoursesSection() {
  return (
    <section className="relative z-10 w-full px-5 sm:px-10 lg:px-20 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Уроки по нейросетям</h2>
            <p className="text-white/40 text-sm">Подборка лучших курсов на YouTube</p>
          </div>
          <a
            href="https://www.youtube.com/results?search_query=нейросети+уроки+2026"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/50 hover:text-white hover:border-white/20 transition-all"
          >
            Все на YouTube
            <Icon name="ExternalLink" size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <a
              key={course.id}
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 no-underline"
            >
              {/* YouTube иконка */}
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                <Icon name="Youtube" size={20} className="text-red-400" />
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${course.levelColor}`}>
                  {course.level}
                </span>
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${course.tagColor}`}>
                  {course.tag}
                </span>
              </div>

              <h3 className="text-white font-semibold text-sm leading-snug mb-3 flex-1 group-hover:text-white/90 transition-colors">
                {course.title}
              </h3>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-1 text-white/30 text-xs">
                  <Icon name="Clock" size={11} />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1 text-white/30 text-xs">
                  <Icon name="Eye" size={11} />
                  {course.views}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
