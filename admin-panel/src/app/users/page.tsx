"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreHorizontal, UserPlus } from "lucide-react";

// Mock data
const users = [
  {
    id: 1,
    name: "Ahmad Hudzaifah",
    email: "ahmad@example.com",
    avatar: "https://placehold.co/100x100.png",
    status: "active",
    role: "user",
    joinDate: "2024-01-15",
    listings: 12,
    purchases: 5
  },
  {
    id: 2,
    name: "Budi Santoso",
    email: "budi@example.com",
    avatar: "https://placehold.co/100x100.png",
    status: "active",
    role: "user",
    joinDate: "2024-02-20",
    listings: 8,
    purchases: 15
  },
  {
    id: 3,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    avatar: "https://placehold.co/100x100.png",
    status: "suspended",
    role: "user",
    joinDate: "2024-03-10",
    listings: 3,
    purchases: 2
  }
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Joined {user.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.listings} listings</p>
                    <p className="text-sm text-muted-foreground">{user.purchases} purchases</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}