import theme from './theme'

export default theme({
  docs: {
    primaryColor: '#b794f4'
  },
  i18n: {
    // Used as a transition to another version
    locales: [],
  },
  router: {
    // This way, all generated path asset will be prefixed with /<repository-name>/, 
    // and the next time you deploy the code to repository GitHub Pages, the site should be working properly.
    base: '/GravitWiki/'
  }
})
