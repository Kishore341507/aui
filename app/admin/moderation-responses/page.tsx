"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Eye, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface User {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
}

interface ModerationResponse {
    id: string;
    userId: string;
    form: string;
    data: Record<string, unknown>;
    status: 'PENDING' | 'ACCEPTED' | 'UNDER_REVIEW' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
    user?: User;
}

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
}

const statusColors = {
    PENDING: "bg-gray-800/80 text-gray-200 border-gray-600/50",
    ACCEPTED: "bg-green-900/80 text-green-200 border-green-600/50",
    UNDER_REVIEW: "bg-orange-900/80 text-orange-200 border-orange-600/50",
    REJECTED: "bg-red-900/80 text-red-200 border-red-600/50"
};

const statusIcons = {
    PENDING: Clock,
    ACCEPTED: CheckCircle,
    UNDER_REVIEW: AlertCircle,
    REJECTED: XCircle
};

export default function AdminModerationResponses() {
    const [responses, setResponses] = useState<ModerationResponse[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrev: false
    });
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedResponse, setSelectedResponse] = useState<ModerationResponse | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const fetchResponses = async (page = 1, status = statusFilter) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10'
            });
            
            if (status !== 'ALL') {
                params.append('status', status);
            }

            const response = await fetch(`/api/admin/moderation-responses?${params}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch responses');
            }

            const data = await response.json();
            setResponses(data.responses);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Error fetching responses:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to fetch responses');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (responseId: string, newStatus: string) => {
        setUpdatingStatus(true);
        try {
            const response = await fetch('/api/admin/moderation-responses', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    responseId,
                    status: newStatus
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update status');
            }

            const updatedResponse = await response.json();
            
            // Update the local state
            setResponses(prev => 
                prev.map(resp => 
                    resp.id === responseId 
                        ? { ...resp, status: newStatus as ModerationResponse['status'], updatedAt: updatedResponse.updatedAt }
                        : resp
                )
            );

            // Update selected response if it's the one being updated
            if (selectedResponse?.id === responseId) {
                setSelectedResponse(prev => 
                    prev ? { ...prev, status: newStatus as ModerationResponse['status'], updatedAt: updatedResponse.updatedAt } : null
                );
            }

            toast.success('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to update status');
        } finally {
            setUpdatingStatus(false);
        }
    };

    useEffect(() => {
        fetchResponses(1, statusFilter);
    }, [statusFilter]);

    const handlePageChange = (newPage: number) => {
        fetchResponses(newPage, statusFilter);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const Icon = statusIcons[status as keyof typeof statusIcons];
        return (
            <Badge className={`${statusColors[status as keyof typeof statusColors]} flex items-center gap-1`}>
                <Icon size={12} />
                {status.replace('_', ' ')}
            </Badge>
        );
    };

    if (loading && responses.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 min-h-screen bg-black/40">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-300">Loading moderation responses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-6 min-h-screen bg-black/40">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
                        <Users className="h-8 w-8" />
                        Moderation Responses
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Manage and review moderation applications
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[150px] bg-gray-800/50 border-gray-600/50 text-gray-200">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="ALL" className="text-gray-200 hover:bg-gray-700">All Status</SelectItem>
                            <SelectItem value="PENDING" className="text-gray-200 hover:bg-gray-700">Pending</SelectItem>
                            <SelectItem value="UNDER_REVIEW" className="text-orange-300 hover:bg-gray-700">Under Review</SelectItem>
                            <SelectItem value="ACCEPTED" className="text-green-300 hover:bg-gray-700">Accepted</SelectItem>
                            <SelectItem value="REJECTED" className="text-red-300 hover:bg-gray-700">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4">
                {responses.length === 0 ? (
                    <Card className="bg-gray-950/40 border-gray-700/30">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Users className="h-12 w-12 text-gray-500 mb-4" />
                            <h3 className="text-lg font-semibold mb-2 text-white">No responses found</h3>
                            <p className="text-gray-400 text-center">
                                {statusFilter === 'ALL' 
                                    ? 'No moderation responses have been submitted yet.'
                                    : `No responses with status "${statusFilter}" found.`
                                }
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    responses.map((response, index) => (
                        <Card key={response.id} className="bg-gray-950/40 border-gray-700/30">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <CardTitle className="text-lg text-white">
                                            Application #{index + 1}
                                        </CardTitle>
                                        <CardDescription className="text-gray-300">
                                            Submitted by {response.user?.name || response.user?.email || 'Unknown User'}
                                        </CardDescription>
                                        <div className="text-sm text-gray-400">
                                            {formatDate(response.createdAt)}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(response.status)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                                    <div className="space-y-2 flex-1">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium text-gray-200">Age:</span>
                                                <p className="text-gray-400">
                                                    {String(response.data?.age) || 'Not provided'}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-200">Experience:</span>
                                                <p className="text-gray-400">
                                                    {String(response.data?.experience) || 'Not provided'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => setSelectedResponse(response)}
                                                    className="bg-gray-800/50 border-gray-600/50 text-gray-200 hover:bg-gray-700/70 hover:border-gray-500/70"
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-700">
                                                <DialogHeader>
                                                    <DialogTitle className="text-white">Application Details</DialogTitle>
                                                    <DialogDescription className="text-gray-400">
                                                        Review the complete moderation application
                                                    </DialogDescription>
                                                </DialogHeader>
                                                {selectedResponse && (
                                                    <div className="space-y-6">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <h4 className="font-medium mb-2 text-white">Applicant Info</h4>
                                                                <div className="space-y-1 text-sm">
                                                                    <p className="text-gray-300"><span className="font-medium text-gray-200">Name:</span> {selectedResponse.user?.name || 'Not provided'}</p>
                                                                    <p className="text-gray-300"><span className="font-medium text-gray-200">Email:</span> {selectedResponse.user?.email}</p>
                                                                    <p className="text-gray-300"><span className="font-medium text-gray-200">Age:</span> {String(selectedResponse.data?.age) || 'Not provided'}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium mb-2 text-white">Application Status</h4>
                                                                <div className="space-y-2">
                                                                    {getStatusBadge(selectedResponse.status)}
                                                                    <p className="text-sm text-gray-400">
                                                                        Submitted: {formatDate(selectedResponse.createdAt)}
                                                                    </p>
                                                                    <p className="text-sm text-gray-400">
                                                                        Updated: {formatDate(selectedResponse.updatedAt)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div>
                                                            <h4 className="font-medium mb-2 text-white">Application Data</h4>
                                                            <div className="space-y-3">
                                                                {Object.entries(selectedResponse.data || {}).map(([key, value]) => (
                                                                    <div key={key} className="border-b border-gray-700 pb-2">
                                                                        <span className="font-medium capitalize text-gray-200">
                                                                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                                                                        </span>
                                                                        <p className="text-sm text-gray-400 mt-1">
                                                                            {typeof value === 'string' ? value : JSON.stringify(value)}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h4 className="font-medium mb-2 text-white">Update Status</h4>
                                                            <div className="flex gap-2">
                                                                <Select 
                                                                    value={selectedResponse.status} 
                                                                    onValueChange={(value) => updateStatus(selectedResponse.id, value)}
                                                                    disabled={updatingStatus}
                                                                >
                                                                    <SelectTrigger className="w-[200px] bg-gray-800/50 border-gray-600/50 text-gray-200">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-gray-800 border-gray-600">
                                                                        <SelectItem value="PENDING" className="text-gray-200 hover:bg-gray-700">Pending</SelectItem>
                                                                        <SelectItem value="UNDER_REVIEW" className="text-orange-300 hover:bg-gray-700">Under Review</SelectItem>
                                                                        <SelectItem value="ACCEPTED" className="text-green-300 hover:bg-gray-700">Accepted</SelectItem>
                                                                        <SelectItem value="REJECTED" className="text-red-300 hover:bg-gray-700">Rejected</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                {updatingStatus && (
                                                                    <div className="flex items-center text-sm text-gray-400">
                                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                                                                        Updating...
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                        <Select 
                                            value={response.status} 
                                            onValueChange={(value) => updateStatus(response.id, value)}
                                            disabled={updatingStatus}
                                        >
                                            <SelectTrigger className="w-[140px] bg-gray-800/50 border-gray-600/50 text-gray-200">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-600">
                                                <SelectItem value="PENDING" className="text-gray-200 hover:bg-gray-700">Pending</SelectItem>
                                                <SelectItem value="UNDER_REVIEW" className="text-orange-300 hover:bg-gray-700">Under Review</SelectItem>
                                                <SelectItem value="ACCEPTED" className="text-green-300 hover:bg-gray-700">Accepted</SelectItem>
                                                <SelectItem value="REJECTED" className="text-red-300 hover:bg-gray-700">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-700/30 pt-6">
                    <div className="text-sm text-gray-400">
                        Showing {((pagination.currentPage - 1) * 10) + 1} to{' '}
                        {Math.min(pagination.currentPage * 10, pagination.totalCount)} of{' '}
                        {pagination.totalCount} responses
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={!pagination.hasPrev || loading}
                            className="bg-gray-800/50 border-gray-600/50 text-gray-200 hover:bg-gray-700/70 hover:border-gray-500/70"
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Previous
                        </Button>
                        
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                const pageNum = i + 1;
                                const isCurrentPage = pageNum === pagination.currentPage;
                                
                                return (
                                    <Button
                                        key={pageNum}
                                        variant={isCurrentPage ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(pageNum)}
                                        disabled={loading}
                                        className={
                                            isCurrentPage 
                                                ? "w-10 bg-blue-600 hover:bg-blue-700 text-white border-blue-500" 
                                                : "w-10 bg-gray-800/50 border-gray-600/50 text-gray-200 hover:bg-gray-700/70 hover:border-gray-500/70"
                                        }
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={!pagination.hasNext || loading}
                            className="bg-gray-800/50 border-gray-600/50 text-gray-200 hover:bg-gray-700/70 hover:border-gray-500/70"
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
