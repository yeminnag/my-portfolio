import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import { killAllScrollTriggers } from './utils/scrollTriggerCleanup';

export default function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    return () => {
      killAllScrollTriggers();
    };
  }, [location.pathname]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Nav />
    </>
  );
}
