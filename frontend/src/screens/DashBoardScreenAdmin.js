import React, { useState } from 'react';
import CreateCategoryAdmin from '../components/CreateCategoryAdmin';

const DashBoardScreenAdmin = () => {
  const [category, setCategory] = useState(true);

  return (
    <>
      <div className="row">
        <div className="col-3 my-3">
          <h3>Admin Activity</h3>
          <ul>
            <li onClick={(e) => setCategory(true)}>Supplier list</li>
            <li>Create category</li>
            <li>Category List</li>
            <li>Product List</li>
          </ul>
        </div>
        <div className="col-9">{category ? <CreateCategoryAdmin /> : null}</div>
      </div>
    </>
  );
};

export default DashBoardScreenAdmin;
