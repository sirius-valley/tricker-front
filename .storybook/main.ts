import type { StorybookConfig } from '@storybook/react-vite'

import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  viteFinal: async (config) => {
    config.define = { 
      'process.env': {} 
    }
    if (config.resolve) {
      config.define = { 'process.env': {} }
      config.resolve.alias = {
        ...config.resolve.alias,
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@styles': path.resolve(__dirname, '../src/styles'),
        '@assets': path.resolve(__dirname, '../src/assets'),
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@redux': path.resolve(__dirname, '../src/redux'),
        '@data-provider': path.resolve(__dirname, '../src/data-provider')
      }
    }

    return config
  }
}
export default config
