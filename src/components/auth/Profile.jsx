import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="m-0">User Profile</h3>
            </div>
            <div className="card-body p-4">
              {user ? (
                <div className="row">
                  <div className="col-md-3 text-center mb-4 mb-md-0">
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '120px', height: '120px' }}>
                      <span className="display-4 text-primary">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="mb-3">
                      <label className="form-label text-muted">Full Name</label>
                      <div className="form-control bg-light">{user.name}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted">Email</label>
                      <div className="form-control bg-light">{user.email}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted">Account ID</label>
                      <div className="form-control bg-light">
                        <small>{user.id}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning">
                  User information could not be loaded. Please try again later.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 