import React from 'react';
import { Link } from 'react-router-dom';
import WorkList from '../components/works/WorkList';

const Obras = () => {
  return (
    <div className="obras-container" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Gestão de Obras</h1>
        <Link to="/obras/novo" className="btn btn-primary">
          Adicionar Nova Obra
        </Link>
      </div>
      <WorkList />
    </div>
  );
};

export default Obras;