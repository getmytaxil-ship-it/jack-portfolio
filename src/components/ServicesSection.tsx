import FadeIn from './FadeIn'

const services = [
  {
    number: '01',
    name: 'מידול תלת-מימד',
    description:
      'יצירת אובייקטים, דמויות וסביבות מפורטות המותאמות לצרכי הלקוח, אידיאלי למשחקים, מוצרים וויזואליזציות.',
  },
  {
    number: '02',
    name: 'רנדרינג',
    description:
      'רנדרים פוטו-ריאליסטיים באיכות גבוהה המציגים עיצובים עם תאורה מותאמת, טקסטורות וחומרים להחיות את הרעיונות.',
  },
  {
    number: '03',
    name: 'עיצוב תנועה',
    description:
      'אנימציות וגרפיקה דינמית המוסיפות אנרגיה וסיפור למותגים, מוצרים וחוויות דיגיטליות.',
  },
  {
    number: '04',
    name: 'בניית מותג',
    description:
      'יצירת זהויות ויזואליות מקיפות — מלוגואים ועד מערכות מותג שלמות — המעבירות נוכחות ברורה ובלתי נשכחת.',
  },
  {
    number: '05',
    name: 'עיצוב אתרים',
    description:
      'עיצוב אתרים נקיים, מודרניים וממוקדי המרה עם תשומת לב לפריסה, טיפוגרפיה וחוויית משתמש.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          שירותים
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                borderTop:
                  i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
              }}
            >
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0 select-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                dir="ltr"
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2 pt-1 sm:pt-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
