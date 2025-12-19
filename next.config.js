/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: {
    compilationMode: 'annotation',
  },
  experimental: {
    forceSwcTransforms: true,
  },
}