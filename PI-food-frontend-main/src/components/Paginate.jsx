import React, { useState, useEffect } from "react";
import "./css/Paginate.css";

export default function Paginate({  allRecipes, paginado }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageNumbers.length) {
      setCurrentPage(newPage);
      paginado(newPage);
    }
  };

  useEffect(() => {
    // Cuando cambia la página actual, realiza el scroll al principio de la página.
    window.scrollTo({ top: 1, behavior: "smooth" });
  }, [currentPage]);

  const pageNumbers = Array.from({ length: Math.ceil(allRecipes / 9) }, (_, i) => i + 1);

  return (
    <nav className="paginado">
      <ul>
        <li>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {"<<"}
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              className={currentPage === number ? "active" : ""}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= pageNumbers.length}>
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
