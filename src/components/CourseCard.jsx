import React from "react";
import { Input } from "./Input";
import { Plus, Minus } from "lucide-react";
import { schemaFields } from "../utils/schemaFields";

const CourseCard = ({ data, onChange }) => {
  // Obtenemos la configuración de los campos del schema
  const courseFields = schemaFields.Course.fields;

  // Manejar cambios en objetos anidados
  const handleNestedChange = (parentKey, childKey, value) => {
    const newData = {
      ...data,
      [parentKey]: {
        ...data[parentKey],
        "@type": parentKey === "provider" ? "Organization" : "Offer",
        [childKey]: value,
      },
    };
    onChange(newData);
  };

  // Manejar cambios en el provider
  const handleProviderChange = (field, value) => {
    const newProvider = {
      ...data.provider,
      "@type": "Organization",
      [field]: value,
    };
    onChange({
      ...data,
      provider: newProvider,
    });
  };

  // Manejar cambios en la oferta
  const handleOfferChange = (field, value) => {
    const newOffer = {
      ...data.offers,
      "@type": "Offer",
      [field]: value,
    };
    onChange({
      ...data,
      offers: newOffer,
    });
  };

  // Manejar cambios en las instancias del curso (array de objetos)
  const handleInstanceChange = (index, field, value, subfield = null) => {
    const newInstances = [...(data.hasCourseInstance || [])];

    if (subfield) {
      // Para campos anidados como location
      newInstances[index] = {
        ...newInstances[index],
        [field]: {
          ...newInstances[index]?.[field],
          "@type": field === "location" ? "Place" : undefined,
          [subfield]: value,
        },
      };
    } else {
      // Para campos simples
      newInstances[index] = {
        ...newInstances[index],
        "@type": "CourseInstance",
        [field]: value,
      };
    }

    // Asegurarnos de que 'location' esté correctamente formado
    if (field === "location") {
      newInstances[index].location = {
        "@type": "Place",
        name: value,
      };
    }

    onChange({
      ...data,
      hasCourseInstance: newInstances,
    });
  };

  // Agregar nueva instancia de curso
  const addInstance = () => {
    const newInstance = {
      "@type": "CourseInstance",
      name: "",
      startDate: "",
      endDate: "",
      location: {
        "@type": "Place",
        name: "",
      },
      courseMode: "",
      courseWorkLoad: "",
    };
    onChange({
      ...data,
      hasCourseInstance: [...(data.hasCourseInstance || []), newInstance],
    });
  };

  // Remover instancia de curso
  const removeInstance = (index) => {
    const newInstances = [...(data.hasCourseInstance || [])];
    newInstances.splice(index, 1);
    onChange({
      ...data,
      hasCourseInstance: newInstances,
    });
  };

  return (
    <div className="space-y-4">
      {/* Campos básicos del curso */}
      <Input
        label="Nombre del Curso"
        value={data.name || ""}
        onChange={(e) => onChange({ ...data, name: e.target.value })}
      />
      <Input
        label="Descripción"
        type="textarea"
        value={data.description || ""}
        onChange={(e) => onChange({ ...data, description: e.target.value })}
      />
      <Input
        label="Código del Curso"
        value={data.courseCode || ""}
        onChange={(e) => onChange({ ...data, courseCode: e.target.value })}
      />
      <Input
        label="URL"
        type="url"
        value={data.url || ""}
        onChange={(e) => onChange({ ...data, url: e.target.value })}
      />
      <Input
        label="Categoría"
        value={data.category || ""}
        onChange={(e) => onChange({ ...data, category: e.target.value })}
      />
      <Input
        label="Uso Educativo"
        value={data.educationalUse || ""}
        onChange={(e) => onChange({ ...data, educationalUse: e.target.value })}
      />

      {/* Sección del Proveedor */}
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium mb-2">Proveedor</h4>
        <Input
          label="Nombre del Proveedor"
          value={data.provider?.name || ""}
          onChange={(e) => handleProviderChange("name", e.target.value)}
        />
      </div>

      {/* Sección de Oferta */}
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium mb-2">Oferta</h4>
        <Input
          label="Precio"
          type="number"
          value={data.offers?.price || ""}
          onChange={(e) => handleOfferChange("price", e.target.value)}
        />
        <Input
          label="Moneda"
          value={data.offers?.priceCurrency || ""}
          onChange={(e) => handleOfferChange("priceCurrency", e.target.value)}
        />
        <Input
          label="URL de Disponibilidad"
          type="url"
          value={data.offers?.availability || ""}
          onChange={(e) => handleOfferChange("availability", e.target.value)}
        />
        <Input
          label="Categoría de la Oferta"
          value={data.offers?.category || ""}
          onChange={(e) => handleOfferChange("category", e.target.value)}
        />
      </div>

      {/* Sección de Instancias del Curso */}
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium mb-2">Instancias del Curso</h4>
        {(data.hasCourseInstance || []).map((instance, index) => (
          <div key={index} className="p-4 border rounded-md space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Instancia {index + 1}</h5>
              <button
                onClick={() => removeInstance(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Minus size={20} />
              </button>
            </div>
            <Input
              label="Nombre de la Instancia"
              value={instance.name || ""}
              onChange={(e) =>
                handleInstanceChange(index, "name", e.target.value)
              }
            />
            <Input
              label="Fecha de Inicio"
              type="date"
              value={instance.startDate || ""}
              onChange={(e) =>
                handleInstanceChange(index, "startDate", e.target.value)
              }
            />
            <Input
              label="Fecha de Fin"
              type="date"
              value={instance.endDate || ""}
              onChange={(e) =>
                handleInstanceChange(index, "endDate", e.target.value)
              }
            />
            <Input
              label="Ubicación"
              value={instance.location?.name || ""}
              onChange={(e) =>
                handleInstanceChange(index, "location", e.target.value)
              }
            />
            <Input
              label="Modo del Curso"
              type="select"
              options={["online", "presencial", "híbrido"]}
              value={instance.courseMode || ""}
              onChange={(e) =>
                handleInstanceChange(index, "courseMode", e.target.value)
              }
            />
            <Input
              label="Carga de Trabajo"
              value={instance.courseWorkLoad || ""}
              onChange={(e) =>
                handleInstanceChange(index, "courseWorkLoad", e.target.value)
              }
            />
          </div>
        ))}
        <button
          onClick={addInstance}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
        >
          <Plus size={20} />
          <span>Agregar Instancia</span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
