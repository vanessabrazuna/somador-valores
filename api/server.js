require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

const env = {
  PORT: Number(process.env.PORT) || 5000,
}

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const filePath = path.join(__dirname, 'data.json')

function saveData(data) {
  let currentData = []

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath)
    currentData = JSON.parse(content)
  }

  currentData.push(data)

  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2))
}

app.post('/api/somar', (req, res) => {
  const { firstValue, secondValue } = req.body
  console.log('Received data:', req.body)

  if (typeof firstValue !== 'number' || typeof secondValue !== 'number') {
    return res.status(400).json({ error: 'Values must be numbers.' })
  }

  const result = firstValue + secondValue

  const dataToSave = {
    firstValue,
    secondValue,
    result,
    date: new Date().toISOString(),
  }

  saveData(dataToSave)

  return res.json({ result })
})

function startServer(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server)
    })

    server.on('error', (err) => {
      reject(err)
    })
  })
}

startServer(env.PORT)
  .then(() => {
    console.log(`HTTP server is running on port ${env.PORT}`)
  })
  .catch((err) => {
    console.error('Error starting the server:', err)
  })
