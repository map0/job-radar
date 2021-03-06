const fs = require('fs')

exports.siteName = 'JobRadar'

exports.icon = (name) => `../../images/icons/${name}.png`

exports.iconSvg = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`)

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.menuItems = [
  { slug: '/jobPosts', title: 'All Jobs', icon: 'icons8-drag-list-down-64', },
  { slug: '/tags', title: 'Tags', icon: 'icons8-tags-64', },
  { slug: '/top', title: 'Top', icon: 'icons8-up-squared-64', },
  { slug: '/add', title: 'Add', icon: 'icons8-plus-64', },
  { slug: '/map', title: 'Map', icon: 'icons8-google-maps-64', },
]

exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`
