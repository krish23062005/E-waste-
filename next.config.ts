import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow better-sqlite3 native module in serverless functions
  serverExternalPackages: ["better-sqlite3"],
  
  // Include the SQLite database file in the serverless function bundle
  outputFileTracingIncludes: {
    "/api/**": ["./prisma/dev.db"],
    "/dashboard/**": ["./prisma/dev.db"],
    "/marketplace/**": ["./prisma/dev.db"],
  },
};

export default nextConfig;
