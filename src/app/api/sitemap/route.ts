import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecometal.dev';

    // Static routes
    const staticRoutes = [
      { url: `${baseUrl}/`, changeFrequency: 'monthly', priority: 1 },
      { url: `${baseUrl}/dashboard`, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${baseUrl}/marketplace`, changeFrequency: 'daily', priority: 0.9 },
      { url: `${baseUrl}/pricing`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    ];

    // Dynamic routes from Prisma
    const items = await prisma.inventory.findMany({
      select: { id: true, updatedAt: true },
      take: 100,
    });

    const dynamicRoutes = items.map((item) => ({
      url: `${baseUrl}/marketplace/${item.id}`,
      lastModified: item.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    return NextResponse.json({
      success: true,
      total_routes: allRoutes.length,
      data: allRoutes,
    });
  } catch (error) {
    console.error("Error fetching sitemap API data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
