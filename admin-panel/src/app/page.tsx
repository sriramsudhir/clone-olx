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
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AdminDashboard() {
  // Mock data - in real app, this would come from API
  const stats = {
    totalUsers: 2847,
    totalListings: 1256,
    totalRevenue: 125000,
    pendingReports: 5,
    newUsersToday: 23,
    newListingsToday: 45,
    revenueToday: 2340,
    activeUsers: 1234
  };

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
          <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12%</span>
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
            <div className="text-2xl font-bold">{stats.totalListings.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8%</span>
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
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+23%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReports}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowDownRight className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-5%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {activity.type === 'listing' && <Package className="h-4 w-4" />}
                        {activity.type === 'user' && <Users className="h-4 w-4" />}
                        {activity.type === 'report' && <AlertTriangle className="h-4 w-4" />}
                        {activity.type === 'message' && <MessageSquare className="h-4 w-4" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">
                          {activity.title}
                        </p>
                        <Badge variant={activity.status === 'active' ? 'default' : activity.status === 'pending' ? 'secondary' : 'outline'}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start h-auto p-4" variant="default">
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Add New User</div>
                    <div className="text-xs opacity-70">Create a new user account</div>
                  </div>
                </div>
              </Button>
              
              <Button className="w-full justify-start h-auto p-4" variant="destructive">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Review Reports</div>
                    <div className="text-xs opacity-70">Check pending reports</div>
                  </div>
                </div>
              </Button>
              
              <Button className="w-full justify-start h-auto p-4" variant="secondary">
                <div className="flex items-start space-x-3">
                  <Package className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Moderate Content</div>
                    <div className="text-xs opacity-70">Review flagged listings</div>
                  </div>
                </div>
              </Button>
              
              <Button className="w-full justify-start h-auto p-4" variant="outline">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">View Analytics</div>
                    <div className="text-xs opacity-70">Check platform metrics</div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
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
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.activeUsers / stats.totalListings) * 100)}% of total listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
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