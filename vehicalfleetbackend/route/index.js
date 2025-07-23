import express from 'express'
import { gettoken, signIn, signUp } from '../controller/user.controller.js'
import { createVehicle, getAvailableVehicles } from '../controller/vehical.controller.js';
import { verifyUser } from '../middleware/middleware.js';
import { createBooking, deleteBookingById, getAllBookings, getBookingById } from '../controller/booking.controller.js';

export const router = express.Router()

// UserSignIn Route
router.route('/signUp').post(signUp);
router.route('/signIn').post(signIn);

// get cookie
router.route('/referesh').get(verifyUser,gettoken)

// Add vehical
router.route('/add-vehical').post(createVehicle);

router.route('/available-vehicles').get(getAvailableVehicles)
router.route('/booking-vehical').post(verifyUser,createBooking)
router.route('/getall-booking').get(verifyUser,getAllBookings)
router.route('/getBookingId/:bookingId').get(verifyUser,getBookingById)
router.route('/deleteBookingId/:bookingId').delete(verifyUser,deleteBookingById)


