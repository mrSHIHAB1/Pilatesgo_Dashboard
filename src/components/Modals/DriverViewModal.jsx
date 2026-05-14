import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Calendar, Ticket, TrendingUp, Download, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxioSecure';
import { toast } from 'react-toastify';

export default function DriverViewModal({ driver, onClose }) {
    const [recentTickets, setRecentTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exportLoading, setExportLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleExport = async () => {
        if (!driver?._id) return;
        setExportLoading(true);
        try {
            const response = await axiosSecure.get(`/dashboard/export-driver-data/${driver._id}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `driver_data_${driver.name.replace(/\s+/g, '_').toLowerCase()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success('Driver data exported successfully');
        } catch (error) {
         
            toast.error('Failed to export driver data');
        } finally {
            setExportLoading(false);
        }
    };

    if (!driver) return null;

    useEffect(() => {
        const fetchRecentTickets = async () => {
            try {
                const { data: response } = await axiosSecure.get('/truck/admin/all-trucks', {
                    params: {
                        driverId: driver._id,
                        limit: 3,
                        page: 1
                    }
                });
                setRecentTickets(response.data || []);
            } catch (error) {
                
            } finally {
                setLoading(false);
            }
        };

        fetchRecentTickets();
    }, [driver._id, axiosSecure]);

    // Generate initials for the avatar
    const initials = driver.name
        ? driver.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '??';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-6">
            {/* Modal Container */}
            <div className="bg-[#F8F9FD] w-full max-w-md max-h-[95vh] md:max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-4 shrink-0 bg-[#F8F9FD] z-10 border-b border-slate-200/50">
                    <h2 className="text-[#2D335E] font-bold text-lg">Driver Details</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 pt-4 space-y-6 overflow-y-auto">
                    {/* Profile Section */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#2D335E] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                            {initials}
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-[#2D335E] font-bold text-lg">{driver.name}</h3>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${driver.isActive === 'ACTIVE'
                                ? 'bg-emerald-50 text-emerald-500 border-emerald-100'
                                : 'bg-red-50 text-red-500 border-red-100'
                                }`}>
                                <CheckCircle2 size={12} /> {driver.isActive === 'ACTIVE' ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-600">
                            <Mail size={18} className="text-slate-400" />
                            <span className="text-sm font-medium">{driver.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                            <Phone size={18} className="text-slate-400" />
                            <span className="text-sm font-medium">{driver.phone || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                            <Calendar size={18} className="text-slate-400" />
                            <span className="text-sm font-medium">Joined: {driver.joinedDate || "N/A"}</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#E9EDF7] p-4 rounded-xl">
                            <div className="flex items-center gap-2 text-[#A3AED0] mb-1">
                                <Ticket size={16} />
                                <span className="text-[11px] font-bold uppercase tracking-wider">Total Ticket</span>
                            </div>
                            <p className="text-[#2D335E] font-bold text-xl">{driver.totalTickets || "0"}</p>
                        </div>
                        <div className="bg-[#E9EDF7] p-4 rounded-xl">
                            <div className="flex items-center gap-2 text-[#A3AED0] mb-1">
                                <TrendingUp size={16} />
                                <span className="text-[11px] font-bold uppercase tracking-wider">Total Yardage</span>
                            </div>
                            <p className="text-[#2D335E] font-bold text-xl">
                                {driver.totalYardage || "0"} <span className="text-sm font-medium">yd³</span>
                            </p>
                        </div>
                    </div>

                    {/* Recent Tickets Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[#2D335E] font-bold text-base">Recent Tickets</h4>
                            <button
                                onClick={() => {
                                    onClose();
                                    navigate('/dashboard/tickets');
                                }}
                                className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
                            >
                                View All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="animate-spin text-[#2D335E]" size={24} />
                                </div>
                            ) : recentTickets.length > 0 ? (
                                recentTickets.map((ticket) => (
                                    <div
                                        key={ticket._id}
                                        className="bg-[#E9EDF7] p-4 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-[#dfe4f1] transition-colors"
                                    >
                                        <div>
                                            <h5 className="text-[#2D335E] font-bold text-sm">{ticket.ticket || ticket._id.slice(-6).toUpperCase()}</h5>
                                            <p className="text-[#A3AED0] text-[12px] font-medium">{new Date(ticket.date).toLocaleDateString()}</p>
                                        </div>
                                        <p className="text-[#2D335E] font-bold text-lg">
                                            {ticket.yardage} <span className="text-xs font-medium">yd³</span>
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-6 text-sm text-[#A3AED0] font-medium italic bg-[#F0F2F8] rounded-xl border border-dashed border-slate-200">
                                    No recent tickets found
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer Action */}
                    <button
                        onClick={handleExport}
                        disabled={exportLoading}
                        className={`w-full flex items-center justify-center gap-2 py-3 border-2 border-[#2D335E] text-[#2D335E] rounded-xl text-sm font-bold transition-all group ${exportLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#2D335E] hover:text-white'
                            }`}
                    >
                        {exportLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Download size={18} className="group-hover:scale-110 transition-transform" />
                        )}
                        {exportLoading ? 'Exporting...' : 'Export Driver Data'}
                    </button>
                </div>
            </div>
        </div>
    );
}

