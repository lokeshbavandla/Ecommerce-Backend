import 'dotenv/config'
import dbconnect from './db/index.js'
import app from './app.js'

const PORT = process.env.PORT || 3000;

dbconnect()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at PORT:${PORT}`);
    })
})
.catch((err)=>{
    console.log('MONGODB Connection ERROR', err);
})