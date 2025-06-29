"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  DollarSign,
  Eye,
  MessageSquare,
  Download,
  Calendar,
  BarChart3
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminAnalyticsPage() {
  // Mock analytics data
  const analyticsData = {
    totalViews: 125430,
    totalUsers: 2847,
    totalListings: 1256,
    totalRevenue: 89750,
    conversionRate: 3.2,
    avgSessionDuration: '4m 32s',
    bounceRate: 42.3,
    topCategories: [
      { name: 'Electronics', count: 342, percentage: 27.2, trend: '+12%' },
      { name: 'Vehicles', count: 289, percentage: 23.0, trend: '+8%' },
      { name: 'Fashion', count: 198, percentage: 15.8, trend: '+15%' },
      { name: 'Home & Garden', count: 156, percentage: 12.4, trend: '+5%' },
      { name: 'Sports', count: 134, percentage: 10.7, trend: '+3%' }
    ],
    recentMetrics: [
      { period: 'Today', users: 234, listings: 45, revenue: 2340, views: 1250 },
      { period: 'Yesterday', users: 198, listings: 38, revenue: 1980, views: 1100 },
      { period: 'This Week', users: 1456, listings: 289, revenue: 15670, views: 8900 },
      { period: 'Last Week', users: 1234, listings: 245, revenue: 13450, views: 7800 },
      { period: 'This Month', users: 5678, listings: 1123, revenue: 67890, views: 35600 },
      { period: 'Last Month', users: 4567, listings: 987, revenue: 56780, views: 29800 }
    ],
    userGrowth: [
      { month: 'Jan', users: 1200, listings: 450 },
      { month: 'Feb', users: 1350, listings: 520 },
      { month: 'Mar', users: 1580, listings: 680 },
      { month: 'Apr', users: 1820, listings: 750 },
      { month: 'May', users: 2100, listings: 890 },
      { month: 'Jun', users: 2400, listings: 1020 },
      { month: 'Jul', users: 2847, listings: 1256 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return '₹' + new Intl.NumberFormat('en-IN').format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track platform performance and user engagement metrics.
          </p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalUsers.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.2%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalListings.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+15.3%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analyticsData.totalRevenue)}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-2.1%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {category.count} listings
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{category.percentage}%</Badge>
                    <Badge variant="outline" className="text-green-600">
                      {category.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Conversion Rate</div>
                  <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+0.3%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Avg. Session Duration</div>
                  <div className="text-2xl font-bold">{analyticsData.avgSessionDuration}</div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12s</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Bounce Rate</div>
                  <div className="text-2xl font-bold">{analyticsData.bounceRate}%</div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-red-500">
                  <TrendingDown className="h-3 w-3" />
                  <span>-1.2%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Monthly Active Users</div>
                  <div className="text-2xl font-bold">1,847</div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+18%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Growth Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Chart visualization would go here</p>
              <p className="text-sm text-muted-foreground">Integration with charting library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Period</th>
                  <th className="text-left py-2">Users</th>
                  <th className="text-left py-2">New Listings</th>
                  <th className="text-left py-2">Views</th>
                  <th className="text-left py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.recentMetrics.map((metric, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{metric.period}</td>
                    <td className="py-3">{metric.users.toLocaleString()}</td>
                    <td className="py-3">{metric.listings}</td>
                    <td className="py-3">{metric.views.toLocaleString()}</td>
                    <td className="py-3">{formatCurrency(metric.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}