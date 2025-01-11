import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './CustomSelect'; // Adjust path as needed

// Common language codes with their display names
export const LANGUAGE_OPTIONS = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'es-MX', name: 'Spanish (Mexico)' },
  { code: 'fr-FR', name: 'French (France)' },
  { code: 'de-DE', name: 'German (Germany)' },
  { code: 'it-IT', name: 'Italian (Italy)' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)' },
  { code: 'ru-RU', name: 'Russian (Russia)' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'ja-JP', name: 'Japanese (Japan)' },
  { code: 'ar-SA', name: 'Arabic (Saudi Arabia)' }
];

const LanguageSelect = ({ value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <label className="block font-medium text-sm">Idioma</label>
      <Select 
        value={value} 
        onValueChange={(selectedValue) => onChange({ inLanguage: selectedValue })}
      >
        <SelectTrigger 
          className={`w-full ${error ? 'border-red-500' : ''}`}
          placeholder="Seleccionar idioma"
        >
          <SelectValue>
            {LANGUAGE_OPTIONS.find(lang => lang.code === value)?.name || 'Seleccionar idioma'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {LANGUAGE_OPTIONS.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default LanguageSelect;