import { faker } from "@faker-js/faker";


const getRandomTransaction = () => {
  return {
    id: faker.finance.ethereumAddress(),
    time: faker.date.anytime(),
    amount: faker.finance.amount({ min: 50, max: 1000 }),
  };
};

export const getTransactions = (length: number) => {
  const data = [];

  for (let i = 0; i < length; i++) {
    data.push(getRandomTransaction());
  }

  return data;
};
