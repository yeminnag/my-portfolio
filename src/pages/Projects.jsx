import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import GitHubProjects from '../components/GitHubProjects';
import ImageModal from '../components/ImageModal';
import ProjectGallery from '../components/ProjectGallery';
import { creativeProjects, PROJECTS_PAGE } from '../data/creativeProjects';
import { useScrambleTextRef } from '../hooks/useScrambleText';

export default function Projects() {
  const projectRef = useRef(null);
  const [modalImage, setModalImage] = useState(null);
  useScrambleTextRef(projectRef);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <ImageModal
        isOpen={modalImage !== null}
        imageUrl={modalImage}
        onClose={() => setModalImage(null)}
      />

      <div className="projects-page" ref={projectRef}>
        <header className="projects-hero">
          <h1 className="scramble">{PROJECTS_PAGE.title}</h1>
          <p>{PROJECTS_PAGE.subtitle}</p>
        </header>

        <div className="projects-list">
          {creativeProjects.map((section, index) => (
            <section
              key={section.id}
              className={`project-section project-split${
                index % 2 === 1 ? ' project-split-reverse' : ''
              }`}
              id={section.id}
            >
              <div className="section-text">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>

              <div className="section-media">
                {section.images && (
                  <ProjectGallery
                    images={section.images}
                    onImageClick={setModalImage}
                  />
                )}

                {section.video && (
                  <div className="video-compact">
                    <video controls poster={section.poster}>
                      <source src={section.video} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            </section>
          ))}

          <GitHubProjects reverse={creativeProjects.length % 2 === 1} />
        </div>
      </div>

      <Footer />
    </>
  );
}
