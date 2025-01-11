// utils/schemaFields.js
export const schemaFields = {
    Article: {
      required: ['headline', 'author', 'datePublished'],
      fields: {
        headline: { type: 'text', label: 'Título del artículo' },
        image: { type: 'url', label: 'URL de la imagen principal' },
        author: { type: 'text', label: 'Autor' },
        datePublished: { type: 'date', label: 'Fecha de publicación' },
        dateModified: { type: 'date', label: 'Fecha de modificación' },
        publisher: { type: 'text', label: 'Editor' }
      }
    },
  
    BreadcrumbList: {
      required: ['itemListElement'],
      fields: {
        itemListElement: {
          type: 'textarea',
          label: 'Elementos de navegación (formato JSON)',
          placeholder: '[{"position": 1, "name": "Inicio", "item": "https://ejemplo.com"}]'
        }
      }
    },
  
    Event: {
      required: ['name', 'startDate', 'location'],
      fields: {
        name: { type: 'text', label: 'Nombre del evento' },
        startDate: { type: 'datetime-local', label: 'Fecha y hora de inicio' },
        endDate: { type: 'datetime-local', label: 'Fecha y hora de fin' },
        location: { type: 'text', label: 'Ubicación' },
        description: { type: 'textarea', label: 'Descripción' },
        image: { type: 'url', label: 'URL de la imagen' },
        price: { type: 'number', label: 'Precio' },
        priceCurrency: { type: 'text', label: 'Moneda' },
        availability: {
          type: 'select',
          label: 'Disponibilidad',
          options: ['InStock', 'SoldOut', 'PreOrder']
        }
      }
    },
  
    FAQPage: {
      required: ['mainEntity'],
      fields: {
        mainEntity: {
          type: 'textarea',
          label: 'Preguntas y Respuestas (formato JSON)',
          placeholder: '[{"name": "Pregunta 1", "acceptedAnswer": {"text": "Respuesta 1"}}]'
        }
      }
    },
  
    HowTo: {
      required: ['name', 'step'],
      fields: {
        name: { type: 'text', label: 'Nombre del tutorial' },
        description: { type: 'textarea', label: 'Descripción' },
        totalTime: { type: 'text', label: 'Tiempo total (formato ISO, ej: PT2H30M)' },
        estimatedCost: { type: 'number', label: 'Costo estimado' },
        currency: { type: 'text', label: 'Moneda del costo' },
        supply: { type: 'textarea', label: 'Materiales necesarios (uno por línea)' },
        tool: { type: 'textarea', label: 'Herramientas necesarias (una por línea)' },
        step: {
          type: 'textarea',
          label: 'Pasos (formato JSON)',
          placeholder: '[{"name": "Paso 1", "text": "Descripción del paso 1"}]'
        }
      }
    },
  
    JobPosting: {
      required: ['title', 'description', 'hiringOrganization', 'datePosted'],
      fields: {
        title: { type: 'text', label: 'Título del trabajo' },
        description: { type: 'textarea', label: 'Descripción' },
        datePosted: { type: 'date', label: 'Fecha de publicación' },
        validThrough: { type: 'date', label: 'Válido hasta' },
        employmentType: {
          type: 'select',
          label: 'Tipo de empleo',
          options: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'INTERN', 'VOLUNTEER', 'PER_DIEM', 'OTHER']
        },
        hiringOrganization: { type: 'text', label: 'Empresa contratante' },
        jobLocation: { type: 'text', label: 'Ubicación del trabajo' },
        baseSalary: { type: 'number', label: 'Salario base' },
        salaryCurrency: { type: 'text', label: 'Moneda del salario' }
      }
    },
  
    LocalBusiness: {
      required: ['name', 'address'],
      fields: {
        name: { type: 'text', label: 'Nombre del negocio' },
        image: { type: 'url', label: 'URL de la imagen' },
        address: { type: 'textarea', label: 'Dirección completa' },
        telephone: { type: 'text', label: 'Teléfono' },
        email: { type: 'email', label: 'Correo electrónico' },
        openingHours: { type: 'text', label: 'Horario de apertura (ej: Mo-Fr 09:00-17:00)' },
        priceRange: { type: 'text', label: 'Rango de precios (ej: $$$)' }
      }
    },
  
    Organization: {
      required: ['name'],
      fields: {
        name: { type: 'text', label: 'Nombre de la organización' },
        url: { type: 'url', label: 'URL del sitio web' },
        logo: { type: 'url', label: 'URL del logo' },
        description: { type: 'textarea', label: 'Descripción' },
        telephone: { type: 'text', label: 'Teléfono' },
        email: { type: 'email', label: 'Correo electrónico' },
        address: { type: 'textarea', label: 'Dirección completa' }
      }
    },
  
    Person: {
      required: ['name'],
      fields: {
        name: { type: 'text', label: 'Nombre completo' },
        jobTitle: { type: 'text', label: 'Cargo' },
        telephone: { type: 'text', label: 'Teléfono' },
        email: { type: 'email', label: 'Correo electrónico' },
        url: { type: 'url', label: 'URL del perfil' },
        image: { type: 'url', label: 'URL de la imagen' },
        description: { type: 'textarea', label: 'Biografía' }
      }
    },
  
    Product: {
      required: ['name', 'description', 'offers'],
      fields: {
        name: { type: 'text', label: 'Nombre del producto' },
        description: { type: 'textarea', label: 'Descripción' },
        image: { type: 'url', label: 'URL de la imagen' },
        brand: { type: 'text', label: 'Marca' },
        sku: { type: 'text', label: 'SKU' },
        gtin: { type: 'text', label: 'GTIN/EAN/UPC' },
        price: { type: 'number', label: 'Precio' },
        priceCurrency: { type: 'text', label: 'Moneda' },
        availability: {
          type: 'select',
          label: 'Disponibilidad',
          options: ['InStock', 'OutOfStock', 'PreOrder', 'Discontinued']
        },
        review: { type: 'textarea', label: 'Reseñas (formato JSON)' }
      }
    },
  
    Recipe: {
      required: ['name', 'recipeIngredient', 'recipeInstructions'],
      fields: {
        name: { type: 'text', label: 'Nombre de la receta' },
        image: { type: 'url', label: 'URL de la imagen' },
        description: { type: 'textarea', label: 'Descripción' },
        author: { type: 'text', label: 'Autor' },
        prepTime: { type: 'text', label: 'Tiempo de preparación (ej: PT15M)' },
        cookTime: { type: 'text', label: 'Tiempo de cocción (ej: PT1H)' },
        totalTime: { type: 'text', label: 'Tiempo total (ej: PT1H15M)' },
        recipeYield: { type: 'text', label: 'Porciones' },
        recipeIngredient: { type: 'textarea', label: 'Ingredientes (uno por línea)' },
        recipeInstructions: { type: 'textarea', label: 'Instrucciones (una por línea)' },
        nutrition: { type: 'textarea', label: 'Información nutricional' }
      }
    },
  
    VideoObject: {
      required: ['name', 'description', 'uploadDate'],
      fields: {
        name: { type: 'text', label: 'Título del video' },
        description: { type: 'textarea', label: 'Descripción' },
        thumbnailUrl: { type: 'url', label: 'URL de la miniatura' },
        uploadDate: { type: 'date', label: 'Fecha de subida' },
        contentUrl: { type: 'url', label: 'URL del contenido' },
        embedUrl: { type: 'url', label: 'URL de incrustación' },
        duration: { type: 'text', label: 'Duración (ej: PT1H30M)' },
        author: { type: 'text', label: 'Autor' }
      }
    },
  
    WebSite: {
      required: ['name', 'url'],
      fields: {
        name: { type: 'text', label: 'Nombre del sitio web' },
        url: { type: 'url', label: 'URL del sitio' },
        description: { type: 'textarea', label: 'Descripción' },
        keywords: { type: 'textarea', label: 'Palabras clave (una por línea)' },
        author: { type: 'text', label: 'Autor' },
        publisher: { type: 'text', label: 'Editor' },
        inLanguage: { type: 'text', label: 'Idioma (ej: es-ES)' }
      }
    } 
  };
