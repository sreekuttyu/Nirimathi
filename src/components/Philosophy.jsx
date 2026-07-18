import { Leaf, Sun, Minus } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const pillars = [
  {
    icon: Leaf,
    title: 'Nature',
    malayalam: 'പ്രകൃതി',
    description:
      'Every building begins with the land. We read the slope, the trees, the prevailing wind, and the path of monsoon water before a single line is drawn.',
  },
  {
    icon: Sun,
    title: 'Light',
    malayalam: 'വെളിച്ചം',
    description:
      'In Kerala, light is mercurial — from the piercing clarity of summer to the diffused silver of the monsoon. We design for every season of luminance.',
  },
  {
    icon: Minus,
    title: 'Simplicity',
    malayalam: 'ലാളിത്യം',
    description:
      'Restraint is not absence. It is the discipline to keep only what serves — so that space, material, and inhabitant can breathe and be fully present.',
  },
];

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#1F2B24' }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          left: '-20%',
          top: '-10%',
          background: 'radial-gradient(circle, rgba(138,106,69,0.08) 0%, transparent 65%)',
          animation: 'floatBlob 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          right: '-10%',
          bottom: '-5%',
          background: 'radial-gradient(circle, rgba(201,183,156,0.06) 0%, transparent 65%)',
          animation: 'floatBlob 18s ease-in-out infinite reverse',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0}>
            <span className="eyebrow block mb-6" style={{ color: '#8A6A45' }}>Our Ethos</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-display-md font-light"
              style={{ fontFamily: 'var(--font-display)', color: '#F6F2EA', maxWidth: '22ch', margin: '0 auto' }}
            >
              The three forces that{' '}
              <em style={{ fontStyle: 'italic', color: '#C9B79C' }}>guide every line</em>
              {' '}we draw
            </h2>
          </ScrollReveal>
        </div>

        {/* Glass cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={0.1 + i * 0.15}>
                <div
                  className="glass group relative overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col transition-all duration-700"
                  style={{
                    minHeight: 340,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                  }}
                >
                  {/* Malayalam watermark */}
                  <div
                    className="absolute -right-2 -bottom-4 pointer-events-none select-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(5rem, 10vw, 8rem)',
                      fontWeight: 300,
                      color: 'rgba(201,183,156,0.05)',
                      lineHeight: 1,
                    }}
                  >
                    {pillar.malayalam}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-8"
                    style={{ background: 'rgba(138,106,69,0.2)', border: '1px solid rgba(138,106,69,0.3)' }}
                  >
                    <Icon size={20} color="#8A6A45" strokeWidth={1.5} />
                  </div>

                  {/* Malayalam label */}
                  <div className="eyebrow mb-3" style={{ color: '#8A6A45' }}>{pillar.malayalam}</div>

                  {/* Title */}
                  <h3
                    className="mb-5"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                      fontWeight: 400,
                      color: '#F6F2EA',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mt-auto"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.55)' }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
