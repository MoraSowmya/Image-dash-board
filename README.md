DiagramDash

A modern, responsive React app for uploading, viewing, and analyzing diagrams & images with automated object detection.

Features
- Drag & Drop Upload via `react-dropzone`
- Interactive Viewer with zoom/pan (`react-zoom-pan-pinch`)
- Auto Object Detection - identifies components in images
- Fully Responsive - Tailwind CSS across all devices
- Modern Stack - React 19 + TypeScript + Vite

Tech Stack

Frontend: React 19, TypeScript
Styling: Tailwind CSS
Icons: Lucide React
Utils: react-dropzone, react-zoom-pan-pinch, clsx


Development Journey
Image Analyzer 

1. Foundation: Vite/TS setup + global styling
2. Core UX: Drag-drop + zoomable viewer  
3. Analysis: Component detection UI + mock service
4. Polish: Mobile optimization + loading states

Key Decisions:
- Google Maps-style image interaction
- Clean utility-first Tailwind design

Installation & Setup

Prerequisites
- Node.js (v18 or higher)
- npm or yarn

npm create vite@latest -- diagramdash
npm i react-dropzone react-zoom-pan-pinch lucide-react clsx tailwind-merge
