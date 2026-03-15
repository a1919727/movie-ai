import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type MoviePaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function MoviePagination({
  currentPage,
  totalPages,
}: MoviePaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? `/movies?page=${prevPage}` : "#"}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`/movies?page=${currentPage}`} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? `/movies?page=${nextPage}` : "#"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
