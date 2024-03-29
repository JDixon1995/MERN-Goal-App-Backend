const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')

connectDB()

const app = express()

app.use(cors({
  origin: "https://jdixon1995.github.io/MERN-Goal-App-Front-End/",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
	res.send('Hello Goal Setter App.')
})

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


// Serve front-end
/*
if(process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../front-end/build')))

	app.get('*', (req, res) => 
		res.sendFile(
			path.resolve(__dirname, '../', 'front-end', 'build', 'index.html')))
} else {
	app.get('/', (req, res) => res.send('Please set to production.'))
}
*/
app.use(errorHandler)

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
