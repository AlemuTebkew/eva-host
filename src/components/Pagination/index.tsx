import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4 mx-auto">
      <Pagination>
        <PaginationContent className="gap-1 flex-wrap justify-center">
          <PaginationItem>
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
          </PaginationItem>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-gray-400 text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(Number(page))}
                className={`px-3 py-1 text-sm rounded-full ${
                  page === currentPage
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {page}
              </button>
            )
          )}

          <PaginationItem>
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <p className="text-sm text-gray-600">
        Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </p>
    </div>
  );
};

export default PaginationControls;
