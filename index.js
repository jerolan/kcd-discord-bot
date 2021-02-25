require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'local'}`,
})

const Discord = require('discord.js')
const express = require('express')
const {setup, rollbar} = require('./src')

const app = express()
const client = new Discord.Client()

rollbar.log('logging in discord client')
client.login(process.env.DISCORD_BOT_TOKEN)

client.on('ready', error => {
  if (error) {
    rollbar.log('Error logging client in')
    throw error
  } else {
    rollbar.log('Client logged in... Setting up client.')
    setup(client)
  }
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.NODE_ENV || 3000)
