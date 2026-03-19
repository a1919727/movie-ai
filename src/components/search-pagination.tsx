import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type SearchPaginationProps = {
  currentPage: number;
  totalPages: number;
  query: string;
};

export function SearchPagination({
  currentPage,
  totalPages,
  query,
}: SearchPaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? `/search?q=${query}&page=${prevPage}` : "#"}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`/search?q=${query}&page=${currentPage}`}
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? `/search?q=${query}&page=${nextPage}`
                : "#"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
