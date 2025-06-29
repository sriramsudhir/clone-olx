import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, User, AlertTriangle, MessageSquare } from "lucide-react";

interface Activity {
  id: string;
  type: 'listing' | 'user' | 'report' | 'message';
  title: string;
  description: string;
  user: string;
  timestamp: string;
  status: 'active' | 'pending' | 'resolved';
}

interface RecentActivityTableProps {
  activities: Activity[];
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'listing':
      return <Package className="h-4 w-4" />;
    case 'user':
      return <User className="h-4 w-4" />;
    case 'report':
      return <AlertTriangle className="h-4 w-4" />;
    case 'message':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: Activity['status']) => {
  switch (status) {
    case 'active':
      return <Badge variant="default">Active</Badge>;
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    case 'resolved':
      return <Badge variant="outline">Resolved</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function RecentActivityTable({ activities }: RecentActivityTableProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg border">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {getActivityIcon(activity.type)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground truncate">
                {activity.title}
              </p>
              {getStatusBadge(activity.status)}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {activity.description}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <Avatar className="h-4 w-4">
                <AvatarImage src="https://placehold.co/20x20.png" />
                <AvatarFallback className="text-xs">
                  {activity.user.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{activity.user}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}