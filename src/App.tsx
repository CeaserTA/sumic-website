import { AppRoutes } from '@/routes/AppRoutes'

/**
 * App shell shared by the client (BrowserRouter, main.tsx) and the prerender (StaticRouter).
 * Motion providers are not here on purpose: see components/motion/MotionScope.
 */
export function App() {
  return <AppRoutes />
}
