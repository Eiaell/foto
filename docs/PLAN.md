# Plan: Plataforma de Edición de Fotos con IA

## Visión General

Crear la mejor plataforma online de edición de fotos con IA que integre múltiples proveedores (Nano Banana, ChatGPT/DALL-E, Midjourney*, Leonardo AI, FLUX, y más), con sistema de templates de prompts para consistencia de personajes y mejora automática de prompts.

---

## 1. Investigación de Proveedores de APIs

### 1.1 Proveedores con API Oficial Disponible

| Proveedor | Precio por Imagen | API Disponible | Características Especiales |
|-----------|-------------------|----------------|---------------------------|
| **DALL-E 3 (OpenAI)** | $0.04-$0.12 | ✅ Oficial | Buena calidad general, integración sencilla |
| **Nano Banana (Google)** | $0.02-$0.12 | ✅ Oficial | Excelente renderizado de texto, hasta 4K |
| **Leonardo AI** | ~$0.001-0.003/crédito | ✅ Oficial | Character Reference, LoRA, muy versátil |
| **FLUX (via Replicate)** | $0.025-$0.055 | ✅ Via Replicate | Alta calidad, fine-tuning disponible |
| **Stable Diffusion** | $0.002+ | ✅ Múltiples | Open source, máxima flexibilidad |
| **getimg.ai** | Por créditos | ✅ Oficial | Consistencia de personajes built-in |
| **fal.ai** | $0.0025-$0.05 | ✅ Oficial | Rápido, prompt expansion incluido |

### 1.2 Proveedores Problemáticos

| Proveedor | Estado | Alternativa |
|-----------|--------|-------------|
| **Midjourney** | ❌ Sin API pública | Solo Enterprise ($$$) o métodos no oficiales (riesgoso) |

### 1.3 Recomendación de Proveedores Prioritarios

**Fase 1 (MVP):**
1. **OpenAI DALL-E 3** - API más estable y documentada
2. **Nano Banana Pro** - Excelente para texto en imágenes
3. **Leonardo AI** - Mejor para consistencia de personajes

**Fase 2 (Expansión):**
4. **FLUX via Replicate** - Alta calidad artística
5. **getimg.ai** - Consistencia de personajes alternativa
6. **fal.ai** - Velocidad y costo

**Fase 3 (Avanzado):**
7. **Stable Diffusion self-hosted** - Control total, menor costo a escala

---

## 2. Arquitectura del Sistema

### 2.1 Stack Tecnológico

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  Next.js 15 + React 19 + TypeScript + Tailwind CSS + shadcn/ui │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
│            Next.js API Routes + Vercel Edge Functions           │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   Supabase    │    │    Stripe     │    │  AI Providers │
│  Auth + DB    │    │   Payments    │    │    Gateway    │
└───────────────┘    └───────────────┘    └───────────────┘
                                                  │
                    ┌─────────────────────────────┼─────────────────────────────┐
                    ▼                             ▼                             ▼
            ┌─────────────┐              ┌─────────────┐              ┌─────────────┐
            │   OpenAI    │              │   Google    │              │  Leonardo   │
            │   DALL-E    │              │ Nano Banana │              │     AI      │
            └─────────────┘              └─────────────┘              └─────────────┘
                    │                             │                             │
                    ▼                             ▼                             ▼
            ┌─────────────┐              ┌─────────────┐              ┌─────────────┐
            │  Replicate  │              │   fal.ai    │              │  getimg.ai  │
            │    FLUX     │              │             │              │             │
            └─────────────┘              └─────────────┘              └─────────────┘
```

### 2.2 Estructura de Carpetas Propuesta

```
/foto
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Rutas de autenticación
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/         # Dashboard del usuario
│   │   │   ├── generate/        # Generación de imágenes
│   │   │   ├── edit/            # Edición de imágenes
│   │   │   ├── gallery/         # Galería del usuario
│   │   │   ├── templates/       # Templates de prompts
│   │   │   └── settings/        # Configuración
│   │   ├── (marketing)/         # Landing pages
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── pricing/
│   │   │   └── features/
│   │   └── api/                 # API Routes
│   │       ├── generate/        # Endpoint de generación
│   │       ├── enhance-prompt/  # Mejora de prompts
│   │       ├── webhooks/        # Stripe webhooks
│   │       └── auth/            # Auth callbacks
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── generation/          # Componentes de generación
│   │   ├── editor/              # Editor de imágenes
│   │   └── shared/              # Componentes compartidos
│   ├── lib/
│   │   ├── ai-providers/        # Integraciones con APIs
│   │   │   ├── openai.ts
│   │   │   ├── google.ts
│   │   │   ├── leonardo.ts
│   │   │   ├── replicate.ts
│   │   │   └── unified.ts       # Interfaz unificada
│   │   ├── prompt-engine/       # Motor de prompts
│   │   │   ├── enhancer.ts
│   │   │   ├── templates.ts
│   │   │   └── character-consistency.ts
│   │   ├── supabase/
│   │   ├── stripe/
│   │   └── utils/
│   ├── hooks/
│   ├── types/
│   └── config/
├── public/
├── prisma/ o supabase/migrations/
└── ...config files
```

---

## 3. Funcionalidades Core

### 3.1 Sistema de Generación Unificado

```typescript
// Interfaz unificada para todos los proveedores
interface GenerationRequest {
  prompt: string;
  negativePrompt?: string;
  provider: 'openai' | 'google' | 'leonardo' | 'flux' | 'stable';
  model?: string;
  size: '512x512' | '1024x1024' | '1024x1792' | '1792x1024';
  style?: string;
  characterReference?: string; // URL de imagen de referencia
  enhancePrompt?: boolean;
}

interface GenerationResponse {
  imageUrl: string;
  provider: string;
  cost: number;
  metadata: {
    seed?: number;
    model: string;
    enhancedPrompt?: string;
  };
}
```

### 3.2 Sistema de Templates de Prompts

**Categorías de Templates:**
1. **Personajes Consistentes** - Mantener identidad visual
2. **Estilos Artísticos** - Anime, realista, ilustración, etc.
3. **Escenarios** - Fondos, ambientes, iluminación
4. **Composición** - Ángulos, encuadres, poses

**Estructura de Template:**
```typescript
interface PromptTemplate {
  id: string;
  name: string;
  category: 'character' | 'style' | 'scene' | 'composition';
  basePrompt: string;          // Prompt base del template
  variables: TemplateVariable[]; // Variables que el usuario puede cambiar
  characterLock?: {            // Para consistencia de personajes
    facialFeatures: string;
    bodyType: string;
    clothing: string;
    distinguishingFeatures: string;
  };
  negativePrompt?: string;
  recommendedProvider: string;
}
```

### 3.3 Sistema de Mejora de Prompts (Prompt Enhancement)

**Flujo de Mejora:**
```
Usuario escribe: "una chica en un jardín"
                     │
                     ▼
            ┌─────────────────┐
            │  Prompt Enhancer │
            │    (GPT-4/LLM)   │
            └─────────────────┘
                     │
                     ▼
Resultado: "A young woman with flowing auburn hair standing in
a sunlit English cottage garden, surrounded by blooming roses
and lavender, soft golden hour lighting creating a warm rim
light, shallow depth of field, photorealistic, 8k resolution"
```

**Implementación:**
```typescript
interface PromptEnhancerConfig {
  targetProvider: string;     // Optimizar para proveedor específico
  style?: string;             // Estilo deseado
  characterDetails?: string;  // Mantener consistencia
  quality: 'fast' | 'balanced' | 'best';
}

async function enhancePrompt(
  originalPrompt: string,
  config: PromptEnhancerConfig
): Promise<EnhancedPrompt> {
  // Usar GPT-4 o Claude para mejorar el prompt
  // Aplicar reglas específicas del proveedor target
  // Mantener detalles de personaje si existen
}
```

### 3.4 Consistencia de Personajes

**Estrategias por Proveedor:**

| Proveedor | Método de Consistencia |
|-----------|----------------------|
| Leonardo AI | Character Reference (imagen) + descripción detallada |
| FLUX | Fine-tuning con imágenes del personaje (LoRA) |
| DALL-E | Prompt detallado + seed consistency |
| Nano Banana | Descripción textual muy específica |

**Sistema de Perfiles de Personaje:**
```typescript
interface CharacterProfile {
  id: string;
  name: string;
  userId: string;
  referenceImages: string[];   // URLs de imágenes de referencia
  description: {
    face: string;              // "oval face, green eyes, freckles"
    hair: string;              // "long wavy red hair"
    body: string;              // "athletic build, tall"
    clothing: string;          // "usually wears casual clothes"
    distinctiveFeatures: string; // "scar on left cheek"
  };
  trainedModels?: {            // LoRAs entrenados
    provider: string;
    modelId: string;
  }[];
}
```

---

## 4. Sistema de Pagos y Créditos

### 4.1 Modelo de Pricing

**Planes Propuestos:**

| Plan | Precio/Mes | Créditos | Características |
|------|-----------|----------|-----------------|
| Free | $0 | 50 | 1 proveedor, watermark |
| Starter | $9 | 500 | 3 proveedores, sin watermark |
| Pro | $29 | 2,000 | Todos los proveedores, templates premium |
| Business | $99 | 10,000 | API access, prioridad, soporte |

**Sistema de Créditos:**
- 1 crédito = 1 imagen estándar (1024x1024)
- Imágenes 4K = 4 créditos
- Mejora de prompt = 0.1 créditos
- Fine-tuning de personaje = 50 créditos

### 4.2 Integración Stripe

```typescript
// Productos y precios en Stripe
const plans = {
  starter: {
    priceId: 'price_xxx',
    credits: 500,
    features: ['3_providers', 'no_watermark', 'basic_templates']
  },
  pro: {
    priceId: 'price_yyy',
    credits: 2000,
    features: ['all_providers', 'premium_templates', 'character_profiles']
  }
};
```

---

## 5. Base de Datos (Supabase)

### 5.1 Esquema Principal

```sql
-- Usuarios (extendido de auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  credits_balance INTEGER DEFAULT 0,
  plan TEXT DEFAULT 'free',
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generaciones
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  provider TEXT NOT NULL,
  original_prompt TEXT NOT NULL,
  enhanced_prompt TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  cost_credits DECIMAL(10,2),
  cost_usd DECIMAL(10,4),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Templates de Prompts
CREATE TABLE prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id), -- NULL = template público
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  base_prompt TEXT NOT NULL,
  variables JSONB,
  character_lock JSONB,
  negative_prompt TEXT,
  is_public BOOLEAN DEFAULT false,
  uses_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Perfiles de Personajes
CREATE TABLE character_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  reference_images TEXT[],
  description JSONB NOT NULL,
  trained_models JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transacciones de Créditos
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  amount INTEGER NOT NULL, -- positivo = agregar, negativo = usar
  type TEXT NOT NULL, -- 'purchase', 'subscription', 'generation', 'refund'
  reference_id TEXT, -- ID de generación o pago
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. Deployment y Infraestructura

### 6.1 Requisitos para Vercel

**Variables de Entorno Necesarias:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# AI Providers
OPENAI_API_KEY=
GOOGLE_AI_API_KEY=
LEONARDO_API_KEY=
REPLICATE_API_TOKEN=
FAL_API_KEY=
GETIMG_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

### 6.2 Servicios Externos Necesarios

| Servicio | Propósito | Costo Estimado |
|----------|-----------|----------------|
| **Vercel Pro** | Hosting | $20/mes |
| **Supabase Pro** | DB + Auth | $25/mes |
| **Stripe** | Pagos | 2.9% + $0.30/transacción |
| **Cloudflare R2** | Almacenamiento de imágenes | ~$0.015/GB |
| **Dominio** | URL personalizada | $10-15/año |
| **Resend/Postmark** | Emails transaccionales | $0-20/mes |

**Costo base mensual estimado: ~$65-100/mes**

### 6.3 Dominio

**Consideraciones:**
- Comprar dominio en Namecheap, Cloudflare, o Google Domains
- Sugerencias: `fotoai.com`, `imagecraft.ai`, `pixelstudio.ai`
- Configurar DNS apuntando a Vercel

---

## 7. Roadmap de Desarrollo

### Fase 1: MVP (4-6 semanas)
- [ ] Setup proyecto Next.js + Supabase + Stripe
- [ ] Autenticación (login, registro, OAuth)
- [ ] Integración DALL-E 3 (proveedor inicial)
- [ ] UI básica de generación
- [ ] Sistema de créditos básico
- [ ] Landing page
- [ ] Deploy a Vercel

### Fase 2: Multi-Provider (3-4 semanas)
- [ ] Integrar Nano Banana (Google)
- [ ] Integrar Leonardo AI
- [ ] Selector de proveedores en UI
- [ ] Comparación lado a lado

### Fase 3: Prompt Enhancement (2-3 semanas)
- [ ] Motor de mejora de prompts con GPT-4
- [ ] UI para ver prompt original vs mejorado
- [ ] Templates básicos de prompts

### Fase 4: Consistencia de Personajes (3-4 semanas)
- [ ] Sistema de perfiles de personajes
- [ ] Integración con Leonardo AI Character Reference
- [ ] Upload y gestión de imágenes de referencia
- [ ] Templates con character lock

### Fase 5: Avanzado (4-6 semanas)
- [ ] Integrar FLUX via Replicate
- [ ] Fine-tuning de personajes (LoRA)
- [ ] Galería y organización de imágenes
- [ ] Editor de imágenes in-app
- [ ] API pública para usuarios Business

---

## 8. Análisis de Inconsistencias y Riesgos

### 8.1 Problemas Identificados

| Problema | Impacto | Solución |
|----------|---------|----------|
| **Midjourney sin API** | Alto - Es muy popular | Excluir del MVP, mencionar como "próximamente" o integrar solo para Enterprise |
| **Costos variables de APIs** | Medio - Difícil pricing | Usar sistema de créditos con margen de seguridad (markup 30-50%) |
| **Consistencia entre proveedores** | Alto - Resultados diferentes | Ser transparente, mostrar qué proveedor se usa, ofrecer comparación |
| **Rate limits de APIs** | Medio - Puede afectar UX | Implementar cola de trabajos, mostrar tiempos estimados |
| **Almacenamiento de imágenes** | Medio - Costo a escala | Usar Cloudflare R2 (más barato), implementar expiración |
| **GDPR/Privacidad** | Alto - Legal | Política clara, opción de borrar datos, no usar imágenes para training |

### 8.2 Riesgos Técnicos

1. **Dependencia de terceros**: Si OpenAI o Leonardo cambian precios/términos
   - Mitigación: Arquitectura multi-proveedor desde el inicio

2. **Latencia**: Generación puede tomar 10-60 segundos
   - Mitigación: UI con progreso, webhooks, notificaciones

3. **Calidad inconsistente**: Diferentes proveedores = diferentes resultados
   - Mitigación: Recomendaciones inteligentes, previews

### 8.3 Riesgos de Negocio

1. **Competencia fuerte**: Muchas plataformas similares
   - Diferenciador: Consistencia de personajes + mejora de prompts

2. **Márgenes ajustados**: APIs son caros
   - Solución: Empezar con precios premium, bajar con escala

---

## 9. Checklist de Lanzamiento

### Pre-Lanzamiento
- [ ] Dominio comprado y configurado
- [ ] SSL activo
- [ ] Términos de servicio y política de privacidad
- [ ] Stripe en modo producción
- [ ] Emails transaccionales configurados
- [ ] Monitoreo (Vercel Analytics, Sentry)
- [ ] Backups de base de datos
- [ ] Rate limiting implementado

### Testing
- [ ] Tests de integración con cada API
- [ ] Tests de flujo de pago
- [ ] Tests de autenticación
- [ ] Tests de carga básicos
- [ ] Pruebas en móvil

### Marketing
- [ ] Landing page optimizada
- [ ] SEO básico
- [ ] Redes sociales
- [ ] Documentación/FAQ

---

## 10. Recursos y Referencias

### APIs Oficiales
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Google AI (Gemini/Nano Banana)](https://ai.google.dev/gemini-api/docs)
- [Leonardo AI API](https://docs.leonardo.ai)
- [Replicate](https://replicate.com/docs)
- [fal.ai](https://fal.ai/docs)

### Boilerplates Recomendados
- [Vercel Next.js SaaS Starter](https://vercel.com/templates/authentication/next-js-saas-starter)
- [nextjs-subscription-payments](https://github.com/vercel/nextjs-subscription-payments)

### Herramientas de Desarrollo
- [shadcn/ui](https://ui.shadcn.com) - Componentes UI
- [Supabase](https://supabase.com) - Auth + DB
- [Stripe](https://stripe.com) - Pagos
- [Cloudflare R2](https://developers.cloudflare.com/r2) - Storage

---

## Resumen Ejecutivo

**Qué necesitas comprar/contratar:**

1. **Dominio**: ~$12/año (Cloudflare o Namecheap)
2. **Vercel Pro**: $20/mes (para features de producción)
3. **Supabase Pro**: $25/mes (cuando escales)
4. **Cloudflare R2**: Pay-as-you-go (~$5-50/mes dependiendo del uso)
5. **API Keys de proveedores**: Prepago según uso

**Inversión inicial mínima**: ~$50-100/mes + costos de APIs

**Tiempo estimado hasta MVP funcional**: 4-6 semanas de desarrollo

---

*Plan creado: Diciembre 2025*
*Versión: 1.0*
