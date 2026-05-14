import React from 'react';
import { X, Calendar, User, Truck, Pencil, Trash2 } from 'lucide-react';
import notfound from "../../assets/notfound.png"

export default function ViewModal({ ticket, onClose, onEdit, onDelete }) {
  if (!ticket) return null;

  const displayData = {
    ticketId: ticket.ticket || ticket._id || "N/A",
    date: ticket.date ? new Date(ticket.date).toLocaleDateString() : "N/A",
    driver: ticket.driver?.name || "N/A",
    truck: ticket.truckNo || "N/A",
    yardage: ticket.yardage || "N/A",
    scannedAt: ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "N/A"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4 md:p-6">
      <div className="bg-[#F4F7FE] rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[95vh] md:max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0 bg-[#F4F7FE] z-10 border-b border-slate-200/50">
          <h2 className="text-base sm:text-lg font-bold text-[#1B2559] uppercase tracking-tight">
            {displayData.ticketId}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-[#A3AED0] hover:text-[#1B2559] transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 overflow-y-auto">

          {/* Image */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm">
            <img
              src={ticket.
ticketphoto || notfound}
              alt="Ticket Scan"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Info — 1 col on mobile, 3 col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white/60 p-3 rounded-xl flex items-center gap-3">
              <Calendar size={18} className="shrink-0 text-[#A3AED0]" />
              <div className="min-w-0">
                <p className="text-[10px] text-[#A3AED0]">Date</p>
                <p className="text-xs font-bold text-[#1B2559] truncate">{displayData.date}</p>
              </div>
            </div>

            <div className="bg-white/60 p-3 rounded-xl flex items-center gap-3">
              <User size={18} className="shrink-0 text-[#A3AED0]" />
              <div className="min-w-0">
                <p className="text-[10px] text-[#A3AED0]">Driver</p>
                <p className="text-xs font-bold text-[#1B2559] truncate">{displayData.driver}</p>
              </div>
            </div>

            <div className="bg-white/60 p-3 rounded-xl flex items-center gap-3">
              <Truck size={18} className="shrink-0 text-[#A3AED0]" />
              <div className="min-w-0">
                <p className="text-[10px] text-[#A3AED0]">Truck</p>
                <p className="text-xs font-bold text-[#1B2559] truncate">{displayData.truck}</p>
              </div>
            </div>
          </div>

          {/* Yardage */}
          <div>
            <p className="text-xs font-bold text-[#1B2559] mb-1">Yardage</p>
            <div className="bg-[#E9EDF7] p-3 rounded-lg text-xs text-[#707EAE]">
              {displayData.yardage}
            </div>
          </div>

          <p className="text-[10px] text-[#A3AED0]">
            Scanned on {displayData.scannedAt}
          </p>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 space-y-1">
            <button
              onClick={() => { onEdit(ticket); onClose(); }}
              className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-[#1B2559] hover:bg-white/50 rounded-lg transition-colors"
            >
              <Pencil size={16} />
              Edit Ticket
            </button>

            <button
              onClick={() => {

                onDelete(ticket._id);


              }}
              className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              Delete Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}