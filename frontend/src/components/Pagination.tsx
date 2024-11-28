// Pagination.tsx
import React, { useState, useEffect } from 'react';

interface PaginationProps {
  filteredItems: any[];  
  itemsPerPage: number; 
  onPageChange: (page: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({ filteredItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);


  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="pagination d-flex align-items-center bg-white me-2">
      <button 
        onClick={handlePrevPage} 
        disabled={currentPage === 1} 
        className="btn" 
        style={{ width: "40px" }}
      >
        <i className="bi-arrow-left-short"></i>
      </button>

      <span className="page-info text-center" style={{ fontSize: "16px", fontWeight: "300" }}>
        {currentPage} of {totalPages}
      </span>

      <button 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages} 
        className="btn" 
        style={{ width: "40px" }}
      >
        <i className="bi-arrow-right-short"></i>
      </button>
    </div>
  );
};

export default Pagination;
