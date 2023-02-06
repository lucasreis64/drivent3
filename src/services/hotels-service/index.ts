import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";

async function validateEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  return enrollment.id;
}

async function validateTicket(enrollmentId: number) {
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);

  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.status !== "PAID" || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote) {
    throw 402;
  }
}

async function getHotels(userId: number) {
  const enrollmentId = await validateEnrollment(userId);

  await validateTicket(enrollmentId);

  const hotels = await hotelsRepository.findHotels();

  if (!hotels[0]) throw notFoundError();

  return hotels;
}

async function getHotelsById(userId: number, hotelId: number) {
  const enrollmentId = await validateEnrollment(userId);

  await validateTicket(enrollmentId);

  const hotel = await hotelsRepository.findHotelById(hotelId);

  if (!hotel) throw notFoundError();

  return hotel;
}

const hotelsService = {
  getHotels,
  getHotelsById,
};

export default hotelsService;
