const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`[ Connected to MongoDB ] ${mongoose.connection.name}`)
})
.catch((error)=>{ //initial attempt connection error message.
    console.error('[ Error connecting to MongoDB ]', error)
})

//Error message when connection error or break occurs.
mongoose.connection.once('error', (error)=>{
    console.error('An error has coccured with MongoDB.', error)
})