import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState<any>([]);
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
  return (
    <div style={{width : '1000px', marginLeft: '30px'}}>
      <h2>Product List</h2>
      {/* Use Ant Design Row and Col to display cards in a grid */}
      <Row gutter={[16, 16]}>
        {data.map((dobj: any) => (
          <Col span={8} key={dobj.id}>
            <Card
              title={dobj.title}
              bordered={true}
              cover={<img alt={dobj.title} src={dobj.images} />}
            >
              <p><strong>Category:</strong> {dobj.category}</p>
              <p><strong>Description:</strong> {dobj.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FetchData;
