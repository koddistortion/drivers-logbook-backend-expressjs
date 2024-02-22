import { Request, Response } from "express";

import env from "../env.js";
import queryString from "query-string";

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
  res: Response,
  pagination: PaginationDetails,
): void => {
  const links = [];

  links.push(
    generateLink(req, pagination.firstPage, pagination.itemsPerPage, "first"),
  );
  if (
    pagination.previousPage > pagination.firstPage &&
    pagination.previousPage != pagination.currentPage
  ) {
    links.push(
      generateLink(
        req,
        pagination.previousPage,
        pagination.itemsPerPage,
        "prev",
      ),
    );
  }
  links.push(
    generateLink(req, pagination.currentPage, pagination.itemsPerPage, "self"),
  );
  if (
    pagination.nextPage < pagination.lastPage &&
    pagination.nextPage != pagination.currentPage
  ) {
    links.push(
      generateLink(req, pagination.nextPage, pagination.itemsPerPage, "next"),
    );
  }
  links.push(
    generateLink(req, pagination.lastPage, pagination.itemsPerPage, "last"),
  );
  res.setHeader("Link", links.join(","));
};

const generateLink = (
  req: Request,
  pageNumber: number,
  perPage: number,
  rel: string,
): string => {
  const protocol = req.protocol;
  const host = req.hostname;
  const queryIndex = req.originalUrl.indexOf("?");
  const path =
    queryIndex != -1
      ? req.originalUrl.substring(0, queryIndex)
      : req.originalUrl;

  const port = env.PORT;
  const query = { ...req.query };
  query["page"] = `${pageNumber}`;
  query["perPage"] = `${perPage}`;
  const newQuery = queryString.stringify(query);

  if (port != 443 && port != 80) {
    return `<${protocol}://${host}:${port}${path}?${newQuery}>; rel="${rel}"`;
  }
  return `<${protocol}://${host}${path}?${newQuery}>; rel=${rel}`;
};

const extractPaginationDetails = (
  req: Request,
  totalItemsCount: number,
  itemsPerPage: number = 25,
): PaginationDetails => {
  const _page = req.query["page"];
  const _perPage = req.query["perPage"];
  const currentPage: number = _page ? parseInt(<string>_page, 10) : 1;
  const perPage: number = _perPage
    ? parseInt(<string>_perPage, 10)
    : itemsPerPage;
  const lastPage: number = Math.ceil(totalItemsCount / perPage);
  const itemsToSkip = (currentPage - 1) * perPage;
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
  extract: extractPaginationDetails,
  addHeaderLinks: addPaginationLinksToHeader,
};
