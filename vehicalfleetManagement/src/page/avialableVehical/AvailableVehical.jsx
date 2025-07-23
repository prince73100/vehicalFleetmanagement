import React from "react";
import { useForm } from "react-hook-form";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Car,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import api from "../../hook/apiServices";

const VehicleBookingpage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [searchResults, setSearchResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isBooking, setIsBooking] = React.useState(false);
  const [bookingVehicleId, setBookingVehicleId] = React.useState(null);
  const [message, setMessage] = React.useState({ type: "", text: "" });

  const CUSTOMER_ID = "customer123";

  const onSubmit = async (formData) => {
    setIsSearching(true);
    setMessage({ type: "", text: "" });
    setSearchResults([]);

    try {
      const queryParams = new URLSearchParams({
        capacityRequired: formData.capacity,
        fromPincode: formData.fromPincode,
        toPincode: formData.toPincode,
        startTime: formData.startDateTime,
      });

      const response = await api.get(`/available-vehicles?${queryParams}`);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newArray = response?.data?.availableVehicles?.map((el) => {
        return {
          ...el,
          estimatedRideDurationHour: response?.data?.estimatedRideDurationHour,
        };
      });
      console.log(newArray);
      setSearchResults(newArray || []);

      if (
        !response?.data?.availableVehicles ||
        response?.data?.availableVehicles.length === 0
      ) {
        setMessage({
          type: "info",
          text: "No vehicles available for the selected criteria",
        });
      } else {
        setMessage({
          type: "success",
          text: `Found ${response?.data?.availableVehicles.length} available vehicle(s)`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to search vehicles. Please try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const bookVehicle = async (vehicle) => {
    setIsBooking(true);
    setBookingVehicleId(vehicle._id);
    setMessage({ type: "", text: "" });

    try {
      const bookingData = {
        vehicleId: vehicle._id,
        fromPincode: watch("fromPincode"),
        toPincode: watch("toPincode"),
        startTime: watch("startDateTime"),
      };

      const response = await api.post('/booking-vehical',bookingData);
      console.log(response)
   
      if (response.status!==201) {
        setMessage({
          type: "error",
          text: response?.data?.message,
        });
      }

      setMessage({
        type: "success",
        text: `Booking confirmed! Booking ID: ${
          response?.data?.vehicleId || "Generated"
        }`,
      });

      setSearchResults((prev) => prev.filter((v) => v._id !== vehicle._id));
    } catch (error) {
        console.log(error)
      if (
        error.message.includes("unavailable") ||
        error.message.includes("conflict")
      ) {
        setMessage({
          type: "error",
          text: "Vehicle became unavailable. Please search again.",
        });
        handleSubmit(onSubmit)();
      } else {
        setMessage({
          type: "error",
          text: error?.response?.data?.message,
        });
      }
    } finally {
      setIsBooking(false);
      setBookingVehicleId(null);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const MessageAlert = ({ message }) => {
    if (!message.text) return null;

    const getIcon = () => {
      switch (message.type) {
        case "success":
          return <CheckCircle className="h-5 w-5" />;
        case "error":
          return <AlertCircle className="h-5 w-5" />;
        case "info":
          return <AlertCircle className="h-5 w-5" />;
        default:
          return null;
      }
    };

    const getColors = () => {
      switch (message.type) {
        case "success":
          return "bg-green-50 border-green-200 text-green-800";
        case "error":
          return "bg-red-50 border-red-200 text-red-800";
        case "info":
          return "bg-blue-50 border-blue-200 text-blue-800";
        default:
          return "bg-gray-50 border-gray-200 text-gray-800";
      }
    };

    return (
      <div
        className={`p-4 border rounded-lg flex items-center gap-3 ${getColors()}`}
      >
        {getIcon()}
        <span className="text-sm font-medium">{message.text}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vehicle Booking System
          </h1>
          <p className="text-gray-600">
            Search and book vehicles for your transportation needs
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Vehicles
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Capacity Required *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    id="capacity"
                    {...register("capacity", {
                      required: "Capacity is required",
                      min: {
                        value: 1,
                        message: "Capacity must be greater than 0",
                      },
                    })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 4"
                  />
                  {errors.capacity && (
                    <span className="text-xs text-red-600">
                      {errors.capacity.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="fromPincode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  From Pincode *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="fromPincode"
                    {...register("fromPincode", {
                      required: "From pincode is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Pincode must be 6 digits",
                      },
                    })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="110001"
                  />
                  {errors.fromPincode && (
                    <span className="text-xs text-red-600">
                      {errors.fromPincode.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="toPincode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  To Pincode *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="toPincode"
                    {...register("toPincode", {
                      required: "To pincode is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Pincode must be 6 digits",
                      },
                    })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="110002"
                  />
                  {errors.toPincode && (
                    <span className="text-xs text-red-600">
                      {errors.toPincode.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="startDateTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date & Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="datetime-local"
                    id="startDateTime"
                    {...register("startDateTime", {
                      required: "Start date & time is required",
                      validate: (value) =>
                        new Date(value) > new Date() ||
                        "Start date must be in the future",
                    })}
                    min={new Date().toISOString().slice(0, 16)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.startDateTime && (
                    <span className="text-xs text-red-600">
                      {errors.startDateTime.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search Availability
                </>
              )}
            </button>
          </form>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className="mb-6">
            <MessageAlert message={message} />
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Car className="h-5 w-5" />
              Available Vehicles ({searchResults.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((vehicle) => (
                <div
                  key={vehicle._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {vehicle.name}
                    </h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Capacity: {vehicle.capacityInkg} kg</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Car className="h-4 w-4" />
                      <span>Tyres: {vehicle.tyres}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Car className="h-4 w-4" />
                      <span>
                        Estimated Time: {vehicle.estimatedRideDurationHour}
                      </span>
                    </div>
                    {vehicle.estimatedDuration && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {vehicle.estimatedDuration}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => bookVehicle(vehicle)}
                    disabled={isBooking && bookingVehicleId === vehicle._id}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
                  >
                    {isBooking && bookingVehicleId === vehicle._id ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Book Now"
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Booking Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Booking Details:
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">From:</span>{" "}
                  {watch("fromPincode")}
                </p>
                <p>
                  <span className="font-medium">To:</span> {watch("toPincode")}
                </p>
                <p>
                  <span className="font-medium">Date & Time:</span>{" "}
                  {formatDateTime(watch("startDateTime"))}
                </p>
                <p>
                  <span className="font-medium">Capacity:</span>{" "}
                  {watch("capacity")} kg
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleBookingpage;
