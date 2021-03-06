import path from 'path'
import defu from 'defu'

import tailwindConfig from './tailwind.config'

async function getRoutes() {
  const { $content } = require("@nuxt/content");
  const files = await $content({ deep: true }).only(["path"]).fetch();
  const transform = files.map((file) => (file.path === "/index" ? "/" : file.path))
    .filter(file => file !== '/settings')
    .map(file => file.replace(/^.+?[/]/, ''))
    .filter((file, index, files) => files.indexOf(file) === index)

  return transform
};


function themeModule () {
  // wait for nuxt options to be normalized
  const { nuxt } = this
  const { options, hook } = this.nuxt

  // Configure content after each hook
  hook('content:file:beforeInsert', (document) => {
    const regexp = new RegExp(`^/(${options.i18n.locales.map(locale => locale.code).join('|')})`, 'gi')
    const { dir, slug, category } = document
    const _dir = dir.replace(regexp, '')
    const _slug = slug.replace(/^index/, '')
    const _category = category && typeof category === 'string' ? category : ''

    document.to = `${_dir}/${_slug}`
    document.category = _category
  })

  // Configure `tailwind.config.js` path
  options.tailwindcss.configPath = options.tailwindcss.configPath || path.resolve(options.rootDir, 'tailwind.config.js')
  options.tailwindcss.cssPath = options.tailwindcss.cssPath || path.resolve(options.rootDir, options.dir.assets, 'css', 'tailwind.css')
  // Configure TailwindCSS
  hook('tailwindcss:config', function (defaultTailwindConfig) {
    Object.assign(defaultTailwindConfig, defu(defaultTailwindConfig, tailwindConfig({ nuxt })))
  })
}

const defaultConfig = docsOptions => ({
  target: 'static',
  ssr: true,
  srcDir: __dirname,
  privateRuntimeConfig: {
    githubToken: process.env.GITHUB_TOKEN
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  generate: {
    fallback: '404.html',
    routes: ['/']
  },
  transpile: [
    __dirname // transpile node_modules/@nuxt/content-theme-docs
  ],
  css: [
    '~/assets/css/main.scss'
  ],
  plugins: [
    '@/plugins/markdown',
    '@/plugins/init',
    '@/plugins/i18n.client',
    '@/plugins/vue-scrollactive',
    '@/plugins/menu.client'
  ],
  buildModules: [
    themeModule,
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/pwa',
    '@nuxtjs/google-fonts'
  ],
  modules: [
    'nuxt-i18n',
    '@nuxtjs/sitemap',
    '@nuxt/content'
  ],
  components: [
    { path: '~/components', pathPrefix: false, level: 1 }
  ],
  loading: {
    color: docsOptions.primaryColor
  },
  meta: {
    theme_color: docsOptions.primaryColor
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },
  i18n: {
    locales: [{
      code: 'latest',
      iso: 'ru-RU',
      file: 'ru-RU.js',
      name: 'Latest'
    }],
    defaultLocale: 'latest',
    parsePages: false,
    lazy: true,
    seo: false,
    langDir: 'i18n/'
  },
  googleFonts: {
    families: {
      'DM+Sans': true,
      'DM+Mono': true
    }
  },
  tailwindcss: {},
  sitemap: {
    routes() {
      return getRoutes();
    },
  },
})

export default (userConfig) => {
  userConfig.docs = defu(userConfig.docs, {
    primaryColor: '#00CD81'
  })

  const config = defu.arrayFn(userConfig, defaultConfig(userConfig.docs))

  if (userConfig.env && userConfig.env.GITHUB_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('[security] Avoid passing `env.GITHUB_TOKEN` directly in `nuxt.config`. Use `.env` file instead!')
    userConfig.privateRuntimeConfig.GITHUB_TOKEN = userConfig.env.GITHUB_TOKEN
    delete userConfig.env.GITHUB_TOKEN
  }

  return config
}
