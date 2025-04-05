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
import Template67 from './Template67';
import Template9 from './Template9';
import Template33 from './Template33';
import Template78 from './Template78';
import Template48 from './Template48';
import Template51 from './Template51';
import Template53 from './Template53';
import Template73 from './Template73';
import Template75 from './Template75';
import Template21 from './Template21';
import Template86 from './Template86';
import Template59 from './Template59';

import Template6 from './Template6';
import Template7 from './Template7';
import Template8 from './Template8';

import Template12 from './Template12';
import Template13 from './Template13';
import Template14 from './Template14';

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
      {template.component === 'Template3' && <Template3 contactDetails={template.contactDetails} />}
      {template.component === 'Template40' && <Template40 contactDetails={template.contactDetails} />}
      {template.component === 'Template4' && <Template4 contactDetails={template.contactDetails} />}
      {template.component === 'Template211' && <Template211 contactDetails={template.contactDetails} />}
      {template.component === 'Template67' && <Template67 contactDetails={template.contactDetails} />}
      {template.component === 'Template9' && <Template9 contactDetails={template.contactDetails} />}
      {template.component === 'Template33' && <Template33 contactDetails={template.contactDetails} />}
      {template.component === 'Template78' && <Template78 contactDetails={template.contactDetails} />}
      {template.component === 'Template48' && <Template48 contactDetails={template.contactDetails} />}
      {template.component === 'Template51' && <Template51 contactDetails={template.contactDetails} />}
      {template.component === 'Template53' && <Template53 contactDetails={template.contactDetails} />}
      {template.component === 'Template73' && <Template73 contactDetails={template.contactDetails} />}
      {template.component === 'Template75' && <Template75 contactDetails={template.contactDetails} />}
      {template.component === 'Template21' && <Template21 contactDetails={template.contactDetails} />}
      {template.component === 'Template86' && <Template86 contactDetails={template.contactDetails} />}
      {template.component === 'Template59' && <Template59 contactDetails={template.contactDetails} />}
     
      {template.component === 'Template6' && <Template6 contactDetails={template.contactDetails} />}
      {template.component === 'Template7' && <Template7 contactDetails={template.contactDetails} />}
      {template.component === 'Template8' && <Template8 contactDetails={template.contactDetails} />}
     
      {template.component === 'Template12' && <Template12 contactDetails={template.contactDetails} />}
      {template.component === 'Template13' && <Template13 contactDetails={template.contactDetails} />}
      {template.component === 'Template14' && <Template14 contactDetails={template.contactDetails} />}
     
    </div>
  );
};

export default TemplateView;

  
