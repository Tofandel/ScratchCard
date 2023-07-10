import { defaultTheme } from '@vuepress/theme-default'

export default {
  theme: defaultTheme({
  }),
  title: ' ScratchCard-js',
  plugins: ['@vuepress/active-header-links'],
  port: 8088,
  base: '/ScratchCard/',
  configureWebpack: {},
  themeConfig: {
    search: false,
    logo: '',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Brushes',
        ariaLabel: 'Brushes menu',
        items: [
          { text: 'Line', link: '/brushes/line/' },
          { text: 'Spray', link: '/brushes/spray/' },
          { text: 'Circle', link: '/brushes/circle/' },
          { text: 'Brush', link: '/brushes/brush/' },
          { text: 'Html background', link: '/brushes/html-bg/' },
        ]
      },
      { text: 'github', link: 'https://github.com/Tofandel/ScratchCard' },
      { text: 'npm', link: 'https://www.npmjs.com/package/@tofandel/scratchcard-js' },
    ],
  }
}
