import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.business(),
      Rooms: {
        create: [
          {
            name: faker.company.catchPhraseNoun(),
            capacity: 5,
          },
          {
            name: faker.company.catchPhraseNoun(),
            capacity: 3,
          },
        ],
      },
    },
  });
}
