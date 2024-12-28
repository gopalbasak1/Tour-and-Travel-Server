import mongoose from 'mongoose'
import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'
import Booking from './booking.model'

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  // const { tour, bookedSlots } = payload

  // const requiredTour = await Tour.findById(tour)

  // if (!requiredTour) {
  //     throw new Error('Tour not found')
  // }

  // const totalPrice = requiredTour.price * bookedSlots

  // payload.totalPrice = totalPrice
  // payload.bookingStatus = 'pending'

  // if (requiredTour.availableSeats < bookedSlots) {
  //     throw new Error('Not enough seats available')
  // }

  // const booking = await Booking.create(payload)

  // // throw new Error('Failed to create booking');

  // // availableSeats = availableSeats - bookedSlots

  // const updatedTour = await Tour.findByIdAndUpdate(tour, { $inc: { availableSeats: -bookedSlots } }, { new: true });

  // console.log(updatedTour);

  // if (!updatedTour) {
  //     throw new Error('Failed to update tour')
  // }

  // return booking

  // Clone database
  // sandbox - test database
  // database - error
  // database - delete
  // database - success
  // database - merge

  const session = await mongoose.startSession()

  session.startTransaction()

  try {
    const { tour, bookedSlots } = payload

    const requiredTour = await Tour.findById(tour)

    if (!requiredTour) {
      throw new Error('Tour not found')
    }

    const totalPrice = requiredTour.price * bookedSlots

    payload.totalPrice = totalPrice
    payload.bookingStatus = 'pending'

    if (requiredTour.availableSeats < bookedSlots) {
      throw new Error('Not enough seats available')
    }

    const booking = await Booking.create([payload], { session })

    console.log(booking)
    // throw new Error('Failed to create booking');

    // availableSeats = availableSeats - bookedSlots

    const updatedTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      { $inc: { availableSeats: -bookedSlots } },
      { new: true, session }
    )

    // console.log(updatedTour);

    if (!updatedTour) {
      throw new Error('Failed to update tour')
    }

    await session.commitTransaction()

    await session.endSession()

    return booking[0]
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

/**
 *
 * Booking update -
 *
 * Booking cancel - Booking Model
 *
 * Tour AvailableSeats =   availableSeats + BookedSlot  - Tour Model
 *
 */

// This update not work
const updateBookingIntoDB = async (
  id: string,
  payload: Partial<IBooking>
): Promise<IBooking> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Find the existing booking
    const existingBooking = await Booking.findById(id).session(session)

    if (!existingBooking) {
      throw new Error('Booking not found')
    }

    const { bookedSlots } = payload

    // If bookedSlots are updated, adjust the Tour's availableSeats
    if (
      bookedSlots !== undefined &&
      bookedSlots !== existingBooking.bookedSlots
    ) {
      const tour = await Tour.findById(existingBooking.tour).session(session)

      if (!tour) {
        throw new Error('Tour not found')
      }

      const seatDifference = bookedSlots - existingBooking.bookedSlots

      if (tour.availableSeats < seatDifference) {
        throw new Error('Not enough seats available')
      }

      // Update the Tour's availableSeats
      await Tour.findByIdAndUpdate(
        tour._id,
        { $inc: { availableSeats: -seatDifference } },
        { new: true, session }
      )
    }

    // Update the booking with the new payload
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { ...payload },
      { new: true, session }
    )

    await session.commitTransaction()
    session.endSession()

    return updatedBooking!
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

export const BookingService = {
  createBooking,
  updateBookingIntoDB,
}
