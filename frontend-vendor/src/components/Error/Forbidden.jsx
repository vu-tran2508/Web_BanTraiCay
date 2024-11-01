// components/Forbidden.js
import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className="display-4">403 - Forbidden</h1>
          <p className="lead">You don't have permission to access this page.</p>
          <p>
            Go back to <Link to="/alogin">Login</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
