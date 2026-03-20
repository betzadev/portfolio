# 🎨 Mi Portfolio Profesional

Bienvenido a mi portafolio personal, una aplicación web moderna y altamente interactiva diseñada para mostrar mis habilidades, proyectos y experiencia. Este proyecto destaca por su diseño visual impactante, animaciones fluidas y una arquitectura robusta basada en las últimas tecnologías web.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Características Principales

- **Experiencia Inmersiva**: Efectos de **Parallax** en la sección Hero para una primera impresión impactante.
- **Animaciones Avanzadas**: Integración de **GSAP** y **Motion** (Framer Motion) para transiciones suaves y micro-interacciones que dan vida a la interfaz.
- **Diseño Responsivo**: Maquetación adaptable a cualquier dispositivo móvil, tablet o escritorio gracias a **Tailwind CSS v4**.
- **Alto Rendimiento**: Construido sobre **Next.js 16** y **React 19**, aprovechando el renderizado híbrido y optimizaciones automáticas.
- **Código Tipado**: Desarrollo robusto y mantenible con **TypeScript**.

## 🛠️ Stack Tecnológico

Este proyecto ha sido construido utilizando las siguientes herramientas y librerías:

- **Core**: [Next.js 16](https://nextjs.org/), [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones**:
  - [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
  - [Motion](https://motion.dev/)
- **Gestor de Paquetes**: [pnpm](https://pnpm.io/)
- **Linting**: ESLint

## 🏁 Comenzando

Sigue estas instrucciones para obtener una copia del proyecto y ejecutarlo en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado **Node.js** (versión 18 o superior recomendada) y **pnpm**.

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/portfolio.git
    cd portfolio
    ```

2.  **Instala las dependencias:**

    Usamos `pnpm` para una instalación rápida y eficiente.

    ```bash
    pnpm install
    ```

### ⚡ Ejecución en Desarrollo

Para iniciar el servidor de desarrollo y ver los cambios en tiempo real:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### 🏗️ Construcción para Producción

Para crear una versión optimizada para producción:

```bash
pnpm build
```

Una vez construido, puedes iniciar el servidor de producción con:

```bash
pnpm start
```

## 📂 Estructura del Proyecto

Una vista rápida de la estructura de directorios clave:

```
portfolio/
├── app/
│   ├── components/      # Componentes reutilizables (Navbar, Hero, Skills, etc.)
│   ├── layout.tsx       # Layout principal de la aplicación
│   ├── page.tsx         # Página de inicio
│   └── globals.css      # Estilos globales y configuración de Tailwind
├── public/              # Archivos estáticos (imágenes, fuentes, iconos)
├── next.config.ts       # Configuración de Next.js
└── package.json         # Dependencias y scripts
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes alguna idea para mejorar este portafolio o encuentras algún bug:

1.  Haz un Fork del proyecto.
2.  Crea una rama para tu funcionalidad (`git checkout -b feature/AmazingFeature`).
3.  Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

<p align="center">
  Hecho con ❤️ y mucho código.
</p>
