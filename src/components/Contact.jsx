import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

function InputField({ label, type = 'text', name, placeholder, required, as }) {
  const [focused, setFocused] = useState(false);

  const baseStyle = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: '0.9rem',
    color: '#F6F2EA',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    padding: '0.75rem 0',
    borderBottom: `1px solid ${focused ? '#C9B79C' : 'rgba(246,242,234,0.2)'}`,
    transition: 'border-color 0.3s',
    resize: 'vertical',
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="eyebrow"
        style={{ color: focused ? '#C9B79C' : 'rgba(246,242,234,0.4)', transition: 'color 0.3s' }}
      >
        {label}
        {required && <span style={{ color: '#8A6A45', marginLeft: 2 }}>*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={4}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...baseStyle, '::placeholder': { color: 'rgba(246,242,234,0.25)' } }}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#1F2B24' }}
    >
      {/* Blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          left: '-10%',
          bottom: '-10%',
          background: 'radial-gradient(circle, rgba(138,106,69,0.1) 0%, transparent 65%)',
          animation: 'floatBlob 22s ease-in-out infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal delay={0}>
            <span className="eyebrow block mb-4" style={{ color: '#8A6A45' }}>Begin a Conversation</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-display-md font-light"
              style={{ fontFamily: 'var(--font-display)', color: '#F6F2EA', maxWidth: '22ch', margin: '0 auto' }}
            >
              Let's build something{' '}
              <em style={{ fontStyle: 'italic', color: '#C9B79C' }}>together</em>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">

          {/* Form */}
          <ScrollReveal delay={0.1}>
            <div
              className="glass rounded-2xl p-8 md:p-12"
              style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,0.3)' }}
            >
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(138,106,69,0.2)', border: '1px solid rgba(138,106,69,0.4)' }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>✓</span>
                  </div>
                  <h3
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 400, color: '#F6F2EA', marginBottom: '0.75rem' }}
                  >
                    Message Received
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.55)', maxWidth: '32ch' }}>
                    We'll be in touch within two working days. Thank you for considering Nirmiti.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <InputField label="Your Name" name="name" placeholder="Arjun Menon" required />
                    <InputField label="Email Address" type="email" name="email" placeholder="arjun@email.com" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <InputField label="Phone Number" type="tel" name="phone" placeholder="+91 9876543210" />
                    <InputField label="Project Type" name="type" placeholder="Residential / Commercial" />
                  </div>
                  <InputField label="Your Vision" name="message" placeholder="Tell us about your project — location, scale, timeline, and what matters most to you..." as="textarea" />

                  <button
                    type="submit"
                    className="group self-start flex items-center gap-3 px-8 py-4 rounded-full text-[11px] uppercase tracking-[0.3em] transition-all duration-400"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      background: '#8A6A45',
                      color: '#F6F2EA',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#7a5c38')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#8A6A45')}
                  >
                    Send Enquiry
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Info + Map */}
          <div className="flex flex-col gap-8">
            {/* Studio Details */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-6">
                <h3
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: '#F6F2EA', letterSpacing: '-0.01em' }}
                >
                  Nirmiti Studio
                </h3>
                <div className="flex flex-col gap-5">
                  {[
                    { icon: MapPin, label: 'Address', value: '42, Marine Drive Road\nErnakulam, Kochi — 682031\nKerala, India' },
                    { icon: Phone, label: 'Phone', value: '+91 484 234 5678' },
                    { icon: Mail, label: 'Email', value: 'studio@nirmiti.in' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(138,106,69,0.15)', border: '1px solid rgba(138,106,69,0.25)' }}
                      >
                        <Icon size={15} color="#8A6A45" />
                      </div>
                      <div>
                        <div className="eyebrow mb-1" style={{ color: 'rgba(246,242,234,0.35)' }}>{label}</div>
                        <p
                          className="text-sm"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.65)', whiteSpace: 'pre-line', lineHeight: 1.7 }}
                        >
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Map */}
            <ScrollReveal delay={0.3}>
              <div
                className="overflow-hidden rounded-xl"
                style={{ height: 220, border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <iframe
                  title="Nirmiti Studio Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'saturate(0.3) brightness(0.7) contrast(1.1)' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.24,9.95,76.30,9.98&layer=mapnik&marker=9.9666,76.2711"
                />
              </div>
            </ScrollReveal>

            {/* Working hours */}
            <ScrollReveal delay={0.35}>
              <div
                className="glass rounded-xl p-5"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="eyebrow mb-3" style={{ color: 'rgba(246,242,234,0.35)' }}>Studio Hours</div>
                <div className="flex justify-between text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.55)' }}>
                  <span>Mon – Fri</span><span>9:00 am – 6:00 pm</span>
                </div>
                <div className="flex justify-between text-sm mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.55)' }}>
                  <span>Saturday</span><span>10:00 am – 2:00 pm</span>
                </div>
                <div className="flex justify-between text-sm mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(246,242,234,0.3)' }}>
                  <span>Sunday</span><span>Closed</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
