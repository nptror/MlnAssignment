const networkCards = [
  {
    title: 'Hệ sinh thái ngầm',
    text: 'Mạng lưới rễ cây và nấm rễ kết nối toàn bộ khu rừng, chia sẻ tài nguyên và thông tin, minh họa hoàn hảo cho sự phụ thuộc lẫn nhau.',
    tags: ['Rễ cây', 'Nấm', 'Dinh dưỡng'],
    image: 'https://placehold.co/355x170',
  },
  {
    title: 'Cộng hưởng toàn cầu',
    text: 'Sự kiện thiên nhiên tác động trực tiếp đến cấu trúc xã hội loài người. Một cơn bão có thể định hình lại chuỗi cung ứng và lối sống đô thị.',
    tags: ['Bão', 'Mạng lưới', 'Đô thị'],
    image: 'https://placehold.co/355x170',
  },
]

function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-zinc-100">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-stone-900/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-20">
          <div className="text-2xl font-semibold tracking-wide text-cyan-400 [text-shadow:_0_0_10px_rgb(0_245_255_/_0.5)]">
            Mối liên hệ vô hình
          </div>
          <nav className="hidden items-center gap-10 text-xs font-medium uppercase tracking-wider text-neutral-300 md:flex">
            <span>Engels</span>
            <span className="border-b border-cyan-400 text-cyan-400">Hệ thống</span>
            <span>Mạng lưới</span>
            <span>Triết học</span>
          </nav>
          <button className="rounded-xl border border-cyan-400/40 px-6 py-2 text-xs font-medium uppercase tracking-wider text-cyan-400">
            Khám phá
          </button>
        </div>
      </header>

      <main className="pt-[75px]">
        <section className="relative overflow-hidden">
          <div className="mx-auto flex min-h-[760px] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-20">
            <p className="max-w-3xl border-l-2 border-cyan-400/50 pl-8 pt-2.5 text-3xl font-normal text-zinc-200 [font-family:'EB_Garamond']">
              &quot;Trong tự nhiên, không có gì xảy ra một mình.&quot;
            </p>
            <h1 className="mt-8 text-5xl font-bold leading-tight text-cyan-400 drop-shadow-[0_0_20px_rgba(0,245,255,0.3)] md:text-7xl [font-family:'EB_Garamond']">
              Thế giới như một mạng lưới
            </h1>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.35em] text-neutral-300">
              Friedrich Engels
            </p>
            <button className="mt-8 rounded-none bg-cyan-400 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-900 shadow-[0_0_15px_rgba(0,245,255,0.4)]">
              Khám phá ngay
            </button>
          </div>
        </section>

        <section className="border-y border-white/10 bg-zinc-900/50 px-6 py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h2 className="text-5xl font-semibold text-zinc-200 [font-family:'EB_Garamond']">
                Mạng Lưới Sự Sống
              </h2>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
                Các khía cạnh của sự liên kết
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {networkCards.map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden border border-white/10 bg-stone-900/70 backdrop-blur-xl"
                >
                  <img src={card.image} alt="" className="h-44 w-full object-cover" />
                  <div className="space-y-4 p-6">
                    <h3 className="text-2xl font-normal text-cyan-400 [font-family:'EB_Garamond']">
                      {card.title}
                    </h3>
                    <p className="text-base leading-6 text-neutral-300">{card.text}</p>
                    <div className="flex flex-wrap gap-2 text-xs font-medium tracking-wide text-neutral-300">
                      {card.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
