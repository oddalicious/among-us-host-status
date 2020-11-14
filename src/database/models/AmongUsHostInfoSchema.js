import mongoose from 'mongoose'

const AmongUsHostInfoSchema = new mongoose.Schema({
    party_id: {
        type: String,
    },
    guild_id: {
        type: String,
    },
    username: {
        type: String,
    },
    user_id: {
        type: String,
    },
})

const AmongUsHostInfoModel = mongoose.model(
    'AmongUshostInfo',
    AmongUsHostInfoSchema
)

export default AmongUsHostInfoModel
