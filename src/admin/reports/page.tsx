"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Eye, 
  CheckCircle, 
  XCircle, 
  MoreHorizontal,
  Clock,
  User,
  Package
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminReportsPage() {
  // Mock reports data
  const reports = [
    {
      id: 'report-1',
      type: 'listing',
      reason: 'Inappropriate Content',
      description: 'This listing contains inappropriate images',
      reportedItem: 'Samsung Galaxy Z Fold 5 512GB',
      reportedBy: 'Anonymous User',
      reportedAt: '2024-07-22T10:30:00Z',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 'report-2',
      type: 'user',
      reason: 'Spam',
      description: 'User is sending spam messages to multiple users',
      reportedItem: 'Budi Santoso',
      reportedBy: 'Ahmad Hudzaifah',
      reportedAt: '2024-07-22T09:15:00Z',
      status: 'investigating',
      priority: 'medium'
    },
    {
      id: 'report-3',
      type: 'listing',
      reason: 'Fake Product',
      description: 'This appears to be a counterfeit product',
      reportedItem: 'iPhone 15 Pro Max',
      reportedBy: 'Charlie',
      reportedAt: '2024-07-21T16:45:00Z',
      status: 'resolved',
      priority: 'high'
    },
    {
      id: 'report-4',
      type: 'user',
      reason: 'Harassment',
      description: 'User is harassing other members',
      reportedItem: 'John Doe',
      reportedBy: 'Jane Smith',
      reportedAt: '2024-07-21T14:20:00Z',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 'report-5',
      type: 'listing',
      reason: 'Price Manipulation',
      description: 'Artificially inflated prices',
      reportedItem: 'BMW X1 sDrive18i',
      reportedBy: 'Anonymous User',
      reportedAt: '2024-07-21T11:30:00Z',
      status: 'dismissed',
      priority: 'low'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'investigating':
        return <Badge variant="default"><Eye className="w-3 h-3 mr-1" />Investigating</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>;
      case 'dismissed':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />Dismissed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'listing':
        return <Package className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const investigatingReports = reports.filter(r => r.status === 'investigating').length;
  const resolvedReports = reports.filter(r => r.status === 'resolved').length;
  const highPriorityReports = reports.filter(r => r.priority === 'high').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Reports Management</h1>
          <p className="text-muted-foreground">
            Review and manage user reports and violations.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">{pendingReports}</div>
            <p className="text-xs text-muted-foreground">Pending Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{investigatingReports}</div>
            <p className="text-xs text-muted-foreground">Under Investigation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{resolvedReports}</div>
            <p className="text-xs text-muted-foreground">Resolved Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{highPriorityReports}</div>
            <p className="text-xs text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reports ({reports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Reported Item</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <div className="font-medium">{report.reason}</div>
                        <div className="text-sm text-muted-foreground max-w-xs truncate">
                          {report.description}
                        </div>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {report.type}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{report.reportedItem}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="https://placehold.co/24x24.png" />
                        <AvatarFallback className="text-xs">
                          {report.reportedBy.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{report.reportedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(report.priority)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(report.status)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(report.reportedAt).toLocaleDateString()}
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
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Start Investigation
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-green-600">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          Dismiss Report
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