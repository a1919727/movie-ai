import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ModerationPaginationProps = {
  currentPage: number;
  totalPages: number;
  tabHref: (page: number) => string;
};

export function ModerationPagination({
  currentPage,
  totalPages,
  tabHref,
}: ModerationPaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? tabHref(prevPage) : "#"}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={tabHref(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? tabHref(nextPage) : "#"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
