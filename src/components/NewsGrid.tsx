const news = [
  {
    id: 1,
    category: "Искусственный интеллект",
    categoryColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    dot: "bg-violet-400",
    title: "GPT-5 установил новый рекорд на тестах по рассуждению",
    excerpt: "Новая модель OpenAI превзошла человеческий уровень в задачах математики, физики и логики — аналитики называют это «переломным моментом» в развитии ИИ.",
    date: "22 апреля 2026",
    readTime: "4 мин",
  },
  {
    id: 2,
    category: "Искусственный интеллект",
    categoryColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    dot: "bg-violet-400",
    title: "ИИ-агенты начали самостоятельно писать и тестировать код",
    excerpt: "Компания Anthropic представила систему, способную полностью автономно разрабатывать программное обеспечение без участия человека.",
    date: "21 апреля 2026",
    readTime: "5 мин",
  },
  {
    id: 3,
    category: "Робототехника",
    categoryColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    dot: "bg-cyan-400",
    title: "Boston Dynamics показал робота, способного работать 12 часов без подзарядки",
    excerpt: "Новое поколение Atlas оснащено твердотельными аккумуляторами и улучшенными сервоприводами — робот теперь может выполнять складские задачи целую смену.",
    date: "21 апреля 2026",
    readTime: "3 мин",
  },
  {
    id: 4,
    category: "Робототехника",
    categoryColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    dot: "bg-cyan-400",
    title: "Хирургический робот Da Vinci провёл первую полностью автономную операцию",
    excerpt: "В клинике Джонса Хопкинса робот без вмешательства хирурга успешно удалил опухоль. Эксперты обсуждают этические последствия этого прорыва.",
    date: "20 апреля 2026",
    readTime: "6 мин",
  },
  {
    id: 5,
    category: "Космос",
    categoryColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    dot: "bg-amber-400",
    title: "SpaceX успешно запустила первую миссию к астероиду с экипажем",
    excerpt: "Корабль Starship с четырьмя астронавтами отправился к астероиду Психея. Миссия продлится 18 месяцев и откроет эпоху коммерческой добычи ресурсов.",
    date: "20 апреля 2026",
    readTime: "5 мин",
  },
  {
    id: 6,
    category: "Космос",
    categoryColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    dot: "bg-amber-400",
    title: "Телескоп Джеймса Уэбба обнаружил следы воды на экзопланете в зоне обитаемости",
    excerpt: "Новые данные указывают на присутствие жидкой воды на поверхности планеты Kepler-452b — учёные называют открытие «важнейшим за последнее десятилетие».",
    date: "19 апреля 2026",
    readTime: "7 мин",
  },
]

export default function NewsGrid() {
  return (
    <section className="relative z-10 w-full px-5 sm:px-10 lg:px-20 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-white">Последние новости</h2>
          <span className="text-white/40 text-sm">Обновлено сегодня</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${item.categoryColor}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`}></span>
                  {item.category}
                </span>
              </div>

              <h3 className="text-white font-semibold text-lg leading-snug mb-3 group-hover:text-white/90 transition-colors">
                {item.title}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed flex-1">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                <span className="text-white/30 text-xs">{item.date}</span>
                <span className="text-white/30 text-xs">{item.readTime} чтения</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
