// TemplateSelector.jsx
import React, { useRef, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import templates from './templatesData';

function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = useCallback(() => {
    scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
  }, []);

  const scrollRight = useCallback(() => {
    scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        scrollLeft();
      } else if (e.key === 'ArrowRight') {
        scrollRight();
      }
    },
    [scrollLeft, scrollRight]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="d-flex align-items-center">
      <button className="btn btn-secondary me-2" onClick={scrollLeft}>
        &#9664;
      </button>

      <div
        className="selection-bar overflow-auto d-flex"
        ref={scrollContainerRef}
        style={{
          scrollBehavior: 'smooth',
          whiteSpace: 'nowrap',
          width: '700px',
          height: '230px',
          overflowX: 'hidden',
        }}
      >
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template ${selectedTemplate?.id === template.id ? 'active' : ''}`}
            onClick={() => onSelectTemplate(template)}
            style={{
              display: 'inline-block',
              cursor: 'pointer',
              margin: '0 5px',
            }}
          >
            <img src={template.src} alt={template.name} style={{ width: '100px', height: 'auto' }} />
          </div>
        ))}
      </div>

      <button className="btn btn-secondary ms-2" onClick={scrollRight}>
        &#9654;
      </button>
    </div>
  );
}

export default TemplateSelector;