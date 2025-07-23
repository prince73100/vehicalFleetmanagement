import React, { useState } from 'react';
import { Eye, Trash2, X, Calendar, User, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useEffect } from 'react';
import api from '../../hook/apiServices';
import { useAuth } from '../../hook/authhook';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);

  const {extractDateAndTime} = useAuth()

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleDelete = async(id) => {
    const res = await api.delete(`/deleteBookingId/${id}`);

    if (res?.status===200) {
      setBookings(bookings.filter(booking => booking._id !== id));
    }
  };

  const handlePreview = async(bookingID) => {
    const res = await api.get(`/getBookingId/${bookingID}`)
    setSelectedBooking(res.data?.booking);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(()=>{
    const fetchBooking=async()=>{
        const res =  await api.get('/getall-booking')
        console.log(res.data?.bookings)
        setBookings(res.data?.bookings)
    }
    fetchBooking()
  },[])
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <h2 className="text-xl md:text-2xl font-semibold text-white">Booking Management</h2>
          <p className="text-blue-100 mt-1">Manage your bookings and reservations</p>
        </div>

        <div className="block md:hidden">
          {bookings.map((booking) => (
            <div key={booking._id} className="border-b border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{booking.customerId?.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600 mb-3">
                <p><span className="font-medium">Service:</span> {booking.service}</p>
                <p><span className="font-medium">Date:</span> {booking.date}</p>
                <p><span className="font-medium">Time:</span> {booking.time}</p>
                <p><span className="font-medium">Location:</span> {booking.location}</p>
                <p><span className="font-medium">Amount:</span> {booking.amount}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePreview(booking)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </button>
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehical Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.customerId?.name}</div>
                      <div className="text-sm text-gray-500">{booking.customerId?.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking?.vehicleId?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{extractDateAndTime(booking?.startTime,true)?.date}</div>
                    <div className="text-sm text-gray-500">{extractDateAndTime(booking?.startTime,true)?.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handlePreview(booking?._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors inline-flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors inline-flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No bookings found</div>
            <div className="text-gray-400 text-sm mt-1">All bookings will appear here</div>
          </div>
        )}
      </div>

      {showPreview && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
              <button
                onClick={closePreview}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-500">Customer Name</div>
                      <div className="text-lg text-gray-900">{selectedBooking.customerId?.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-500">Email</div>
                      <div className="text-gray-900">{selectedBooking.customerId?.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-500">Phone</div>
                      <div className="text-gray-900">{selectedBooking.customerId?.phone}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-500">Vehical Name</div>
                      <div className="text-lg text-gray-900">{selectedBooking?.vehicleId?.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-500">Date</div>
                      <div className="text-gray-900">{extractDateAndTime(selectedBooking.startTime,true)?.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-500">Time</div>
                      <div className="text-gray-900">{extractDateAndTime(selectedBooking.startTime,true)?.time}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Capacity</div>
                    <div className="text-2xl font-bold text-green-600">{selectedBooking?.vehicleId?.capacityInkg}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Booking ID</div>
                    <div className="text-gray-900 font-mono">#{selectedBooking._id}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={closePreview}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleDelete(selectedBooking._id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTable;