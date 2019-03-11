const fs = require('fs')

exports.siteName = 'JobRadar'

exports.icon = (name) => `./images/icons/${name}.png`

exports.iconSvg = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

exports.menuItems = [
  { slug: '/allJobs', title: 'All Jobs', icon: 'icons8-drag-list-down-64', },
  { slug: '/tags', title: 'Tags', icon: 'icons8-tags-64', },
  { slug: '/top', title: 'Top', icon: 'icons8-up-squared-64', },
  { slug: '/add', title: 'Add', icon: 'icons8-plus-64', },
  { slug: '/map', title: 'Map', icon: 'icons8-google-maps-64', },
]
