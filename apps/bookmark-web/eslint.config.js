import eslintReact from '@eslint-react/eslint-plugin'
import config from 'dev-config/eslint'
import { defineConfig } from 'eslint/config'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default defineConfig([
    ...config,
    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [
            eslintReact.configs.recommended,
            reactHooksPlugin.configs.flat.recommended,
            eslintReact.configs['disable-conflict-eslint-plugin-react-hooks'],
        ],
    },
])
