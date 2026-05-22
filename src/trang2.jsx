import { useEffect, useMemo, useState } from 'react'

const links = [
  { label: 'Khởi đầu', icon: '■' },
  { label: 'Biện chứng', icon: '■', active: true },
  { label: 'Kết nối', icon: '■' },
  { label: 'Tổng kết', icon: '■' },
]

const relationships = [
  {
    title: 'Không gian và Thời gian',
    summary: 'Mọi sự vật chỉ có thể tồn tại trong những điều kiện không gian và thời gian xác định.',
    example: 'Một khu rừng phát triển theo mùa, khí hậu, địa hình và nhịp thay đổi của hệ sinh thái.',
  },
  {
    title: 'Bản chất và Hiện tượng',
    summary: 'Hiện tượng là bề ngoài biểu hiện của bản chất bên trong. Muốn hiểu đúng phải đi sâu vào quan hệ ẩn phía sau.',
    example: 'Một đợt tăng trưởng kinh tế có thể che giấu bất bình đẳng hoặc áp lực tài nguyên.',
  },
  {
    title: 'Nguyên nhân và Kết quả',
    summary: 'Sự vật không tự nhiên mà có, mà xuất hiện từ chuỗi nguyên nhân và dẫn đến những hệ quả tiếp nối.',
    example: 'Phá rừng làm giảm độ ẩm đất, tăng xói mòn và ảnh hưởng đến toàn bộ chuỗi thức ăn.',
  },
]

const comparisonRows = [
  ['Tính liên hệ', 'Nhấn mạnh biện chứng trong tự nhiên', 'Nhấn mạnh phép biện chứng của lịch sử và xã hội'],
  ['Nguồn gốc', 'Quan sát tự nhiên, khoa học thực chứng', 'Phê phán và kế thừa Hegel'],
  ['Trọng tâm', 'Mối tương tác vật chất', 'Quan hệ giữa vật chất, lao động, xã hội'],
]

function Trang2() {
  const [openIndex, setOpenIndex] = useState(null)
  const [showExample, setShowExample] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
      setScrollProgress(progress)
      setShowTop(window.scrollY > 300)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const progressStyle = useMemo(() => ({ width: `${scrollProgress}%` }), [scrollProgress])

  return (
    <div className="min-h-screen bg-neutral-900 text-zinc-100">
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-white/5">
        <div className="h-full bg-cyan-400 transition-all" style={progressStyle} />
      </div>

      <header className="fixed inset-x-0 top-1 z-40 border-b border-white/10 bg-neutral-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-20">
          <div className="text-lg text-cyan-400 [font-family:'EB_Garamond']">Mối liên hệ vô hình</div>
          <nav className="hidden gap-7 text-xs font-medium uppercase tracking-wider text-neutral-300 md:flex">
            {['Engels', 'Hệ thống', 'Mạng lưới', 'Triết học'].map((item, index) => (
              <span key={item} className={index === 1 ? 'border-b border-cyan-400 text-cyan-400' : ''}>
                {item}
              </span>
            ))}
          </nav>
          <button className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-400">
            Khám phá
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl gap-8 px-6 pb-16 pt-24 lg:px-20">
        <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-zinc-950/90 p-6 backdrop-blur-xl lg:block">
          <div className="mb-8">
            <div className="text-cyan-50 [font-family:'EB_Garamond']">Hệ thống</div>
            <div className="text-xs font-medium uppercase tracking-wider text-neutral-400">Mạng lưới vạn vật</div>
          </div>
          <div className="space-y-4 text-sm">
            {links.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 ${item.active ? 'bg-cyan-50/5 text-cyan-400' : 'text-gray-700'}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex-1 space-y-24">
          <article className="overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
            <div className="p-10 lg:p-16">
              <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-400">
                Nguyên lý
              </div>
              <h1 className="mt-6 text-4xl text-cyan-50 [font-family:'EB_Garamond'] md:text-5xl">Mối liên hệ phổ biến</h1>
              <p className="mt-6 max-w-3xl border-l-2 border-cyan-400 pl-4 text-lg leading-7 text-neutral-300">
                Mọi sự vật, hiện tượng trong thế giới không tồn tại biệt lập, tách rời nhau mà luôn luôn có sự tác động qua lại, chuyển hóa lẫn nhau trong một chỉnh thể thống nhất.
              </p>
            </div>
          </article>

          <section>
            <div className="mb-6 border-b border-white/10 pb-4 text-cyan-50 [font-family:'EB_Garamond']">1.3 Phân biệt 5 loại mối liên hệ</div>
            <div className="space-y-2">
              {relationships.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={item.title} className="overflow-hidden rounded-sm border border-white/10 bg-zinc-900">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-white/5"
                    >
                      <span className="flex items-center gap-4 text-base font-medium text-zinc-200">
                        <span className="h-5 w-5 bg-cyan-400" />
                        {item.title}
                      </span>
                      <span className="text-cyan-400">{isOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/10 px-6 py-5 text-neutral-300">
                        <p>{item.summary}</p>
                        <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-neutral-200">
                          Ví dụ: {item.example}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          <section>
            <div className="mb-6 border-b border-white/10 pb-4 text-cyan-50 [font-family:'EB_Garamond']">Table so sánh Hegel vs Marx-Engels</div>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="min-w-[720px] w-full border-collapse bg-zinc-900 text-left">
                <thead className="bg-white/5 text-xs uppercase tracking-wider text-neutral-300">
                  <tr>
                    <th className="px-6 py-4">Khía cạnh</th>
                    <th className="px-6 py-4">Hegel</th>
                    <th className="px-6 py-4">Marx-Engels</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row[0]} className="border-t border-white/10 hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-zinc-200">{row[0]}</td>
                      <td className="px-6 py-4 text-neutral-300">{row[1]}</td>
                      <td className="px-6 py-4 text-neutral-300">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-lg border border-white/10 bg-zinc-900 p-6 hover:border-cyan-400/30">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl text-cyan-400 [font-family:'EB_Garamond']">Ví dụ sinh viên</h2>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-300">
                  <span>Hiện/Ẩn ví dụ</span>
                  <button
                    type="button"
                    onClick={() => setShowExample((value) => !value)}
                    className={`relative h-6 w-11 rounded-full transition ${showExample ? 'bg-cyan-400' : 'bg-white/20'}`}
                    aria-pressed={showExample}
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-neutral-900 transition ${showExample ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </label>
              </div>
              <p className="mt-4 text-neutral-300">Hover để thấy liên hệ nội tại/bên ngoài giữa học tập, sức khỏe và môi trường sống.</p>
              {showExample && (
                <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-neutral-200 hover:bg-cyan-400/10">
                  Ví dụ: Một sinh viên học tốt khi có sự kết nối giữa thời gian biểu, động lực nội tại, hỗ trợ từ gia đình và điều kiện xã hội.
                </div>
              )}
            </article>

            <article className="rounded-lg border border-white/10 bg-zinc-900 p-6">
              <h2 className="text-xl text-cyan-400 [font-family:'EB_Garamond']">Ghi chú đọc</h2>
              <p className="mt-4 text-neutral-300">Thanh tiến độ phía trên theo dõi % đọc trang, và nút quay lại đầu trang sẽ hiện khi cuộn xuống đủ xa.</p>
            </article>
          </section>
        </section>
      </main>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 shadow-lg"
        >
          Back to top
        </button>
      )}
    </div>
  )
}

export default Trang2
