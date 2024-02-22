import { Request, Response } from 'express';
import url from 'url';

import env from '../env.js';
import queryString from 'query-string';

export type PaginationDetails = {
  totalItemsCount: number;
  itemsPerPage: number;
  itemsToSkip: number;
  firstPage: number;
  previousPage: number;
  currentPage: number;
  nextPage: number;
  lastPage: number;
};

const addPaginationLinksToHeader = (
  req: Request,
  _res: Response,
  _pagination: PaginationDetails,
): void => {
  const fullUrl = getFullUrl(req);
  const blubb = queryString.parse(req.originalUrl);
  console.log(url.format(blubb));
  console.log(fullUrl);
};

const getFullUrl = (req: Request): string => {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = env.PORT;

  return `${protocol}://${host}:${port}${url}`;
};

const extractPaginationDetails = (
  req: Request,
  totalItemsCount: number,
  itemsPerPage: number = 25,
): PaginationDetails => {
  const _page = req.query['page'];
  const _perPage = req.query['perPage'];
  const currentPage: number = _page ? parseInt(<string>_page, 10) : 1;
  const perPage: number = _perPage
    ? parseInt(<string>_perPage, 10)
    : itemsPerPage;
  const lastPage: number = Math.ceil(totalItemsCount / itemsPerPage);
  const itemsToSkip = currentPage * itemsPerPage;
  return {
    firstPage: 1,
    totalItemsCount: totalItemsCount,
    itemsPerPage: perPage,
    itemsToSkip: itemsToSkip,
    previousPage: currentPage == 1 ? currentPage : currentPage - 1,
    currentPage: currentPage,
    nextPage: currentPage < lastPage ? currentPage + 1 : lastPage,
    lastPage: lastPage,
  };
};

export const Pagination = {
  extractPaginationDetails,
  addHeaderLinks: addPaginationLinksToHeader,
};
