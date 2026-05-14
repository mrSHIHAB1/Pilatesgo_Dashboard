import React, { useState } from 'react';
import { X, FileText, Image, Download, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { createPortal } from 'react-dom';

const ServiceViewModal = ({ service, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!service) return null;

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const closeZoom = () => {
    setSelectedImage(null);
  };

  const modal = (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2D335E]/5 text-[#2D335E]">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1B2559]">Service Request Details</h2>
              <p className="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">
                {new Date(service.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="mb-6">
            <h3 className="text-[#A3AED0] text-[11px] font-bold uppercase tracking-wider mb-2">Subject</h3>
            <p className="text-[#1B2559] font-bold text-lg leading-snug">{service.subject}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-[#A3AED0] text-[11px] font-bold uppercase tracking-wider mb-2">Message</h3>
            <div className="bg-[#F8F9FD] p-4 rounded-xl border border-slate-100">
              <p className="text-[#2D335E] text-sm leading-relaxed whitespace-pre-wrap">
                {service.message}
              </p>
            </div>
          </div>

          {service.document && service.document.length > 0 && (
            <div>
              <h3 className="text-[#A3AED0] text-[11px] font-bold uppercase tracking-wider mb-3">Attached Documents & Photos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {service.document.map((url, idx) => {
                  const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
                  return (
                    <div 
                      key={idx} 
                      className="relative group aspect-square rounded-xl overflow-hidden border border-slate-100 bg-slate-50 cursor-pointer"
                      onClick={() => isImage && handleImageClick(url)}
                    >
                      {isImage ? (
                        <>
                          <img src={url} alt={`attachment-${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ZoomIn size={24} className="text-white drop-shadow-md" />
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2">
                          <FileText size={32} className="text-slate-300" />
                          <span className="text-[10px] font-bold text-slate-400 text-center truncate w-full">Document</span>
                          <a href={url} target="_blank" rel="noreferrer" className="absolute inset-0" onClick={(e) => e.stopPropagation()} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#2D335E] hover:bg-[#1B2559] shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            Close
          </button>
        </div>
      </div>

      {/* Image Zoom Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[70] bg-black/90 flex flex-col items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeZoom}
        >
          <button className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors bg-white/10 rounded-full">
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="zoomed-view" 
            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );

  return createPortal(modal, document.body);
};

export default ServiceViewModal;
