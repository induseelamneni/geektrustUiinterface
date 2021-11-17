import './index.css'
import {BiFirstPage, BiLastPage} from 'react-icons/bi'
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'

const Pagination = props => {
  const {
    totalPagesCount,
    changePageNumber,
    activePageNumber,
    deleteMultipleUsers,
  } = props

  const pageNumber = []
  for (
    let numberOfPages = 1;
    numberOfPages <= totalPagesCount;
    numberOfPages += 1
  ) {
    pageNumber.push(numberOfPages)
  }

  const decreaseActivePageNumber = () => {
    if (activePageNumber > 1) changePageNumber(activePageNumber - 1)
  }

  const increaseActivePageNumber = () => {
    if (activePageNumber < totalPagesCount)
      changePageNumber(activePageNumber + 1)
  }

  const onClickDeleteMultipleUsers = () => {
    deleteMultipleUsers()
  }

  const goToLastPage = () => {
    changePageNumber(totalPagesCount)
  }

  const goToFirstPage = () => {
    changePageNumber(1)
  }

  return (
    <footer className="pagination-bottom">
      <div className="nav-content">
        <button
          type="button"
          className="delete-button1"
          onClick={onClickDeleteMultipleUsers}
        >
          Delete Selected
        </button>
        <ul className="pagination-btn-container">
          <li>
            <button
              type="button"
              onClick={goToFirstPage}
              className="pagination-btn"
            >
              <BiFirstPage className="icon" />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={decreaseActivePageNumber}
              className="pagination-btn"
            >
              <GrFormPrevious className="icon" />
            </button>
          </li>
          <li className="number-of-pages">
            {pageNumber.map(num => (
              <li key={num}>
                <button
                  type="button"
                  className={
                    num === activePageNumber ? 'pag-no active' : 'pag-no'
                  }
                >
                  {num}
                </button>
              </li>
            ))}
          </li>
          <li>
            <button
              type="button"
              onClick={increaseActivePageNumber}
              className="pagination-btn"
            >
              <GrFormNext className="icon" />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={goToLastPage}
              className="pagination-btn"
            >
              <BiLastPage className="icon" />
            </button>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Pagination
