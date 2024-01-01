export interface IProduct {
  "id": number,
  "name": string,
  "description": string,
  "price": number,
  "quantity": number,
  "imageCover": string,
  "images": string[],
  "category": number,
  "ratingAverage"?: number,
  "ratingQuantity"?: number,
  "createdAt"?: string,
  "updatedAt"?: string
  "CommonSpecifications": CommonSpecifications
}
interface CommonSpecifications {
  Processor: string,
  RAM: string,
  Storage: string,
  screenSize: string,
  BatteryCapacity: string,
  OperatingSystem?: string,
  BiometricAuthentication?: string,
  WirelessCharging?: string,
  Ports?: string
}
