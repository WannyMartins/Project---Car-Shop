import { IMotorcycle } from "../../interfaces/IMotorcycle";

const motorcycleMock: IMotorcycle = {
  model: "savero",
  year: 2000,
  color: "red",
  buyValue: 25000,
  category:"Custom",
  engineCapacity: 1900
}

const motorcycleMockUpdateBefore: IMotorcycle  & {_id: string} = {
  _id: '62cf1fc6498565d94eba52cd',
  model: "santana",
  year: 2010,
  color: "green",
  buyValue: 28000,
  category:"Custom",
  engineCapacity: 1900
}


const motorcycleMockUpdate: IMotorcycle = {
  model: "ford Ka",
  year: 2000,
  color: "blue",
  buyValue: 25000,
  category:"Custom",
  engineCapacity: 1900
}

const motorcycleMockUpdateInvalido: any = {
  model: "ford Ka",
  year: "2000",
  color: "blue",
  buyValue: "25000",
  category:"Custom",
  engineCapacity: "1900"
}


const motorcycleMockUpdateWithId: IMotorcycle  & {_id: string}= {
  _id: '62cf1fc6498565d94eba52cd',
  model: "ford Ka",
  year: 2000,
  color: "blue",
  buyValue: 25000,
  category:"Custom",
  engineCapacity: 1900
}



const motorcycleMockWithId: IMotorcycle & {_id: string} = {
  _id: '62cf1fc6498565d94eba52cd',
  model: "savero",
  year: 2000,
  color: "red",
  buyValue: 25000,
  category:"Custom",
  engineCapacity: 1900
}

const motorcycleMockAllDb: Array<IMotorcycle & {_id: string}> = [
  {
  _id: '62cf1fc6498565d94eba52cd',
  model: "savero",
  year: 2000,
  color: "red",
  buyValue: 25000,
  category:"Custom",
  engineCapacity: 1900
},
{
  _id: '62cf1fc6498565d94eba32cd',
  model: "strada",
  year: 2008,
  color: "yellow",
  buyValue: 15000,
  category:"Custom",
  engineCapacity: 1900
}
]

const idValido: string = "62cf1fc6498565d94eba52cd";


export {motorcycleMock, motorcycleMockWithId, motorcycleMockAllDb, idValido, motorcycleMockUpdate, motorcycleMockUpdateWithId, motorcycleMockUpdateBefore, motorcycleMockUpdateInvalido}