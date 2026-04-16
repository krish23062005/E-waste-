export interface IInventory {
  id: number;
  metalName: string;
  category: string;
  quantityKg: number;
  pricePerKg: number;
  purity: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IInventory;
