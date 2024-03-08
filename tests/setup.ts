import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import '@testing-library/jest-dom'

// This file applies a global setup to any .test.* file
afterEach(() => {
  cleanup()
})
