import HeroSection        from './components/HeroSection'
import MarqueeSection     from './components/MarqueeSection'
import SolarVideoSection  from './components/SolarVideoSection'
import TransitionSection  from './components/TransitionSection'
import BasketballSection  from './components/basketball/BasketballSection'
import WhyUsSection       from './components/WhyUsSection'
import AboutSection       from './components/AboutSection'
import ServicesSection    from './components/ServicesSection'
import ProjectsSection    from './components/ProjectsSection'

function App() {
  return (
    <div style={{ overflowX: 'clip', backgroundColor: '#020202' }}>
      <HeroSection />
      <MarqueeSection />
      <SolarVideoSection />
      <TransitionSection />
      <BasketballSection />
      <WhyUsSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  )
}

export default App
