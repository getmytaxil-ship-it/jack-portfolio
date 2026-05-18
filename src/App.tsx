import HeroSection       from './components/HeroSection'
import MarqueeSection    from './components/MarqueeSection'
import BasketballSection from './components/basketball/BasketballSection'
import WhyUsSection      from './components/WhyUsSection'
import AboutSection      from './components/AboutSection'
import ServicesSection   from './components/ServicesSection'
import ProjectsSection   from './components/ProjectsSection'

function App() {
  return (
    <div style={{ overflowX: 'clip', backgroundColor: '#0c0c0c' }}>
      <HeroSection />
      <MarqueeSection />
      <BasketballSection />
      <WhyUsSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  )
}

export default App
