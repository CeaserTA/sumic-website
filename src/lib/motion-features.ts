// Motion's animation engine, loaded asynchronously by <LazyMotion> in App.tsx so it stays out
// of the startup bundle. domMax (not domAnimation) because the navbar indicator uses layoutId.
import { domMax } from 'motion/react'

export default domMax
