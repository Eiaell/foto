"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Image as ImageIcon,
  Zap,
  Users,
  BarChart3,
  ChevronRight,
  Star,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const providers = [
  { name: "OpenAI", logo: "DALL·E", color: "from-green-500 to-emerald-600" },
  { name: "Midjourney", logo: "MJ", color: "from-blue-500 to-indigo-600" },
  { name: "Leonardo", logo: "Leo", color: "from-amber-500 to-orange-600" },
  { name: "FLUX", logo: "FX", color: "from-pink-500 to-rose-600" },
  { name: "Nano Banana", logo: "NB", color: "from-yellow-500 to-amber-600" },
];

const features = [
  {
    icon: Wand2,
    title: "Mejora Automática de Prompts",
    description:
      "Tu prompt simple se transforma en una descripción detallada que genera imágenes impresionantes.",
  },
  {
    icon: Users,
    title: "Personajes Consistentes",
    description:
      "Mantén la identidad de tus personajes en todas las imágenes, sin importar la pose o escena.",
  },
  {
    icon: Zap,
    title: "5 Proveedores, 1 Plataforma",
    description:
      "Accede a DALL·E, Midjourney, Leonardo AI, FLUX y Nano Banana desde un solo lugar.",
  },
  {
    icon: BarChart3,
    title: "Control de Costos",
    description:
      "Dashboard en tiempo real para ver exactamente cuánto gastas por imagen y proveedor.",
  },
];

const pricingPlans = [
  {
    name: "Explorador",
    price: "Gratis",
    description: "Para probar la plataforma",
    features: ["50 imágenes/mes", "2 proveedores", "Marca de agua", "Soporte por email"],
    cta: "Empezar Gratis",
    popular: false,
  },
  {
    name: "Creador",
    price: "$19",
    period: "/mes",
    description: "Para creadores de contenido",
    features: [
      "500 imágenes/mes",
      "Todos los proveedores",
      "Sin marca de agua",
      "Mejora de prompts",
      "Perfiles de personajes",
      "Soporte prioritario",
    ],
    cta: "Comenzar Ahora",
    popular: true,
  },
  {
    name: "Estudio",
    price: "$49",
    period: "/mes",
    description: "Para equipos y agencias",
    features: [
      "2,000 imágenes/mes",
      "Todos los proveedores",
      "API Access",
      "Templates premium",
      "Personajes ilimitados",
      "Soporte dedicado",
    ],
    cta: "Contactar Ventas",
    popular: false,
  },
];

export default function Home() {
  const [activeProvider, setActiveProvider] = useState(0);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient-gold">FotoAI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition">
                Características
              </a>
              <a href="#providers" className="text-muted-foreground hover:text-foreground transition">
                Proveedores
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition">
                Precios
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost">Iniciar Sesión</Button>
              <Button className="gradient-gold text-white border-0">
                Empezar Gratis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-inca opacity-50" />

        {/* Floating Elements */}
        <div className="absolute top-40 left-10 w-20 h-20 rounded-full bg-[oklch(0.78_0.15_85/0.2)] blur-3xl animate-float" />
        <div className="absolute top-60 right-20 w-32 h-32 rounded-full bg-[oklch(0.68_0.11_195/0.2)] blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-[oklch(0.55_0.22_25/0.2)] blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-secondary text-secondary-foreground px-4 py-1.5 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                5 Proveedores de IA en Una Plataforma
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Crea Imágenes{" "}
              <span className="text-gradient-peru">Extraordinarias</span>
              <br />
              con Inteligencia Artificial
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Accede a DALL·E, Midjourney, Leonardo AI, FLUX y más desde un solo lugar.
              Con mejora automática de prompts y consistencia de personajes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button size="lg" className="gradient-gold text-white border-0 text-lg px-8 h-14">
                Comenzar Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                Ver Demo
              </Button>
            </motion.div>

            {/* Provider Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center gap-4 flex-wrap"
            >
              {providers.map((provider, index) => (
                <motion.button
                  key={provider.name}
                  onClick={() => setActiveProvider(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    activeProvider === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${provider.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {provider.logo}
                  </div>
                  <span className="font-medium">{provider.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Hero Image Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 gradient-gold rounded-2xl blur-3xl opacity-20" />
              <Card className="relative overflow-hidden border-2 border-border shadow-2xl">
                <CardContent className="p-0">
                  {/* Mock App Interface */}
                  <div className="bg-card">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ImageIcon className="w-4 h-4" />
                        <span>Generador de Imágenes</span>
                      </div>
                      <div className="w-20" />
                    </div>

                    {/* Content */}
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                      {/* Left: Prompt Input */}
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                          <p className="text-sm text-muted-foreground mb-2">Tu prompt:</p>
                          <p className="font-medium">&quot;un guerrero inca con armadura dorada&quot;</p>
                        </div>
                        <div className="p-4 rounded-xl bg-secondary/30 border border-secondary">
                          <div className="flex items-center gap-2 mb-2">
                            <Wand2 className="w-4 h-4 text-secondary-foreground" />
                            <p className="text-sm font-medium text-secondary-foreground">Prompt mejorado:</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            &quot;A majestic Inca warrior wearing ornate golden armor with intricate sun
                            motifs, standing proudly against the backdrop of Machu Picchu at sunrise,
                            cinematic lighting, highly detailed, 8k resolution...&quot;
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary">Leonardo AI</Badge>
                          <Badge variant="outline">1024x1024</Badge>
                          <Badge variant="outline">$0.015</Badge>
                        </div>
                      </div>

                      {/* Right: Image Preview */}
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-gold flex items-center justify-center animate-glow">
                            <ImageIcon className="w-10 h-10 text-white" />
                          </div>
                          <p className="text-muted-foreground">Generando imagen...</p>
                          <div className="mt-4 w-48 h-2 rounded-full bg-border mx-auto overflow-hidden">
                            <div className="h-full w-2/3 gradient-gold rounded-full animate-shimmer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground">Características</Badge>
            <h2 className="text-4xl font-bold mb-4">Todo lo que necesitas para crear</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Herramientas poderosas que simplifican la generación de imágenes con IA
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section id="providers" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-primary-foreground">Proveedores</Badge>
            <h2 className="text-4xl font-bold mb-4">Los mejores modelos de IA</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accede a los proveedores más potentes desde una sola plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "DALL·E 3", company: "OpenAI", price: "$0.04-0.12", best: "General" },
              { name: "Midjourney", company: "Midjourney", price: "$0.02", best: "Arte" },
              { name: "Leonardo AI", company: "Leonardo", price: "$0.015", best: "Personajes" },
              { name: "FLUX Pro", company: "Replicate", price: "$0.055", best: "Fotorrealismo" },
              { name: "Nano Banana", company: "Google", price: "$0.02", best: "Texto" },
            ].map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold mb-1">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{provider.company}</p>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="w-full justify-center">
                        {provider.price}/img
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Mejor para: <span className="font-medium text-foreground">{provider.best}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Precios</Badge>
            <h2 className="text-4xl font-bold mb-4">Planes simples y transparentes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="gradient-gold text-white border-0 px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Más Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    plan.popular
                      ? "border-2 border-primary shadow-xl scale-105"
                      : "border-2 border-border"
                  }`}
                >
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "gradient-gold text-white border-0"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-sunset opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Empieza a crear imágenes{" "}
              <span className="text-gradient-gold">increíbles</span> hoy
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Únete a miles de creadores que ya usan FotoAI para dar vida a sus ideas.
              Comienza gratis, sin tarjeta de crédito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-gold text-white border-0 text-lg px-8 h-14">
                Crear Cuenta Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                Ver Documentación
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient-gold">FotoAI</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition">Términos</a>
              <a href="#" className="hover:text-foreground transition">Privacidad</a>
              <a href="#" className="hover:text-foreground transition">Contacto</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 FotoAI. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
