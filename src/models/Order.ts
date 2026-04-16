export interface IOrder {
  id: number;
  buyerName: string;
  buyerEmail: string;
  companyName: string;
  metalId: number;
  quantityKg: number;
  totalPrice: number;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export default IOrder;
