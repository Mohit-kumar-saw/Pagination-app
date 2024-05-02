import axios from "axios";
import React, { useEffect, useState } from "react";

const Pages = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          "https://picsum.photos/v2/list?page=2&limit=100"
        );
        setData(response.data);
        console.log(response.data);
        setTotalPage(Math.ceil(response.data.length / 10));
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };

    loadData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextClick = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const preDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPage;

  const itemPerPage = 10;
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const itemToDisplay = data.slice(startIndex, endIndex);

  return (
    <div>
    <div className="img-container">
     
      {itemToDisplay.length > 0 ? (
        itemToDisplay.map((item, index) => (
          <div className="img" key={index} >
            <img src={item.download_url} alt="" height="300px" width="300px" />
            
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

     
      
    </div>
    <div className="button">
        <button onClick={handlePrevClick}>&lt;&lt;</button>
        <span>{currentPage} of {totalPage}</span>
        <button onClick={handleNextClick}>&gt;&gt;</button>
      </div>
    </div>
  );
};

export default Pages;
