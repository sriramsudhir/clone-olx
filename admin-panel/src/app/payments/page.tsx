"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
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

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock payments data
  const payments = [
    {
      id: 'pay-1',
      transactionId: 'TXN-2024-001',
      amount: 18500000,
      commission: 462500, // 2.5%
      netAmount: 18037500,
      paymentMethod: 'Credit Card',
      status: 'completed',
      buyer: {
        name: 'Ahmad Hudzaifah',
        email: 'ahmad@email.com'
      },
      seller: {
        name: 'Budi Santoso',
        email: 'budi@email.com'
      },
      listing: 'Samsung Galaxy Z Fold 5 512GB',
      createdAt: '2024-07-22T14:30:00Z',
      completedAt: '2024-07-22T14:35:00Z',
      paymentGateway: 'Stripe'
    },
    {
      id: 'pay-2',
      transactionId: 'TXN-2024-002',
      amount: 260000000,
      commission: 6500000,
      netAmount: 253500000,
      paymentMethod: 'Bank Transfer',
      status: 'pending',
      buyer: {
        name: 'Charlie Wilson',
        email: 'charlie@email.com'
      },
      seller: {
        name: 'Diana Prince',
        email: 'diana@email.com'
      },
      listing: 'BMW X1 sDrive18i xLine (2014)',
      createdAt: '2024-07-22T13:15:00Z',
      paymentGateway: 'Bank Transfer'
    },
    {
      id: 'pay-3',
      transactionId: 'TXN-2024-003',
      amount: 16000000,
      commission: 400000,
      netAmount: 15600000,
      paymentMethod: 'UPI',
      status: 'failed',
      buyer: {
        name: 'Elena Rodriguez',
        email: 'elena@email.com'
      },
      seller: {
        name: 'John Doe',
        email: 'john@email.com'
      },
      listing: 'MacBook Pro M1 13-inch 2021',
      createdAt: '2024-07-22T11:45:00Z',
      failedAt: '2024-07-22T11:50:00Z',
      paymentGateway: 'Razorpay',
      failureReason: 'Insufficient funds'
    },
    {
      id: 'pay-4',
      transactionId: 'TXN-2024-004',
      amount: 2500000,
      commission: 62500,
      netAmount: 2437500,
      paymentMethod: 'Digital Wallet',
      status: 'refunded',
      buyer: {
        name: 'Sarah Johnson',
        email: 'sarah@email.com'
      },
      seller: {
        name: 'Mike Chen',
        email: 'mike@email.com'
      },
      listing: 'Gaming Chair RGB LED',
      createdAt: '2024-07-22T10:20:00Z',
      completedAt: '2024-07-22T10:25:00Z',
      refundedAt: '2024-07-22T12:00:00Z',
      paymentGateway: 'PayPal',
      refundReason: 'Item not as described'
    },
    {
      id: 'pay-5',
      transactionId: 'TXN-2024-005',
      amount: 22000000,
      commission: 550000,
      netAmount: 21450000,
      paymentMethod: 'Credit Card',
      status: 'processing',
      buyer: {
        name: 'David Kim',
        email: 'david@email.com'
      },
      seller: {
        name: 'Lisa Wang',
        email: 'lisa@email.com'
      },
      listing: 'iPhone 15 Pro Max 256GB',
      createdAt: '2024-07-22T09:10:00Z',
      paymentGateway: 'Stripe'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.listing.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return '₹' + new Intl.NumberFormat('en-IN').format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'processing':
        return <Badge variant="default"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="text-orange-600 border-orange-600"><AlertCircle className="w-3 h-3 mr-1" />Refunded</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    const colors = {
      'Credit Card': 'bg-blue-100 text-blue-800',
      'Bank Transfer': 'bg-green-100 text-green-800',
      'UPI': 'bg-purple-100 text-purple-800',
      'Digital Wallet': 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge variant="outline" className={colors[method as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {method}
      </Badge>
    );
  };

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending' || p.status === 'processing').length,
    failed: payments.filter(p => p.status === 'failed').length,
    totalRevenue: payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0),
    totalCommission: payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.commission, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Payments Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage all platform transactions and payments.
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-lg font-bold text-blue-600">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-lg font-bold text-purple-600">{formatCurrency(stats.totalCommission)}</div>
            <p className="text-xs text-muted-foreground">Commission Earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions ({filteredPayments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Listing</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.transactionId}</div>
                      <div className="text-sm text-muted-foreground">
                        via {payment.paymentGateway}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">Buyer:</span> {payment.buyer.name}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Seller:</span> {payment.seller.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate font-medium">
                      {payment.listing}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-bold">{formatCurrency(payment.amount)}</div>
                      <div className="text-xs text-muted-foreground">
                        Commission: {formatCurrency(payment.commission)}
                      </div>
                      <div className="text-xs text-green-600">
                        Net: {formatCurrency(payment.netAmount)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPaymentMethodBadge(payment.paymentMethod)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleDateString()}
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
                          <CreditCard className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Receipt
                        </DropdownMenuItem>
                        {payment.status === 'completed' && (
                          <DropdownMenuItem>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Process Refund
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Transaction History
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