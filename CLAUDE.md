# CLAUDE.md — Mainsou Landing Site (astro-site)

## 1. Vue d'ensemble

Site vitrine + hébergement temporaire des apps Flutter Web pour l'écosystème **Mainsou**.
Déployé sur **Vercel**. Ce repo sert de point d'entrée unique en attendant un hébergement dédié pour chaque app.

| Route | Contenu |
|---|---|
| `/` | Landing page Mainsou (Astro + React + Framer Motion) |
| `/pharma/` | App Flutter Web — Pharmacien (SPA) |
| `/doctor/` | App Flutter Web — Hôpital/Médecin (SPA) |
| `/reset-password` | Page de réinitialisation de mot de passe |
| `/mainsou.apk` | APK Android Mainsou (téléchargement direct) |

---

## 2. Lien avec le projet source

Le code source des applications Flutter se trouve dans :
```
C:\Users\KARTA\Desktop\perigrin falcon\dev it\mainsou app\
├── Mainsou/          ← App mobile patient/livreur (Flutter Android)
├── pharma_app/       ← App pharmacien (Flutter, build web hébergé ici)
├── doctor_app/       ← App hôpital/médecin (Flutter, build web hébergé ici)
├── admin_app/        ← App admin (Flutter)
├── catalogue/        ← Catalogue médicaments
├── website/          ← Contient un lien vers ce repo astro-site
└── CLAUDE.md         ← Documentation complète du projet (DB, flux, design system)
```

**Ce repo `astro-site`** ne contient PAS le code source Flutter. Il contient uniquement :
- Le site vitrine (Astro)
- Les **builds compilés** des apps Flutter Web dans `public/doctor/` et `public/pharma/`
- L'APK Android dans `public/mainsou.apk`

---

## 3. Générer et déployer les apps Flutter Web

### 3.1 Prérequis
- Flutter SDK installé (`flutter --version`)
- Le projet source accessible à `C:\Users\KARTA\Desktop\perigrin falcon\dev it\mainsou app\`

### 3.2 Build Pharma App
```bash
cd "C:\Users\KARTA\Desktop\perigrin falcon\dev it\mainsou app\pharma_app"
flutter build web --release --base-href=/pharma/
```

### 3.3 Build Doctor App
```bash
cd "C:\Users\KARTA\Desktop\perigrin falcon\dev it\mainsou app\doctor_app"
flutter build web --release --base-href=/doctor/
```

> **IMPORTANT — `--base-href`** : Les apps sont hébergées dans des sous-dossiers (`/pharma/`, `/doctor/`), pas à la racine. Sans `--base-href`, Flutter génère `<base href="/">` et tous les assets (JS, manifest, fonts) retournent 404.
>
> **Piège Git Bash Windows** : Git Bash convertit `/pharma/` en `C:/Program Files/Git/pharma/`. Utiliser `'//pharma/'` (double slash) puis corriger manuellement le `index.html` après le build, OU utiliser PowerShell/CMD à la place.

### 3.4 Copier les builds dans astro-site
```bash
# Pharma
rm -rf "C:\Users\KARTA\Desktop\astro-site\public\pharma"
cp -r "C:\Users\KARTA\Desktop\perigrin falcon\dev it\mainsou app\pharma_app\build\web" "C:\Users\KARTA\Desktop\astro-site\public\pharma"

# Doctor
rm -rf "C:\Users\KARTA\Desktop\astro-site\public\doctor"
cp -r "C:\Users\KARTA\Desktop\perigrin falcon\dev it\mainsou app\doctor_app\build\web" "C:\Users\KARTA\Desktop\astro-site\public\doctor"
```

### 3.5 Mettre à jour l'APK Mainsou
```bash
cd "C:\Users\KARTA\Desktop\perigrin falcon\dev it\mainsou app\Mainsou"
flutter build apk --release
cp "build\app\outputs\flutter-apk\app-release.apk" "C:\Users\KARTA\Desktop\astro-site\public\mainsou.apk"
```

### 3.6 Déployer
```bash
cd "C:\Users\KARTA\Desktop\astro-site"
git add -A
git commit -m "Update Flutter web builds + APK"
git push  # Vercel auto-deploy
```

---

## 4. Stack technique

| Technologie | Usage |
|---|---|
| **Astro 6** | Framework du site statique |
| **React 19** | Composants interactifs (via `@astrojs/react`) |
| **Framer Motion** | Animations (fade-in, float, stagger) |
| **Tailwind CSS v4** | Styling (via `@tailwindcss/vite`) |
| **Supabase JS v2** | Auth (inscription, reset password) — chargé via CDN |
| **Vercel** | Hébergement + déploiement automatique |

### Structure du projet
```
astro-site/
├── src/
│   ├── pages/
│   │   ├── index.astro          ← Landing page principale
│   │   ├── reset-password.astro ← Reset mot de passe
│   │   └── 404.astro            ← Page 404 custom
│   ├── components/
│   │   ├── Nav.astro            ← Navigation (pill nav + mobile drawer)
│   │   ├── Footer.astro         ← Footer dark avec CTA intégré
│   │   ├── AuthModal.astro      ← Modal inscription (Patient/Livreur/Pharma/Hôpital)
│   │   ├── mockups/             ← Screenshots apps (MainsouPhone, PharmaBrowser, DoctorBrowser)
│   │   └── motion/              ← Composants React + Framer Motion
│   │       ├── HeroText.tsx
│   │       ├── FloatingPhone.tsx
│   │       ├── StepsSection.tsx
│   │       ├── FeatureGrid.tsx
│   │       ├── FadeIn.tsx
│   │       ├── StaggerContainer.tsx
│   │       └── StaggerItem.tsx
│   ├── layouts/
│   │   └── Layout.astro         ← Layout principal (fonts, meta, supabase)
│   └── styles/
│       └── global.css           ← Tailwind v4 + design tokens + composants CSS
├── public/
│   ├── doctor/                  ← Flutter Web build — Doctor App (NE PAS MODIFIER)
│   ├── pharma/                  ← Flutter Web build — Pharma App (NE PAS MODIFIER)
│   ├── mainsou.apk             ← APK Android
│   ├── mainsou.png             ← Logo
│   ├── favicon.png
│   └── mainsou-*.png           ← Screenshots de l'app
├── astro.config.mjs            ← Config Astro + plugin Vite SPA fallback
├── vercel.json                 ← Rewrites pour les SPA Flutter (/doctor/*, /pharma/*)
└── CLAUDE.md                   ← Ce fichier
```

---

## 5. Configuration importante

### 5.1 Variables d'environnement (.env)
```
PUBLIC_SUPABASE_URL=https://pdipksjhxtbvwfiejxle.supabase.co
PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIs...  (anon key)
PUBLIC_APK_URL=/mainsou.apk
```

### 5.2 Vercel rewrites (vercel.json)
Les apps Flutter sont des SPA — toutes les sous-routes doivent pointer vers leur `index.html` :
```json
{
  "trailingSlash": true,
  "rewrites": [
    { "source": "/pharma/:path*", "destination": "/pharma/index.html" },
    { "source": "/doctor/:path*", "destination": "/doctor/index.html" }
  ]
}
```

### 5.3 Plugin Vite dev server (astro.config.mjs)
En dev, un plugin Vite custom `flutter-spa-fallback` réplique les rewrites Vercel pour que `/doctor/` et `/pharma/` fonctionnent localement.

---

## 6. Design du site

### Inspirations
- **Notion** : typographie (Inter, poids 700, letter-spacing négatif), cards sans bordures avec ombres subtiles, palette blanc/off-white
- **Linear** : fond hero noir profond #0a0a0a, gradient-text, animations au scroll

### Palette
| Token | Hex | Usage |
|---|---|---|
| Texte principal | `#191919` | Titres, body |
| Texte secondaire | `#787774` | Descriptions |
| Texte tertiaire | `#acaba9` | Captions, placeholders |
| Surface | `#FFFFFF` | Fond principal |
| Surface alt | `#F7F7F5` | Fond alterné sections |
| Brand | `#3B5B32` | Vert Mainsou |
| Hero bg | `#0a0a0a` | Fond hero |
| Footer bg | `#191919` | Fond footer |

### Typographie (tout responsive avec clamp())
| Element | Taille | Poids |
|---|---|---|
| Hero H1 | `clamp(44px, 9vw, 92px)` | 800 |
| Section H2 | `clamp(32px, 5.5vw, 60px)` | 700 |
| Card title | `clamp(18px, 2vw, 24px)` | 600 |
| Body large | `clamp(17px, 1.8vw, 20px)` | 400 |
| Body default | `clamp(15px, 1.5vw, 18px)` | 400 |

### CSS Layers (Tailwind v4)
**Important** : Tout le CSS custom est dans `@layer base` ou `@layer components` pour ne pas écraser les utilities Tailwind. Les styles hors-layer ont une priorité plus haute que `@layer utilities` en Tailwind v4.

---

## 7. Commandes

```bash
npm run dev       # Dev server (localhost:4321)
npm run build     # Build statique → dist/
npm run preview   # Preview du build
```
