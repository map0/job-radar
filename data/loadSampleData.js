require('dotenv').config({ path: __dirname + '/../variables.env' })

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise

const JobPost = require('../models/JobPost')
const User = require('../models/User')

const jobPosts = JSON.parse(fs.readFileSync(__dirname + '/jobPosts.json', 'utf-8'))
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'))

async function loadData() {
  try {
    await JobPost.insertMany(jobPosts)
    await User.insertMany(users)
    console.log('Sample data loaded!!!')
    process.exit();
  } catch(e) {
    console.log('Oops, something is not quite right. \n\t Failed to load sample data\n')
    console.log(e)
    process.exit()
  }
}

async function deleteData() {
  console.log('Data be gone...')
  await JobPsts.remove()
  await User.remove()
  console.log('Data is now gone. \n\t Trying to load sample data? run\n\n\t npm run load-sample-data\n\n')
  process.exit()
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}