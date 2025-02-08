// TemplateView.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Template1 from './Template1';
import Template2 from './Template2';
import Template211 from './Template211';
import Template2 from './Template2';
import Template3 from './Template3';
import Template40 from './Template40';
import Template4 from './Template4';
import { savedTemplates } from '..../src/page/Dashboard'; 

const TemplateView = () => {
  const { templateId } = useParams();
  const template = savedTemplates[templateId];

  if (!template) {
    return <div className="container mt-4"><h2 className="mb-4">Template Not Found</h2></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">View Template</h2>
      {template.component === 'Template1' && <Template1 contactDetails={template.contactDetails} />}
      {template.component === 'Template2' && <Template2 contactDetails={template.contactDetails} />}
      {template.component === 'Template2' && <Template3 contactDetails={template.contactDetails} />}
      {template.component === 'Template40' && <Template40 contactDetails={template.contactDetails} />}
      {template.component === 'Template4' && <Template4 contactDetails={template.contactDetails} />}
      {template.component === 'Template211' && <Template211 contactDetails={template.contactDetails} />}
    </div>
  );
};

export default TemplateView;

  
