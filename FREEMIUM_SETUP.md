# Setup Freemium - Costo $0 (excepto APIs)

## Stack 100% Gratuito

| Servicio | Plan Gratis | Límites | Suficiente Para |
|----------|-------------|---------|-----------------|
| **Vercel** | Hobby (gratis) | 100GB bandwidth, 1000 builds/mes | MVP y primeros usuarios |
| **Supabase** | Free | 500MB DB, 1GB storage, 50k auth users | MVP completo |
| **Stripe** | Gratis | Solo 2.9% + $0.30 por transacción | Sin límite |
| **Cloudflare R2** | Free tier | 10GB storage, 1M requests | ~10,000 imágenes |
| **Resend** | Free | 3,000 emails/mes | Suficiente para MVP |
| **Dominio** | *.vercel.app | Gratis con Vercel | Mientras pruebas |

### Costo Mensual Fijo: $0

Solo pagas por:
- APIs de generación de imágenes (por uso)
- Stripe comisión (solo cuando te paguen)
- Dominio custom (cuando lo quieras, ~$12/año)

---

## Sistema de Tracking de Costos

### Dashboard de Costos que Necesitas Ver

```
┌─────────────────────────────────────────────────────────────────┐
│                    💰 DASHBOARD DE COSTOS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  RESUMEN DEL MES                      GASTO HOY                 │
│  ┌─────────────────┐                  ┌─────────────────┐       │
│  │   $24.57        │                  │   $1.23         │       │
│  │   Diciembre     │                  │   15 imágenes   │       │
│  └─────────────────┘                  └─────────────────┘       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  COSTO POR PROVEEDOR (este mes)                                 │
│                                                                 │
│  OpenAI DALL-E    ████████████████░░░░  $12.40  (156 imgs)     │
│  Leonardo AI      ████████░░░░░░░░░░░░  $6.20   (413 imgs)     │
│  Nano Banana      ████░░░░░░░░░░░░░░░░  $3.80   (190 imgs)     │
│  FLUX (Replicate) ██░░░░░░░░░░░░░░░░░░  $2.17   (39 imgs)      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ÚLTIMAS GENERACIONES                                           │
│                                                                 │
│  🖼️  "astronaut riding horse"     DALL-E    $0.08   hace 2min  │
│  🖼️  "sunset over mountains"      Leonardo  $0.015  hace 5min  │
│  🖼️  "cyberpunk city night"       FLUX      $0.055  hace 12min │
│  🖼️  "cute cat in garden"         Nano      $0.02   hace 15min │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  GRÁFICO DE GASTOS (últimos 30 días)                           │
│                                                                 │
│  $3 │            ╭─╮                                            │
│     │      ╭─╮   │ │  ╭─╮                                       │
│  $2 │  ╭─╮ │ │ ╭─┤ ├──┤ │                                       │
│     │  │ │ │ │ │ │ │  │ ├──╮                                    │
│  $1 │──┤ ├─┤ ├─┤ │ │  │ │  │                                    │
│     │  │ │ │ │ │ │ │  │ │  │                                    │
│  $0 └──┴─┴─┴─┴─┴─┴─┴──┴─┴──┴─────────────────────              │
│      1  5  10  15  20  25  30                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Esquema de Base de Datos para Tracking

```sql
-- Tabla principal de generaciones con costos
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),

  -- Prompt info
  original_prompt TEXT NOT NULL,
  enhanced_prompt TEXT,

  -- Provider info
  provider TEXT NOT NULL,  -- 'openai', 'leonardo', 'google', 'replicate'
  model TEXT NOT NULL,     -- 'dall-e-3', 'flux-pro', etc.

  -- Image info
  image_url TEXT NOT NULL,
  image_size TEXT,         -- '1024x1024', '1792x1024', etc.

  -- COSTOS (lo importante para ti)
  cost_usd DECIMAL(10,6) NOT NULL,  -- Costo exacto en USD
  api_response JSONB,               -- Respuesta completa de la API (para debug)

  -- Metadata
  generation_time_ms INTEGER,       -- Cuánto tardó
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para queries rápidas
CREATE INDEX idx_generations_user_date ON generations(user_id, created_at DESC);
CREATE INDEX idx_generations_provider ON generations(provider, created_at DESC);

-- Vista para resumen diario
CREATE VIEW daily_costs AS
SELECT
  DATE(created_at) as date,
  provider,
  COUNT(*) as image_count,
  SUM(cost_usd) as total_cost,
  AVG(cost_usd) as avg_cost_per_image
FROM generations
GROUP BY DATE(created_at), provider
ORDER BY date DESC;

-- Vista para resumen mensual
CREATE VIEW monthly_costs AS
SELECT
  DATE_TRUNC('month', created_at) as month,
  provider,
  COUNT(*) as image_count,
  SUM(cost_usd) as total_cost
FROM generations
GROUP BY DATE_TRUNC('month', created_at), provider
ORDER BY month DESC;
```

### Costos Exactos por Proveedor (para calcular)

```typescript
// src/lib/pricing.ts

export const PROVIDER_COSTS = {
  openai: {
    'dall-e-3': {
      '1024x1024': 0.04,
      '1024x1792': 0.08,
      '1792x1024': 0.08,
    },
    'dall-e-3-hd': {
      '1024x1024': 0.08,
      '1024x1792': 0.12,
      '1792x1024': 0.12,
    },
  },
  google: {
    'gemini-2.5-flash-image': {  // Nano Banana
      'default': 0.02,
    },
    'gemini-3-pro-image': {  // Nano Banana Pro
      '1024': 0.09,
      '4096': 0.12,
    },
  },
  leonardo: {
    'default': 0.015,  // ~1 crédito = $0.015 aprox
  },
  replicate: {
    'flux-pro': 0.055,
    'flux-dev': 0.030,
    'flux-schnell': 0.003,
  },
} as const;

// Función para calcular costo
export function calculateCost(
  provider: string,
  model: string,
  size?: string
): number {
  const providerCosts = PROVIDER_COSTS[provider];
  if (!providerCosts) return 0;

  const modelCosts = providerCosts[model];
  if (typeof modelCosts === 'number') return modelCosts;

  return modelCosts?.[size || 'default'] || modelCosts?.['default'] || 0;
}
```

### API Endpoint para Dashboard de Costos

```typescript
// src/app/api/costs/route.ts

import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'month'; // 'day', 'week', 'month', 'all'

  // Obtener costos agrupados
  const { data: costsByProvider } = await supabase
    .from('generations')
    .select('provider, cost_usd, created_at')
    .gte('created_at', getStartDate(period))
    .order('created_at', { ascending: false });

  // Calcular totales
  const summary = {
    total: costsByProvider?.reduce((sum, g) => sum + Number(g.cost_usd), 0) || 0,
    byProvider: groupByProvider(costsByProvider),
    imageCount: costsByProvider?.length || 0,
    avgPerImage: 0,
  };
  summary.avgPerImage = summary.total / (summary.imageCount || 1);

  return Response.json(summary);
}
```

---

## Configuración Paso a Paso (Todo Gratis)

### 1. Vercel (5 minutos)
```bash
# Instalar CLI
npm i -g vercel

# Login
vercel login

# El deploy es gratis, solo necesitas cuenta
```

### 2. Supabase (10 minutos)
1. Ir a [supabase.com](https://supabase.com)
2. Crear proyecto (gratis)
3. Copiar URL y anon key
4. Ejecutar migrations para crear tablas

### 3. APIs de Imágenes (lo único que pagas)

| API | Cómo obtener key | Costo mínimo |
|-----|------------------|--------------|
| **OpenAI** | platform.openai.com | Prepago $5 mínimo |
| **Google AI** | ai.google.dev | Tier gratis disponible |
| **Leonardo** | leonardo.ai | Plan desde $9/mes |
| **Replicate** | replicate.com | Pay-as-you-go, sin mínimo |

**Recomendación para empezar**:
- Google AI (Nano Banana) tiene tier gratis
- Replicate es pay-as-you-go sin mínimo

### 4. Stripe (para cuando quieras cobrar)
- Cuenta gratis
- Solo cobra 2.9% + $0.30 por transacción exitosa
- No hay fee mensual

---

## Límites del Plan Gratis

### Vercel Hobby
- ✅ 100GB bandwidth/mes
- ✅ Builds ilimitados (1000 en cola)
- ✅ Serverless functions
- ⚠️ 10 segundos timeout (suficiente para APIs)
- ⚠️ Sin analytics avanzados (pero puedes ver básicos)

### Supabase Free
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 50,000 monthly active users
- ✅ 500K edge function invocations
- ⚠️ Proyecto pausado después de 1 semana inactivo
- ⚠️ Sin backups automáticos

### Cloudflare R2 Free
- ✅ 10GB storage
- ✅ 1 million Class A operations/mes
- ✅ 10 million Class B operations/mes
- ✅ Egress GRATIS (no pagas por descargas)

---

## Cuándo Necesitarás Pagar

| Situación | Solución | Costo |
|-----------|----------|-------|
| Más de 500MB en DB | Supabase Pro | $25/mes |
| Más de 100GB bandwidth | Vercel Pro | $20/mes |
| Dominio custom | Cloudflare/Namecheap | $12/año |
| Más de 10GB imágenes | R2 pagado | $0.015/GB/mes |

**Estimación**: Puedes llegar a ~1000 usuarios activos antes de necesitar pagar por infraestructura.

---

## Variables de Entorno (para .env.local)

```env
# Supabase (gratis)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# APIs de imágenes (lo que pagas)
OPENAI_API_KEY=sk-...
GOOGLE_AI_API_KEY=AIza...
LEONARDO_API_KEY=...
REPLICATE_API_TOKEN=r8_...

# Stripe (gratis, solo cobran por transacción)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
```

---

## Resumen

| Concepto | Costo |
|----------|-------|
| Infraestructura mensual | **$0** |
| APIs de imágenes | **~$0.02-0.12 por imagen** |
| Stripe (cuando cobres) | **2.9% + $0.30 por pago** |
| Dominio (opcional) | **$12/año** |

**Para empezar solo necesitas: cuenta en Vercel + Supabase + una API key de imágenes (~$5 prepago en OpenAI o gratis en Google AI)**
