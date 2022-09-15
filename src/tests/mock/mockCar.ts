import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  model: "savero",
  year: 2000,
  color: "red",
  buyValue: 25000,
  doorsQty: 4,
  seatsQty: 5
}

const carMockWithId: ICar & {_id: string} = {
  _id: '62cf1fc6498565d94eba52cd',
  model: "savero",
  year: 2000,
  color: "red",
  buyValue: 25000,
  doorsQty: 4,
  seatsQty: 5
}

export {carMock, carMockWithId}