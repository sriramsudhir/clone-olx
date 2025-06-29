"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Shield,
  UserCheck,
  UserX,
  Download,
  Filter
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StaffManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  // Mock staff data
  const staffRoles = [
    {
      id: 'admin',
      name: 'Administrator',
      permissions: ['all'],
      description: 'Full access to all features and settings',
      color: 'destructive'
    },
    {
      id: 'moderator',
      name: 'Moderator',
      permissions: ['listings.moderate', 'users.view', 'reports.manage'],
      description: 'Can moderate content and manage reports',
      color: 'default'
    },
    {
      id: 'support',
      name: 'Support Agent',
      permissions: ['users.view', 'messages.view', 'reports.view'],
      description: 'Can view user information and provide support',
      color: 'secondary'
    },
    {
      id: 'analyst',
      name: 'Data Analyst',
      permissions: ['analytics.view', 'reports.view'],
      description: 'Can view analytics and generate reports',
      color: 'outline'
    }
  ];

  const staffMembers = [
    {
      id: 'staff-1',
      name: 'John Admin',
      email: 'john@tradezone.com',
      role: 'admin',
      avatar: 'https://placehold.co/40x40.png',
      status: 'active',
      lastLogin: '2024-07-22T10:00:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      department: 'Management'
    },
    {
      id: 'staff-2',
      name: 'Sarah Moderator',
      email: 'sarah@tradezone.com',
      role: 'moderator',
      avatar: 'https://placehold.co/40x40.png',
      status: 'active',
      lastLogin: '2024-07-22T09:30:00Z',
      createdAt: '2024-02-01T00:00:00Z',
      department: 'Content'
    },
    {
      id: 'staff-3',
      name: 'Mike Support',
      email: 'mike@tradezone.com',
      role: 'support',
      avatar: 'https://placehold.co/40x40.png',
      status: 'active',
      lastLogin: '2024-07-22T08:45:00Z',
      createdAt: '2024-03-01T00:00:00Z',
      department: 'Customer Service'
    },
    {
      id: 'staff-4',
      name: 'Lisa Analyst',
      email: 'lisa@tradezone.com',
      role: 'analyst',
      avatar: 'https://placehold.co/40x40.png',
      status: 'active',
      lastLogin: '2024-07-21T16:20:00Z',
      createdAt: '2024-04-01T00:00:00Z',
      department: 'Analytics'
    },
    {
      id: 'staff-5',
      name: 'Tom Moderator',
      email: 'tom@tradezone.com',
      role: 'moderator',
      avatar: 'https://placehold.co/40x40.png',
      status: 'inactive',
      lastLogin: '2024-07-15T14:30:00Z',
      createdAt: '2024-05-01T00:00:00Z',
      department: 'Content'
    }
  ];

  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (roleId: string) => {
    const role = staffRoles.find(r => r.id === roleId);
    if (!role) return <Badge variant="secondary">Unknown</Badge>;
    
    return <Badge variant={role.color as any}>{role.name}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? 
      <Badge variant="default"><UserCheck className="w-3 h-3 mr-1" />Active</Badge> : 
      <Badge variant="secondary"><UserX className="w-3 h-3 mr-1" />Inactive</Badge>;
  };

  const stats = {
    total: staffMembers.length,
    active: staffMembers.filter(s => s.status === 'active').length,
    admins: staffMembers.filter(s => s.role === 'admin').length,
    moderators: staffMembers.filter(s => s.role === 'moderator').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage staff members, roles, and permissions.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Active Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
            <p className="text-xs text-muted-foreground">Administrators</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.moderators}</div>
            <p className="text-xs text-muted-foreground">Moderators</p>
          </CardContent>
        </Card>
      </div>

      {/* Roles Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Staff Roles & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {staffRoles.map((role) => (
              <div key={role.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{role.name}</h4>
                  <Badge variant={role.color as any}>{role.id}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                    {role.permissions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{role.permissions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {staffRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members ({filteredStaff.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(member.role)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.department}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(member.status)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(member.lastLogin).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Staff
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          {member.status === 'active' ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Staff
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}