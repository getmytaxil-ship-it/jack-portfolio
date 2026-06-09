import HeroSection        from './components/HeroSection'
import MarqueeSection     from './components/MarqueeSection'
import TransitionSection  from './components/TransitionSection'
import BasketballSection  from './components/basketball/BasketballSection'
import WhyUsSection       from './components/WhyUsSection'
import AboutSection       from './components/AboutSection'
import ServicesSection    from './components/ServicesSection'
import ProjectsSection    from './components/ProjectsSection'
import ContactSection     from './components/ContactSection'
import FloatingWhatsApp   from './components/FloatingWhatsApp'

function App() {
  return (
    <div style={{ overflowX: 'clip', backgroundColor: '#020202' }}>
      <HeroSection />
      <MarqueeSection />
      <TransitionSection />
      <BasketballSection />
      <WhyUsSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
