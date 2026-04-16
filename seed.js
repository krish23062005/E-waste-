const { PrismaClient } = require('./src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

const seedDatabase = async () => {
  try {
    console.log('Connecting to SQLite via Prisma...');

    // Clear existing data
    await prisma.order.deleteMany({});
    await prisma.inventory.deleteMany({});
    console.log('Cleared existing data.');

    // ── 3 Inventory rows ──────────────────────────────────────────────────────
    const inventoryItems = [
      {
        metalName: 'Copper Wiring Grade A',
        category: 'Base',
        quantityKg: 82900,
        pricePerKg: 9.75,
        purity: 93.5,
        status: 'In Stock',
      },
      {
        metalName: 'Gold Pins Extracted',
        category: 'Precious',
        quantityKg: 1200,
        pricePerKg: 43500.0,
        purity: 98.4,
        status: 'In Stock',
      },
      {
        metalName: 'Aluminum Heat Sinks',
        category: 'Base',
        quantityKg: 0,
        pricePerKg: 4.20,
        purity: 87.0,
        status: 'Processing',
      },
      {
        metalName: 'Battery Grade Lithium',
        category: 'Rare',
        quantityKg: 500,
        pricePerKg: 154.0,
        purity: 99.9,
        status: 'In Stock',
      },
    ];

    const insertedInventory = [];
    for (const item of inventoryItems) {
      const created = await prisma.inventory.create({ data: item });
      insertedInventory.push(created);
      console.log(`  ✓ Inventory: ${created.metalName} (id=${created.id})`);
    }

    // ── 3 Order rows ──────────────────────────────────────────────────────────
    const orders = [
      {
        buyerName: 'Rajesh Kumar',
        buyerEmail: 'rajesh.kumar@techsolutions.in',
        companyName: 'Tech Solutions Pvt Ltd',
        metalId: insertedInventory[0].id,   // Copper
        quantityKg: 0.5,
        totalPrice: parseFloat((0.5 * insertedInventory[0].pricePerKg).toFixed(2)),
        status: 'Approved',
      },
      {
        buyerName: 'Priya Mehta',
        buyerEmail: 'priya.mehta@greenrecycle.com',
        companyName: 'Green Recycle Corp',
        metalId: insertedInventory[1].id,   // Gold
        quantityKg: 0.2,
        totalPrice: parseFloat((0.2 * insertedInventory[1].pricePerKg).toFixed(2)),
        status: 'Pending',
      },
      {
        buyerName: 'Anil Sharma',
        buyerEmail: 'anil.sharma@metaltrade.in',
        companyName: 'Metal Trade India',
        metalId: insertedInventory[2].id,   // Aluminum
        quantityKg: 0.8,
        totalPrice: parseFloat((0.8 * insertedInventory[2].pricePerKg).toFixed(2)),
        status: 'Completed',
      },
    ];

    await prisma.order.createMany({ data: orders });
    console.log(`  ✓ Inserted ${orders.length} orders.`);

    console.log('\n✅ Database seeded successfully with 4 inventory items and 3 orders!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
