import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { metal: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (data.quantityKg > 1) {
      return NextResponse.json(
        { error: "Maximum purchase limit is 1kg per buyer." },
        { status: 400 }
      );
    }

    // Use a transaction to safely check stock and create order atomically
    const newOrder = await prisma.$transaction(async (tx) => {
      const inventory = await tx.inventory.findUnique({
        where: { id: Number(data.metalId) },
      });

      if (!inventory || inventory.quantityKg < data.quantityKg) {
        throw new Error("Insufficient stock");
      }

      // Deduct from inventory
      await tx.inventory.update({
        where: { id: inventory.id },
        data: { quantityKg: inventory.quantityKg - data.quantityKg },
      });

      const totalPrice = inventory.pricePerKg * data.quantityKg;

      return tx.order.create({
        data: {
          buyerName: data.buyerName,
          buyerEmail: data.buyerEmail,
          companyName: data.companyName,
          metalId: inventory.id,
          quantityKg: data.quantityKg,
          totalPrice,
          status: "Pending",
        },
      });
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
