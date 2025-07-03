"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  MessageSquare, 
  Eye, 
  MoreHorizontal,
  Clock,
  User,
  Download,
  Filter,
  Reply,
  Archive
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

export default function AdminMessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock messages data
  const messages = [
    {
      id: 'msg-1',
      subject: 'Question about Samsung Galaxy Z Fold 5',
      sender: {
        name: 'Ahmad Hudzaifah',
        email: 'ahmad@email.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      recipient: {
        name: 'Budi Santoso',
        email: 'budi@email.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      preview: 'Hi, is this phone still available? I\'m very interested...',
      listingTitle: 'Samsung Galaxy Z Fold 5 512GB',
      timestamp: '2024-07-22T14:30:00Z',
      status: 'unread',
      priority: 'normal'
    },
    {
      id: 'msg-2',
      subject: 'BMW X1 Inquiry',
      sender: {
        name: 'Charlie Wilson',
        email: 'charlie@email.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      recipient: {
        name: 'Diana Prince',
        email: 'diana@email.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      preview: 'Can we schedule a test drive for this weekend?',
      listingTitle: 'BMW X1 sDrive18i xLine (2014)',
      timestamp: '2024-07-22T13:15:00Z',
      status: 'read',
      priority: 'high'
    },
    {
      id: 'msg-3',
      subject: 'Report: Inappropriate Content',
      sender: {
        name: 'System',
        email: 'system@tradezone.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      recipient: {
        name: 'Admin Team',
        email: 'admin@tradezone.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      preview: 'A user has reported inappropriate content in listing...',
      listingTitle: 'MacBook Pro M1 13-inch 2021',
      timestamp: '2024-07-22T11:45:00Z',
      status: 'flagged',
      priority: 'urgent'
    },
    {
      id: 'msg-4',
      subject: 'Payment Issue Support',
      sender: {
        name: 'Elena Rodriguez',
        email: 'elena@email.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      recipient: {
        name: 'Support Team',
        email: 'support@tradezone.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      preview: 'I\'m having trouble with the payment process...',
      listingTitle: 'Gaming Chair RGB LED',
      timestamp: '2024-07-22T10:20:00Z',
      status: 'replied',
      priority: 'normal'
    },
    {
      id: 'msg-5',
      subject: 'Listing Verification Request',
      sender: {
        name: 'John Doe',
        email: 'john@email.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      recipient: {
        name: 'Verification Team',
        email: 'verify@tradezone.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      preview: 'Please verify my listing for the iPhone 15 Pro Max...',
      listingTitle: 'iPhone 15 Pro Max 256GB',
      timestamp: '2024-07-22T09:10:00Z',
      status: 'archived',
      priority: 'low'
    }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || message.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge variant="default">Unread</Badge>;
      case 'read':
        return <Badge variant="secondary">Read</Badge>;
      case 'replied':
        return <Badge variant="outline" className="text-green-600 border-green-600">Replied</Badge>;
      case 'flagged':
        return <Badge variant="destructive">Flagged</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'high':
        return <Badge variant="default">High</Badge>;
      case 'normal':
        return <Badge variant="secondary">Normal</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'unread').length,
    flagged: messages.filter(m => m.status === 'flagged').length,
    urgent: messages.filter(m => m.priority === 'urgent').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Messages Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage all platform communications.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
            <p className="text-xs text-muted-foreground">Unread Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{stats.flagged}</div>
            <p className="text-xs text-muted-foreground">Flagged Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">{stats.urgent}</div>
            <p className="text-xs text-muted-foreground">Urgent Priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Conversation</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Listing</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{message.subject}</div>
                      <div className="text-sm text-muted-foreground max-w-xs truncate">
                        {message.preview}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback className="text-xs">
                            {message.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{message.sender.name}</div>
                          <div className="text-xs text-muted-foreground">Sender</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={message.recipient.avatar} />
                          <AvatarFallback className="text-xs">
                            {message.recipient.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{message.recipient.name}</div>
                          <div className="text-xs text-muted-foreground">Recipient</div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium max-w-xs truncate">
                      {message.listingTitle}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(message.priority)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(message.status)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(message.timestamp).toLocaleDateString()}
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
                          View Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Reply className="mr-2 h-4 w-4" />
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Flag as Inappropriate
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