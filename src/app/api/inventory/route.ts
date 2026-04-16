import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Check if metal already exists — if so, update quantity
    const existingMetal = await prisma.inventory.findUnique({
      where: { metalName: data.metalName },
    });

    if (existingMetal) {
      const updated = await prisma.inventory.update({
        where: { metalName: data.metalName },
        data: { quantityKg: existingMetal.quantityKg + data.quantityKg },
      });
      return NextResponse.json(updated, { status: 200 });
    }

    const newMetal = await prisma.inventory.create({ data });
    return NextResponse.json(newMetal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create inventory item" },
      { status: 500 }
    );
  }
}
