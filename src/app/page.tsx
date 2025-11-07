"use client";

import { useEffect, useState } from "react";
import { AdvocateTable } from "./components/AdvocateTable";
import { Loading } from "./components/Loading";
import type { Advocate } from "../db/schema";
import { Search } from "./components/Search";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);

    const queryParams = new URLSearchParams({
      search: search,
      page: page.toString(),
    });

    fetch(`/api/advocates?${queryParams.toString()}`)
      .then((response) => response.json())
      .then((json: { data: Advocate[]; hasMore: boolean }) => {
        setAdvocates(json.data);
        setLoading(false);
        setHasMore(json.hasMore);
      });
  }, [page, search]);

  return (
    <main className="px-5 py-12 bg-gray-200">
      <h1 className="text-3xl font-bold">Solace Advocates</h1>
      <Search
        onSubmit={(term) => {
          setSearch(term);
          setPage(1);
        }}
        onReset={() => {
          setSearch("");
          setPage(1);
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AdvocateTable advocates={advocates} />
          {hasMore && (
            <button
              disabled={isLoading}
              className="bg-[#1d4339] text-white text-sm p-2 pointer"
              onClick={() => setPage((page) => page + 1)}
            >
              Next Page
            </button>
          )}
        </>
      )}
    </main>
  );
}
