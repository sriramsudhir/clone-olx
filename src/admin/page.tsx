import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Eye,
  MessageSquare,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { listings, users, conversations } from "@/lib/data";
import AdminStatsCard from "./components/AdminStatsCard";
import RecentActivityTable from "./components/RecentActivityTable";
import QuickActionsCard from "./components/QuickActionsCard";

export default function AdminDashboard() {
  const totalListings = listings.length;
  const totalUsers = users.length;
  const totalMessages = conversations.reduce((acc, conv) => acc + conv.messages.length, 0);
  const activeListings = listings.filter(l => !l.isHighlighted).length;
  const pendingReports = 5; // Mock data
  const totalRevenue = 125000; // Mock data

  const recentActivities = [
    {
      id: '1',
      type: 'listing',
      title: 'New listing created',
      description: 'Samsung Galaxy Z Fold 5 512GB',
      user: 'Ahmad Hudzaifah',
      timestamp: '2 minutes ago',
      status: 'active'
    },
    {
      id: '2',
      type: 'user',
      title: 'New user registered',
      description: 'john.doe@email.com',
      user: 'John Doe',
      timestamp: '15 minutes ago',
      status: 'pending'
    },
    {
      id: '3',
      type: 'report',
      title: 'Listing reported',
      description: 'Inappropriate content reported',
      user: 'Anonymous',
      timestamp: '1 hour ago',
      status: 'pending'
    },
    {
      id: '4',
      type: 'message',
      title: 'Support ticket',
      description: 'Payment issue reported',
      user: 'Budi Santoso',
      timestamp: '2 hours ago',
      status: 'resolved'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with TradeZone today.
          </p>
        </div>
        <Button>
          <Eye className="mr-2 h-4 w-4" />
          View Site
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatsCard
          title="Total Users"
          value={totalUsers.toString()}
          change="+12%"
          changeType="positive"
          icon={Users}
        />
        <AdminStatsCard
          title="Total Listings"
          value={totalListings.toString()}
          change="+8%"
          changeType="positive"
          icon={Package}
        />
        <AdminStatsCard
          title="Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          change="+23%"
          changeType="positive"
          icon={DollarSign}
        />
        <AdminStatsCard
          title="Pending Reports"
          value={pendingReports.toString()}
          change="-5%"
          changeType="negative"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivityTable activities={recentActivities} />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActionsCard />
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeListings}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeListings / totalListings) * 100)}% of total listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              +15% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last week
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}