//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  'jsx-single-quote': true,
  trailingComma: 'all',
  printWidth: 120,
  tabWidth: 2,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

export default config
