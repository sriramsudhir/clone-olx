
import { NextResponse } from 'next/server';
import { listings, users } from '@/lib/data';

export async function GET() {
  const totalListings = listings.length;
  const totalUsers = users.length;
  const totalRevenue = listings.reduce((sum, item) => sum + (item.price), 0);

  const recentListings = [...listings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = {
    totalListings,
    totalUsers,
    totalRevenue,
  };

  const categoryCounts = listings.reduce((acc: Record<string, number>, listing) => {
    acc[listing.category] = (acc[listing.category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  return NextResponse.json({ stats, recentListings, categoryChartData });
}
