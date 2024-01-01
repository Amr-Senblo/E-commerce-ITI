export interface ICart {
  "id": number,
  "user": number,
  "products": productBuyed[],
  "totalPrice": number,
  "ordered": boolean,
  "createdAt"?: string,
  "updatedAt"?: string
}
interface productBuyed {
  "id": number,
  "quantity": number
}
