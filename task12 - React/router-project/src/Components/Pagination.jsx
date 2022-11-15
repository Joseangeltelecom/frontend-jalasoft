import styled from "@emotion/styled";
import MoreIcon from ".././assets/more_horiz_black_24dp.svg";

const Pagination = ({ currentPage, pageCount, setCurrentPage }) => {
  const getPageRange = (currentPage, pageCount) => {
    if (pageCount < 4) {
      return [];
    }
    let pageRange = [1, 2, 3]; // Buttons range.
    if (currentPage > 1 && currentPage !== pageCount) {
      pageRange.length = 0;
      pageRange.push(currentPage - 1);
      pageRange.push(currentPage);
      pageRange.push(currentPage + 1);
    } else if (currentPage === pageCount) {
      pageRange.length = 0;
      pageRange.push(currentPage - 2);
      pageRange.push(currentPage - 1);
      pageRange.push(currentPage);
    }
    return pageRange;
  };

  return (
    <PaginationContainer>
      <button
        className="pageCard"
        onClick={() => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage <= 1}
      >{`<`}</button>
      {/*  */}
      {currentPage >= pageCount - 2 && pageCount > 3 && (
        <>
          <button
            className={currentPage === 1 ? `pageCard active` : `pageCard`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <MorePaginationIconContainer
            style={{
              height: "36px",
              width: "36px",
            }}
          >
            <Icon
              style={{ width: "20px", height: "auto" }}
              alt="more"
              src={MoreIcon}
            />
          </MorePaginationIconContainer>
        </>
      )}
      {getPageRange(currentPage, pageCount).map((page) => (
        <button
          key={page}
          className={page === currentPage ? `pageCard active` : `pageCard`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      {currentPage < pageCount - 2 && pageCount > 3 && (
        <>
          <MorePaginationIconContainer
            style={{
              height: "36px",
              width: "36px",
            }}
          >
            <Icon
              style={{ width: "20px", height: "auto" }}
              alt="more"
              src={MoreIcon}
            />
          </MorePaginationIconContainer>
          <button
            className={
              pageCount === currentPage ? `pageCard active` : `pageCard`
            }
            onClick={() => setCurrentPage(pageCount)}
          >
            {pageCount}
          </button>
        </>
      )}
      {/*  */}
      <button
        className="pageCard"
        onClick={() => {
          if (currentPage < pageCount) setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage === pageCount}
      >{`>`}</button>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .pageCard {
    margin-top: 100px;
    height: 36px;
    padding: 0 15px;
    background: transparent;
    border: 1px solid #b7bcce;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 0 6px;
    color: #b9bdcf;
    cursor: pointer;

    &:not([disabled]):hover {
      border: 1px solid #1e86ff;
      color: #1e86ff;
    }
  }

  .pageCard.active {
    background: #1e86ff;
    border: 1px solid #1e86ff;
    color: #fff;
  }
`;

const MorePaginationIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 36px;
  width: 36px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  padding: 0 0.5rem;
`;
