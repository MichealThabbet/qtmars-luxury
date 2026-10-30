import { useMemo, useState } from 'react'

const copticMonths = ['توت', 'أبيب', 'مسرى', 'بؤونة', 'برمهات', 'برمودة', 'بشنس', 'بيبه', 'أمشير', 'نسنا', 'سمباط', 'بيباط', 'مسرا']
const liturgicalColors = ['الأحمر', 'الأبيض', 'الذهبي', 'الأزرق']

const readingLibrary = {
  x1: {
    title: 'النور الذي لا ينطفئ',
    subtitle: 'قراءة اليوم الروحانية',
    text:
      'في قلب كل إنسان نارٌ تُلهمه بالصبر، والرحمة، والثقة في عظمة الله. اقرأ ببطء، واستمع إلى ما يفتح فيك من نورٍ روحاني داخل قلبك.',
    lesson: 'أن تزرع في قلبك الصبر والسكينة، لأن النهار الروحي يبدأ بصمت القلب.',
    season: 'القداس',
    color: 'الأحمر',
    memory: 'القديسين',
    gospel: 'مرقس ١٦',
    firstReading: 'العهد القديم',
    type: 'صلاة',
  },
  x2: {
    title: 'قوة الرجاء',
    subtitle: 'قراءة السكينة',
    text:
      'يستريح الروح عندما يترك التساؤل للرب، ويأخذ الراحة في وعده، لأن من يثق بالله لا ينهار أمام الشدائد.',
    lesson: 'الرجاء يمدّ النفس بقوة غير منظورة، وفيه يعلو القلب إلى السكينة.',
    season: 'القداس',
    color: 'الأبيض',
    memory: 'العذراء',
    gospel: 'لوقا ١',
    firstReading: 'الأمثال',
    type: 'عظة',
  },
  x3: {
    title: 'الرحمة تُشعل الطريق',
    subtitle: 'قراءة التسامح',
    text:
      'تتعلم الروح أن تنظر بعين الرحمة، فتحمل الخلاف، وتغفر بلا حساب، وتزهر في داخلك سلامٌ لا يفنى.',
    lesson: 'رحمة القلب تفتح أبواب النعمة في حياتك اليوم، وتخلّصك من ثقل الحقد.',
    season: 'السيرة',
    color: 'الذهبي',
    memory: 'أيام الصوم',
    gospel: 'متى ٥',
    firstReading: 'الأسفار',
    type: 'ترنيمة',
  },
  x4: {
    title: 'صلاة الفجر',
    subtitle: 'قراءة البسطاء',
    text:
      'أنت لا تحتاج إلى أن تخفي ضعفك، لأن الله يرحم قلبك كأمٍّ رحيمة، ويقودك في الطريق المشرق بشكلٍ لا تستطيع تخيله.',
    lesson: 'التواضع هو مفتاح النعمة، لأنه يرفعك إلى ما لا يراه العالم.',
    season: 'السيرة',
    color: 'الأزرق',
    memory: 'القديسين الصالحين',
    gospel: 'مرقس ١',
    firstReading: 'المزامير',
    type: 'صلاة',
  },
}

function deriveCopticDate(date) {
  const year = date.getFullYear()
  const monthIndex = ((date.getMonth() + 2 + date.getDate()) % 13)
  const day = ((date.getDate() + date.getMonth() + 1) % 30) || 30
  const copticYear = year - 293

  return {
    year: copticYear,
    month: copticMonths[monthIndex],
    day,
    label: `${copticMonths[monthIndex]} ${copticYear}`,
  }
}

function getReadingForDate(date) {
  const seed = date.getFullYear() + date.getMonth() + date.getDate()
  const key = `x${(seed % 4) + 1}`
  return readingLibrary[key]
}

const weekPreview = [
  { day: 'الاثنين', title: 'منارة النور' },
  { day: 'الثلاثاء', title: 'رحمة الرب' },
  { day: 'الأربعاء', title: 'الرجاء في الله' },
  { day: 'الخميس', title: 'قوة الصبر' },
  { day: 'الجمعة', title: 'سكون الروح' },
  { day: 'السبت', title: 'تأمل وهدوء' },
  { day: 'الأحد', title: 'عيد النعمة' },
]

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const copticDate = useMemo(() => deriveCopticDate(selectedDate), [selectedDate])
  const reading = useMemo(() => getReadingForDate(selectedDate), [selectedDate])

  const progressValue = Math.min(78, ((selectedDate.getDate() + selectedDate.getMonth()) % 80) + 20)
  const totalPages = 24 + (selectedDate.getDate() % 10)

  return (
    <div className="page-shell">
      <div className="bg-glow glow-one" />
      <div className="bg-glow glow-two" />

      <div className="app-frame">
        <header className="topbar">
          <div>
            <p className="kicker">Mosaic of daily grace</p>
            <h1>القطمارس</h1>
          </div>

          <button className="ghost-button">اليوم</button>
        </header>

        <main className="content-grid">
          <section className="hero card">
            <div className="hero-copy">
              <span className="badge">قراءة اليوم</span>
              <h2>{reading.title}</h2>
              <p>{reading.text}</p>

              <div className="meta-row">
                <div className="meta-pill">
                  ميلادى:{' '}
                  <strong>
                    {selectedDate.toLocaleDateString('ar-EG', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </strong>
                </div>
                <div className="meta-pill">
                  قبطي:{' '}
                  <strong>
                    {copticDate.day} {copticDate.month} {copticDate.year}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mini-calendar">
              <span className="mini-label">التاريخ</span>
              <div className="mini-date">{selectedDate.getDate()}</div>
              <div className="mini-month">
                {selectedDate.toLocaleDateString('ar-EG', { month: 'long' })}
              </div>
              <div className="mini-year">{selectedDate.getFullYear()}</div>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card card">
              <span>الصفحات</span>
              <strong>{totalPages}</strong>
            </div>
            <div className="stat-card card">
              <span>الهدف</span>
              <strong>30</strong>
            </div>
            <div className="stat-card card">
              <span>القداس</span>
              <strong>{reading.season}</strong>
            </div>
            <div className="stat-card card">
              <span>اللون</span>
              <strong>{reading.color}</strong>
            </div>
          </section>

          <section className="main-panel">
            <article className="card reading-card">
              <div className="section-head">
                <h3>القراءة</h3>
                <span className="dot" />
              </div>

              <div className="reading-body">
                <p className="reading-subtitle">{reading.subtitle}</p>
                <p>{reading.text}</p>
                <blockquote>{reading.lesson}</blockquote>
              </div>
            </article>

            <aside className="card side-card">
              <div className="section-head">
                <h3>تفاصيل اليوم</h3>
              </div>

              <ul className="detail-list">
                <li>
                  <span>نوع الخدمة</span>
                  <strong>{reading.type}</strong>
                </li>
                <li>
                  <span>اللون</span>
                  <strong>{reading.color}</strong>
                </li>
                <li>
                  <span>الذكرى</span>
                  <strong>{reading.memory}</strong>
                </li>
                <li>
                  <span>الإنجيل</span>
                  <strong>{reading.gospel}</strong>
                </li>
                <li>
                  <span>القراءة الأولى</span>
                  <strong>{reading.firstReading}</strong>
                </li>
              </ul>
            </aside>
          </section>

          <section className="card planner-card">
            <div className="planner-head">
              <div>
                <p className="kicker small">متابعة</p>
                <h3>التقدم الأسبوعي</h3>
              </div>
              <span className="pill">{Math.round(progressValue)}%</span>
            </div>

            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${progressValue}%` }} />
            </div>

            <div className="week-list">
              {weekPreview.map((item) => (
                <div className="week-item" key={item.day}>
                  <strong>{item.day}</strong>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="card selector-card">
            <div className="section-head">
              <h3>اختيار التاريخ</h3>
            </div>
            <input
              type="date"
              value={selectedDate.toISOString().slice(0, 10)}
              onChange={(event) => setSelectedDate(new Date(event.target.value))}
            />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
