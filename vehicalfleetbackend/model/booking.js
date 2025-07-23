import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  fromPincode: {
    type: String,
    required: true,
  },
  toPincode: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking