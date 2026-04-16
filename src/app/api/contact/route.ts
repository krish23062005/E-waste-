import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, inquiry, message } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to the database using Prisma
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        inquiry: inquiry || 'other',
        message,
      },
    });

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing the request' },
      { status: 500 }
    );
  }
}
