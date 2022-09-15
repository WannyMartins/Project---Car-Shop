import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  model: "savero",
  year: 2000,
  color: "red",
  buyValue: 25000,
  doorsQty: 4,
  seatsQty: 5
}

const carMockUpdate: ICar = {
  model: "ford Ka",
  year: 2000,
  color: "blue",
  buyValue: 25000,
  doorsQty: 4,
  seatsQty: 5
}

const carMockUpdateWithId: ICar  & {_id: string}= {
  _id: '62cf1fc6498565d94eba52cd',
  model: "ford Ka",
  year: 2000,
  color: "blue",
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

const carMockAllDb: Array<ICar & {_id: string}> = [
  {
  _id: '62cf1fc6498565d94eba52cd',
  model: "savero",
  year: 2000,
  color: "red",
  buyValue: 25000,
  doorsQty: 4,
  seatsQty: 5
},
{
  _id: '62cf1fc6498565d94eba32cd',
  model: "strada",
  year: 2008,
  color: "yellow",
  buyValue: 15000,
  doorsQty: 2,
  seatsQty: 2
}
]

const idValido: string = "62cf1fc6498565d94eba52cd";


export {carMock, carMockWithId, carMockAllDb, idValido, carMockUpdate, carMockUpdateWithId}