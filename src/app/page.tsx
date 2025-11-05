"use client";

import { useEffect, useState, useRef } from "react";
import { Search } from "./components/Search";
import { AdvocateTable } from "./components/AdvocateTable";
import { type Advocate } from "../db/schema";

const TABLE_HEADERS: { key: keyof Advocate, label: string }[] = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "city", label: "City" },
  { key: "degree", label: "Degree" },
  { key: "specialties", label: "Specialties" },
  { key: "yearsOfExperience", label: "Years of Experience" },
  { key: "phoneNumber", label: "Phone Number" },
];

const normalizeSpecialties = (specialties: Advocate["specialties"]): string =>
  Array.isArray(specialties) ? specialties.join(" ").toLowerCase() : String(specialties || "").toLowerCase();

const matchesSearch = (advocate: Advocate, searchTerm: string): boolean => {
  const term = searchTerm.toLowerCase();
  const specialties = normalizeSpecialties(advocate.specialties);
  const fields = [
    advocate.firstName,
    advocate.lastName,
    advocate.city,
    advocate.degree,
    specialties
  ];
  return fields.some(field => field.toLowerCase().includes(term));
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAdvocates = async () => {
      const response = await fetch("/api/advocates");
      const { data } = await response.json();
      setAdvocates(data);
      setFilteredAdvocates(data);
    };
    fetchAdvocates();
  }, []);

  const handleSearch = () => {
    const searchTerm = searchInputRef.current?.value || "";
    const filtered = searchTerm 
      ? advocates.filter(advocate => matchesSearch(advocate, searchTerm))
      : advocates;
    setFilteredAdvocates(filtered);
  };

  const handleReset = () => {
    if (searchInputRef.current) searchInputRef.current.value = "";
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="p-4 grid grid-cols-1 gap-4">
      <h1 className="text-2xl font-bold">Solace Advocates</h1>
      <Search ref={searchInputRef} onClickReset={handleReset} onClickSubmit={handleSearch} />
      <AdvocateTable headers={TABLE_HEADERS} data={filteredAdvocates} />
    </main>
  );
}
