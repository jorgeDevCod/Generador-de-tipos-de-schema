import React from 'react'; 
import { Input } from './Input';
import LanguageSelect from './LanguageSelect';

const WebSiteCard = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Nombre del sitio web"
        value={data.name || ''}
        onChange={(e) => onChange({ ...data, name: e.target.value })}
        error={errors?.name}
        required
      />
      
      <Input
        label="URL del sitio"
        type="url"
        value={data.url || ''}
        onChange={(e) => onChange({ ...data, url: e.target.value })}
        error={errors?.url}
        required
      />
      
      <Input
        label="Descripción"
        type="textarea"
        value={data.description || ''}
        onChange={(e) => onChange({ ...data, description: e.target.value })}
      />
      
      <div className="space-y-2">
        <h4 className="font-medium">Autor</h4>
        <Input
          label="Nombre del autor"
          value={data.author?.name || ''}
          onChange={(e) => onChange({
            ...data,
            author: {
              "@type": "Person",
              name: e.target.value
            }
          })}
        />
      </div>
      
      <LanguageSelect
        value={data.inLanguage || ''}
        onChange={onChange}
        error={errors?.inLanguage}
      />
    </div>
  );
};

export default WebSiteCard;