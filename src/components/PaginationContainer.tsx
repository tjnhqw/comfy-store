import { useLoaderData, useLocation } from 'react-router-dom';
import { constructPrevOrNextUrl, constructUrl, ProductsResponseWithParams } from '~/utils';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';

function PaginationContainer() {
  const { meta } = useLoaderData() as ProductsResponseWithParams;
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  if (pageCount < 2) return null;

  const renderPagination = pages.map((pageNumber) => {
    const isActive = pageNumber === page;
    const url = constructUrl({ pageNumber, search, pathname });


    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });

  return (
    <Pagination className='mt-16'>
      <PaginationContent>
        <PaginationItem className={`${page <= 1 ? 'cursor-not-allowed' : undefined}`}>
          <PaginationPrevious to={`${page <= 1 ? '' : prevUrl}`}
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : undefined}
            className={page <= 1 ? "pointer-events-none cursor-not-allowed opacity-50" : undefined}
          />
        </PaginationItem>
        {renderPagination}
        <PaginationItem className={`${page >= pageCount ? 'cursor-not-allowed' : undefined}`}>
          <PaginationNext to={`${page >= pageCount ? '' : nextUrl}`}
            aria-disabled={page >= pageCount}
            tabIndex={page >= pageCount ? -1 : undefined}
            className={page >= pageCount ? "pointer-events-none opacity-50" : undefined} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationContainer