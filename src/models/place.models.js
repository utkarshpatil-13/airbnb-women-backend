import mongoose from 'mongoose'

const placeSchema = mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type : String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    photos: [
        {
            type: String,
        }
    ],
    description :{
        type: String,
        required: true,
    },
    perks: [{
        type: String,
    },],
    extraInfo: {
        type: String,
    },
    checkIn: {
        type: Number,
    },
    checkOut: {
        type: Number,
    },
    maxGuests: {
        type: Number
    }
});

const Place = mongoose.model('Place', placeSchema);

export default Place;