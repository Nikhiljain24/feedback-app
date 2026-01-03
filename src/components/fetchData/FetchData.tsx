import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState<any>([]);
  const postsPerPage = 10;
  const numberOfPages = data.length / postsPerPage;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * postsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
  const paginatedData = data.slice(indexOfFirstProduct,indexOfLastProduct);
  console.log("numberOfPages", numberOfPages, paginatedData)
  const url = "https://dummyjson.com/products";

  const fetchAPI = async (fetchUrl: string) => {
    try {
      const res = await fetch(fetchUrl);
      const { products } = await res.json();
      setData(products);
      // console.log("data ==>", res.json());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAPI(url);
    // fetch(url).then((res) => res.json()).then((data) => setData(data.products))
    return () => {};
  }, []);
  console.log(data);
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the new current page
  };
  return (
    <div style={{width : '1000px', marginLeft: '30px'}}>
      <h2>Product List</h2>
      {/* Use Ant Design Row and Col to display cards in a grid */}
      <Row gutter={[16, 16]}>
        {paginatedData.map((dobj: any) => (
          <Col span={8} key={dobj.id}>
            <Card
              title={dobj.title}
              bordered={true}
              cover={<img alt={dobj.title} src={dobj.image} />}
            >
              <p><strong>Category:</strong> {dobj.category}</p>
              <p><strong>Description:</strong> {dobj.description}</p>
              
            </Card>
           
          </Col>
        ))}
         {/* Pagination Buttons */}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        {/* Loop through the total pages and create buttons */}
       
      </div>
      
      </Row>
      {Array.from({ length: numberOfPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{ margin: '0 5px' }}
            type={currentPage === index + 1 ? 'primary' : 'default'}
          >
            {index + 1}
          </Button>
        ))}
    </div>
  );
};

export default FetchData;
