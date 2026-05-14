import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 0) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-6 w-full">
            <div className="flex flex-col items-center gap-4 w-full max-w-full">
                <div className="w-full overflow-x-auto no-scrollbar pb-2 px-4 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px w-max" aria-label="Pagination">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-3 py-2 rounded-l-xl border border-slate-200 bg-white text-sm font-medium text-[#A3AED0] hover:bg-slate-50 disabled:opacity-50 transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-bold transition-colors ${currentPage === page
                                    ? 'z-10 bg-[#2D335E] border-[#2D335E] text-white'
                                    : 'bg-white border-slate-200 text-[#1B2559] hover:bg-slate-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-3 py-2 rounded-r-xl border border-slate-200 bg-white text-sm font-medium text-[#A3AED0] hover:bg-slate-50 disabled:opacity-50 transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </nav>
                </div>
                <p className="text-[11px] text-[#A3AED0] font-bold uppercase tracking-[0.2em]">
                    Page <span className="text-[#1B2559]">{currentPage}</span> of <span className="text-[#1B2559]">{totalPages}</span>
                </p>
            </div>
        </div>
    );
};

export default Pagination;
