import { AutomobileInterface } from "../interfaces/QuestaoCincoInterface"
import { BadRequestError, NotFoundError } from "../models/ErrorStats"

export class QuestaoCincoService {

    questaoCinco = async () => {

        try {
            const totalDistance: number = 125
            const car: AutomobileInterface = { velocity: 90, time: 0, distance: 0 }
            const truck: AutomobileInterface = { velocity: 90, time: 0, distance: 0 }
            
            while (car.distance + truck.distance < totalDistance) {
                car.time += 1 / 60
                truck.time += 1 / 60

                car.distance = calculateDistance(car, car.time)
                truck.distance = calculateDistance(truck, truck.time)

                car.time += 1 / 12
            }

            const carDistanceRP = totalDistance - car.distance
            const truckDistanceRP = truck.distance

            return carDistanceRP < truckDistanceRP ? "O carro está mais próximo de Ribeirão Preto." : "O caminhão está mais próximo de Ribeirão Preto."

        } catch (error) {
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                return error.statusCode, error.message
            }
        }

    }

}

const calculateDistance = (auto: AutomobileInterface, time: number): number => {
    return auto.velocity * time
}