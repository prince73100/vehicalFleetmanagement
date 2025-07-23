import Booking from "../model/booking.js";
import Vehicle from "../model/vehicles.js";
import User from "../model/user..js";
import { estimatedRideDurationHours } from "../utils/estimatedRideDurationHours.js";
export const createBooking = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime } = req.body;
    if (!vehicleId || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle)
      return res.status(404).json({ message: "Vehicle not found." });

    const user = await User.findById(req?.user?.userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    const estimatedRideDurationHour = estimatedRideDurationHours(
      fromPincode,
      toPincode
    );
    const bookingStart = new Date(startTime);
    const bookingEnd = new Date(
      bookingStart.getTime() + estimatedRideDurationHour * 60 * 60 * 1000
    );
    const conflict = await Booking.findOne({
      vehicleId,
      $or: [
        {
          startTime: { $lt: bookingEnd },
        },
        {
          startTime: { $lte: bookingStart },
        },
      ],
      $expr: {
        $gt: [
          {
            $add: [
              "$startTime",
              { $multiply: [estimatedRideDurationHours, 60 * 60 * 1000] },
            ],
          },
          bookingStart,
        ],
      },
    });

    if (conflict) {
      return res
        .status(409)
        .json({
          message: "Vehicle is already booked for the selected time window.",
        });
    }
    const booking = new Booking({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: bookingStart,
      customerId: req?.user?.userId,
    });

    const savedBooking = await booking.save();
    res.status(201).json({
      ...savedBooking.toObject(),
      estimatedRideDurationHours,
      bookingEndTime: bookingEnd,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("vehicleId")
      .populate("customerId");
    res.status(200).json({bookings});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate("vehicleId")
      .populate("customerId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    res.status(200).json({booking});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    res.status(200).json({ message: "Booking deleted successfully.", deletedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};