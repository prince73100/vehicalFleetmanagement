# Vehicle Fleet Management Project

## Overview

This project is a full-stack Vehicle Fleet Management system built with **Node.js**, **Express**, **MongoDB**, and **React.js**.  
It allows users to sign up, log in, add vehicles, search for available vehicles, and book vehicles for transportation.  
Admin and user roles are supported, and booking logic prevents double-booking of vehicles.

---

## Features

- **User Authentication:** Sign up, log in, JWT-based session, protected routes.
- **Vehicle Management:** Add vehicles with capacity and tyre details.
- **Booking System:** Search available vehicles, book vehicles, prevent booking conflicts.
- **Admin/User Roles:** Role-based access for features.
- **RESTful API:** Well-structured endpoints for all operations.
- **Unit Testing:** Jest and Supertest for backend API testing.
- **Frontend:** React app with protected routes, forms, and booking UI.

---

## Backend Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/prince73100/vehicalfleetProject.git
   cd vehicalfleetProject/vehicalfleetbackend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in `vehicalfleetbackend`:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Run the backend server:**
   ```sh
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

5. **Run backend tests:**
   ```sh
   npm test
   ```

---

## Frontend Setup

1. **Go to frontend folder:**
   ```sh
   cd ../vehicalfleetManagement
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the frontend app:**
   ```sh
   npm run dev
   ```
   The app will start on `http://localhost:5173`.

---

## API Endpoints

- `POST /api/v1/signUp` — User registration
- `POST /api/v1/signIn` — User login
- `POST /api/v1/add-vehical` — Add a new vehicle
- `GET /api/v1/vehicles/available` — Search available vehicles
- `POST /api/v1/booking-vehical` — Book a vehicle
- `GET /api/v1/getall-booking` — Get all bookings (with details)
- `GET /api/v1/getBookingId/:bookingId` — Get booking by ID (with details)
- `DELETE /api/v1/deleteBookingId/:bookingId` — Delete booking by ID

---

## Testing

- Backend tests are in `vehicalfleetbackend/tests/`
- Run with `npm test`
- Tests cover vehicle creation, availability search, and booking logic (including conflict scenarios).

---

## Notes

- Make sure MongoDB is running and accessible.
- Update CORS settings in backend if frontend runs on a different port.
- Use `.gitignore` to hide sensitive files like `.env` and `node_modules`.

---

## License

MIT

---

## Author

Prince
[GitHub](https://github.com/prince73100)