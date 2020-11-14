import mongoose from 'mongoose'

const DB_CONNECTION = process.env.DB_CONNECTION

export default mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
