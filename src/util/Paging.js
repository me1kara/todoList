import React from 'react';

const Paging = ({ rowCount, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(rowCount / pageSize); // 총 페이지 수

  const handlePageClick = (page) => {
    onPageChange(page); // 페이지 변경 시 onPageChange 호출
  };

  return (

    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item"><button type="button" className="page-link" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>Prev</button></li>
          {[...Array(totalPages)].map((_, index) => (
            <li className="page-item"><button className="page-link" key={index}
              onClick={() => handlePageClick(index + 1)}
              style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}>{index + 1}</button></li>
          ))}
          <li className="page-item"><button className="page-link" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>Next</button></li>
        </ul>
      </nav>
      {/* <button 

      >
        이전
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
        >
          {index + 1}
        </button>
      ))}
      <button 

      >
        다음
      </button> */}
    </>
  );
};

export default Paging;
