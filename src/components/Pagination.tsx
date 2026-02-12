import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

export const Pagination = () => {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center gap-4 bg-[#1A1A1A] px-6 py-3 rounded-lg">
        <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10">
          <ChevronsLeft className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <span className="text-sm text-muted-foreground px-4">1 to 100 from 16780</span>
        
        <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10">
          <ChevronRight className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10">
          <ChevronsRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
