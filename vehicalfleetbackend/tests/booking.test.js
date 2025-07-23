import request from 'supertest'; 
import app from '..'


let vehicleId
let userId

beforeAll(async () => {
  // Create a test user
  const userRes = await request(app)
    .post('/api/v1/signUp')
    .send({
      name: 'Test User',
      email: 'testuser@example.com',
      phone: '1234567890',
      password: 'testpass'
    })
  userId = userRes.body._id || userRes.body.user?._id

  // Create a test vehicle
  const vehicleRes = await request(app)
    .post('/api/v1/add-vehical')
    .send({
      name: 'Test Truck',
      capacityKg: 1000,
      tyres: 6
    })
  vehicleId = vehicleRes.body._id || vehicleRes.body.savedVehicle?._id
})

describe('Booking API', () => {
  let bookingStartTime = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour from now

  it('should create a booking (POST /api/v1/booking-vehical)', async () => {
    const res = await request(app)
      .post('/api/v1/booking-vehical')
      .send({
        vehicleId,
        fromPincode: '110001',
        toPincode: '110002',
        startTime: bookingStartTime,
        customerId: userId
      })
    expect([201, 409]).toContain(res.statusCode)
    if (res.statusCode === 201) {
      expect(res.body.vehicleId).toBe(vehicleId)
      expect(res.body.customerId).toBe(userId)
    }
  })

  it('should not allow booking if there is a conflict', async () => {
    // Try to book the same vehicle for overlapping time
    const res = await request(app)
      .post('/api/v1/booking-vehical')
      .send({
        vehicleId,
        fromPincode: '110001',
        toPincode: '110002',
        startTime: bookingStartTime,
        customerId: userId
      })
    expect(res.statusCode).toBe(409)
    expect(res.body.message).toMatch(/already booked/i)
  })
})