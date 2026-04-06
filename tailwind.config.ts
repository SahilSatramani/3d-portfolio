import type { Config } from 'tailwindcss'
const config: Config = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
export default config
