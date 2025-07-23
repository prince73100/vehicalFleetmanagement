import Booking from "../model/booking.js";
import Vehicle from "../model/vehicles.js";
import { estimatedRideDurationHours } from "../utils/estimatedRideDurationHours.js";

export const createVehicle = async (req, res) => {
  try {
    const { name, capacityInkg, tyres } = req.body;
    if (
      typeof name !== "string" ||
      typeof capacityInkg !== "number" ||
      typeof tyres !== "number"
    ) {
      return res.status(400).json({ message: "Invalid input types." });
    }
    if (!name || !capacityInkg || !tyres) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const vehicle = new Vehicle({
      name,
      capacityInkg,
      tyres,
    });

    const savedVehicle = await vehicle.save();
    res.status(201).json({
      status: 201,
      message: "Vehical add successfully.",
      savedVehicle,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export const getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res
        .status(400)
        .json({ message: "All query parameters are required." });
    }

    const capacity = Number(capacityRequired);
    console.log(capacity);
    if (isNaN(capacity)) {
      return res
        .status(400)
        .json({ message: "capacityRequired must be a number." });
    }

    const bookingStart = new Date(startTime);
    console.log(bookingStart);
    if (isNaN(bookingStart.getTime())) {
      return res.status(400).json({ message: "Invalid startTime format." });
    }

    const estimatedRideDurationHour = estimatedRideDurationHours(
      toPincode,
      fromPincode
    );
    console.log(estimatedRideDurationHour);
    const bookingEnd = new Date(
      bookingStart.getTime() + estimatedRideDurationHour
    );
    const vehicles = await Vehicle.find({ capacityInkg: { $gte: capacity } });
    const bookedVehicleIds = await Booking.find({
      startTime: { $lt: bookingEnd },
      $expr: {
        $gt: [
          { $add: ["$startTime", estimatedRideDurationHour] },
          bookingStart,
        ],
      },
    }).distinct("vehicleId");
    const availableVehicles = vehicles.filter(
      (v) => !bookedVehicleIds.some((id) => id.toString() === v._id.toString())
    );

    res.json({ availableVehicles, estimatedRideDurationHour });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
