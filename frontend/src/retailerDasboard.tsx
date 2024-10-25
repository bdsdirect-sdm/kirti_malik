import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './retailerDashboard.css'; 

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const[retailer,setRetailer]=useState<any>(null)

  const retailerId = localStorage.getItem('retailerId');
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/app/getProducts/${retailerId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    const fetchRetailer=async()=>{
      try{
        const response=await fetch(`http://localhost:8080/app/retailerdetails/${retailerId}`);
        if(!response.ok){
          throw new Error('network response was not ok');
        }
        const data=await response.json();
        setRetailer(data);

      }
      catch(error)
      {
        console.log("error fetching retailer")

      }
    }

    fetchProducts();
    fetchRetailer();
  }, [retailerId]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8080/app/deleteProduct/${productId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProducts(products.filter(product => product.id !== productId));
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error during deletion:', error);
      }
    }
  };

  const handleAdd = () => {
    navigate(`/addproduct/${retailerId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('retailerId'); 
    navigate('/login'); 
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

 
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
    <div className="dashboard-container">
      <div className='retailer-header'>
        <h2>Retailer Dashboard</h2>
        {/* <p>{retailer.companyName}</p> */}

      </div>
      
      <input
        type="text"
        placeholder="Search by product name"
        value={search}
        onChange={handleSearch}
      />
      <button onClick={handleAdd}>Add Product</button>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td><img src={`http://localhost:8080/uploads/${product.image}`} alt={product.name} width="50" /></td>
              <td>{product.quantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.status}</td>
              <td className="actions">
                <button onClick={() => navigate(`/editProduct/${product.id}`)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
                <button onClick={() => navigate(`/viewProduct/${product.id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Dashboard;
