import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/app/productDetails/${productId}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;
  const imageUrl = `http://localhost:8080/uploads/${product.image.split('/').pop()}`;

  return (
    <div className="container mt-5">
      <h2 className="text-center">{product.name}</h2>
      <div className="card" style={{ width: '18rem', margin: 'auto' }}>
        <img src={imageUrl} alt={product.name} className="card-img-top" />
        <div className="card-body">
          <p className="card-text"><strong>Quantity:</strong> {product.quantity}</p>
          <p className="card-text"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p className="card-text"><strong>Status:</strong> {product.status}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
