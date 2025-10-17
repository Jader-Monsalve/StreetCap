# 🚀 GUÍA DE DEPLOYMENT EN NETLIFY

## Paso 1: Preparar el Repositorio Git

```bash
# Inicializar git (si no está hecho)
git init
git add .
git commit -m "Initial commit: StreetCap 3D Designer"

# Crear repositorio en GitHub
# 1. Ve a github.com/new
# 2. Crea un repositorio llamado "streetcap"
# 3. Sigue las instrucciones para push

# Agregar remote y push
git remote add origin https://github.com/TU_USUARIO/streetcap.git
git branch -M main
git push -u origin main
```

---

## Paso 2: Conectar a Netlify

### Opción A: Desde Netlify Dashboard (Recomendado)

1. **Ve a https://app.netlify.com**
2. **Click en "Add new site" → "Import an existing project"**
3. **Selecciona GitHub como provider**
4. **Autoriza Netlify con tu cuenta GitHub**
5. **Selecciona el repositorio "streetcap"**
6. **Configura Build:**
   - Build command: `npm run build`
   - Publish directory: `dist`
7. **Click "Deploy site"**

### Opción B: Desde Netlify CLI

```bash
# Instalar Netlify CLI globalmente
npm install -g netlify-cli

# Conectarse a Netlify
netlify auth:login

# Iniciar deploy
netlify deploy

# Para deploy de producción
netlify deploy --prod
```

---

## Paso 3: Configurar Formspree (Opcional pero Recomendado)

1. **Ve a https://formspree.io**
2. **Regístrate o inicia sesión**
3. **Crea un nuevo proyecto**
4. **Obtén tu Form ID** (ej: `xxxxxx`)
5. **Actualiza el archivo `src/pages/contacto.astro`:**
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   Reemplaza `YOUR_FORM_ID` con tu ID real

---

## Paso 4: Agregar Dominio Personalizado

### En Netlify Dashboard:

1. **Ve a "Site settings"**
2. **Click en "Domain management"**
3. **Click "Add domain"**
4. **Ingresa tu dominio** (ej: `streetcap.com`)
5. **Sigue las instrucciones para:**
   - Comprar dominio en Netlify (si es nuevo)
   - O apuntar DNS si ya tienes dominio

### Para dominios existentes:

1. **En tu registrador (GoDaddy, Namecheap, etc.):**
   - Ve a DNS settings
   - Agrega registros CNAME o A según Netlify indique
   - Netlify te mostrará exactamente qué hacer

---

## Paso 5: Verificar Deploy

1. **Ve a tu sitio** en `https://streetcap.netlify.app` (o tu dominio)
2. **Verifica:**
   - ✅ Página carga correctamente
   - ✅ Gorra 3D se ve
   - ✅ Enlaces funcionan
   - ✅ Formulario responde
3. **Abre DevTools (F12)** y verifica:
   - No hay errores en console
   - WebGL funciona
   - Imágenes cargan

---

## Paso 6: Optimizaciones Post-Deploy

### Activar HTTPS
- Netlify lo hace automáticamente (gratis con Let's Encrypt)

### Configurar Redirect (Opcional)
El archivo `netlify.toml` ya lo configura

### Agregar Analytics (Opcional)
```bash
npm install @netlify/analytics
```

---

## Problemas Comunes

### ❌ "Build failed"
```
Solución:
1. Verifica que npm run build funciona localmente
2. Revisa los logs de Netlify
3. Asegúrate de que Node version es compatible
```

### ❌ Formulario no funciona
```
Solución:
1. Verifica que Action URL es correcta en contacto.astro
2. Crea account en Formspree.io
3. Reemplaza YOUR_FORM_ID con tu ID real
4. Prueba en staging primero
```

### ❌ 3D no carga
```
Solución:
1. Verifica WebGL support en navegador
2. Revisa console de DevTools
3. Asegúrate de que Three.js se carga
4. Intenta en navegador diferente
```

### ❌ Domain no funciona
```
Solución:
1. Espera 24-48 horas para propagación DNS
2. Borra cache del navegador (Ctrl+Shift+Delete)
3. Usa herramienta: https://www.whatsmydns.net
4. Verifica registros DNS en tu registrador
```

---

## Monitoreo Continuo

### Configurar Auto-Deploy
- Por defecto, cualquier push a `main` despliega automáticamente
- Puedes cambiar esto en "Site settings" → "Build & deploy"

### Revisar Builds
- Netlify dashboard → "Deploys"
- Mira logs de cada deploy
- Reverte a deploy anterior si hay problema

### Monitorear Performance
- Ve a "Analytics" en Netlify
- Revisa Lighthouse scores
- Optimiza según recomendaciones

---

## Próximos Pasos para Mejorar

1. **Agregar SSL/TLS:**
   - Ya viene gratis con Netlify

2. **Comprimir imágenes:**
   ```bash
   npm install -D @astrojs/image
   ```

3. **Agregar sitemap dinámico:**
   - Ya está en `src/pages/sitemap.xml.ts`

4. **Analytics profesional:**
   - Google Analytics
   - Plausible Analytics
   - Vercel Analytics

5. **Monitoreo de errores:**
   - Sentry.io
   - LogRocket

---

## 🎉 ¡Ya está vivo!

Tu sitio ahora está en internet. Comparte:
- URL en redes sociales
- Con amigos
- En marketplaces de plantillas

---

## Consejos de Venta

**Para potenciales compradores:**
- "Desplegable en 5 minutos a Netlify gratis"
- "HTTPS automático"
- "Sin límite de visitas"
- "Build y deploy automático"

---

**¿Preguntas? Revisa los logs de Netlify o contacta soporte.**
