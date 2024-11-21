import React, { useState } from 'react';
import { Input } from './Input';
import { Plus, Minus } from 'lucide-react';

const ArticleCard = ({ data, onChange, errors }) => {
  const [imageUrls, setImageUrls] = useState([data.image?.url || '']);

  const handleImageUrlsChange = (urls) => {
    setImageUrls(urls);
    onChange({
      ...data,
      image: {
        "@type": "ImageObject",
        url: urls[0] || '',
        width: data.image?.width || '',
        height: data.image?.height || ''
      }
    });
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    handleImageUrlsChange(newUrls);
  };

  const updateImageUrl = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    handleImageUrlsChange(newUrls);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Título"
        value={data.headline || ''}
        onChange={(e) => onChange({ ...data, headline: e.target.value })}
        error={errors?.headline}
        required
      />
      
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
        error={errors?.author}
        required
      />

      <div className="space-y-2">
        <h4 className="font-medium">Imágenes</h4>
        {imageUrls.map((url, index) => (
          <div key={index} className="flex space-x-2">
            <Input
              label={`URL de imagen ${index + 1}`}
              type="url"
              value={url}
              onChange={(e) => updateImageUrl(index, e.target.value)}
              error={errors?.image}
              required={index === 0}
            />
            {index > 0 && (
              <button
                onClick={() => removeImageUrl(index)}
                className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Minus size={20} />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addImageUrl}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
        >
          <Plus size={20} />
          <span>Agregar URL de imagen</span>
        </button>
      </div>

      <Input
        label="Ancho de la imagen"
        type="number"
        value={data.image?.width || ''}
        onChange={(e) => onChange({
          ...data,
          image: {
            ...data.image,
            width: e.target.value
          }
        })}
      />

      <Input
        label="Alto de la imagen"
        type="number"
        value={data.image?.height || ''}
        onChange={(e) => onChange({
          ...data,
          image: {
            ...data.image,
            height: e.target.value
          }
        })}
      />

      <Input
        label="Fecha de publicación"
        type="datetime-local"
        value={data.datePublished || ''}
        onChange={(e) => onChange({ ...data, datePublished: e.target.value })}
        error={errors?.datePublished}
        required
      />

      <Input
        label="Fecha de modificación"
        type="datetime-local"
        value={data.dateModified || ''}
        onChange={(e) => onChange({ ...data, dateModified: e.target.value })}
      />
    </div>
  );
};

export default ArticleCard;