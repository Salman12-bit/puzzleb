import mongoose from 'mongoose'


const dbConnection = async () => {
    try {
        let conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Datebase Connected Successfully`.bgCyan)
    } catch (error) {
        console.log(error)
        console.log(`Error in DB Connection`.bgRed)
    }
}
export default dbConnection;