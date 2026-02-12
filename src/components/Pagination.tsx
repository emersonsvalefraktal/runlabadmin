import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

type PaginationProps = {
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
};

export const Pagination = ({ total = 0, page = 1, pageSize = 10, onPageChange }: PaginationProps) => {
  const isControlled = onPageChange !== undefined && total !== undefined;
  const safeTotal = total ?? 0;
  const safePage = Math.max(1, page ?? 1);
  const safePageSize = Math.max(1, pageSize ?? 10);

  const maxPage = Math.max(1, Math.ceil(safeTotal / safePageSize));
  const currentPage = Math.min(safePage, maxPage);
  const startItem = safeTotal === 0 ? 0 : (currentPage - 1) * safePageSize + 1;
  const endItem = Math.min(currentPage * safePageSize, safeTotal);

  const handleFirst = () => onPageChange?.(1);
  const handlePrev = () => onPageChange?.(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange?.(Math.min(maxPage, currentPage + 1));
  const handleLast = () => onPageChange?.(maxPage);

  if (!isControlled && safeTotal === 0) return null;

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center gap-4 bg-[#1A1A1A] px-6 py-3 rounded-lg">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary hover:bg-primary/10 disabled:opacity-50"
          onClick={handleFirst}
          disabled={!isControlled || currentPage <= 1}
        >
          <ChevronsLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary hover:bg-primary/10 disabled:opacity-50"
          onClick={handlePrev}
          disabled={!isControlled || currentPage <= 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="text-sm text-muted-foreground px-4 min-w-[140px] text-center">
          {safeTotal === 0 ? "0 de 0" : `${startItem} a ${endItem} de ${safeTotal}`}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary hover:bg-primary/10 disabled:opacity-50"
          onClick={handleNext}
          disabled={!isControlled || currentPage >= maxPage}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary hover:bg-primary/10 disabled:opacity-50"
          onClick={handleLast}
          disabled={!isControlled || currentPage >= maxPage}
        >
          <ChevronsRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
