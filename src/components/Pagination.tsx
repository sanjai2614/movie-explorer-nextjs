type PaginationProps = {
  page: number;
  basePath?: string;

  search?: string;
  genre?: string;
  year?: string;
  rating?: string;
  sort?: string;
  language?: string;
};

export default function Pagination({
  page,
  search,
  basePath = "/movies",
  genre,
  year,
  rating,
  sort,
  language,
}: PaginationProps) {
  function buildPageUrl(pageNumber: number) {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (genre) params.set("genre", genre);
    if (year) params.set("year", year);
    if (rating) params.set("rating", rating);
    if (sort) params.set("sort", sort);
    if (language) params.set("language", language);

    params.set("page", pageNumber.toString());

    return `${basePath}?${params.toString()}`;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-2 sm:mt-10 sm:gap-3">
      {/* Previous */}
      {page > 1 && (
        <a
          href={buildPageUrl(page - 1)}
          className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-gray-700 hover:bg-gray-800 hover:text-white sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm"
        >
          ←
        </a>
      )}

      {/* Current Page */}
      <span className="rounded-lg border border-red-600 bg-red-600 px-3 py-2 text-xs font-medium text-white sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm">
        {page}
      </span>

      {/* Next */}
      <a
        href={buildPageUrl(page + 1)}
        className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-gray-700 hover:bg-gray-800 hover:text-white sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm"
      >
        →
      </a>
    </div>
  );
}