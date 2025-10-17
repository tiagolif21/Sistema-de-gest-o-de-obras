import React from 'react';
import { Link } from 'react-router-dom';
import SupplierList from '../components/suppliers/SupplierList';

const Fornecedores = () => {
  return (
    <div className="fornecedores-container" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Gestão de Fornecedores</h1>
        <Link to="/fornecedores/novo" className="btn btn-primary">
          Adicionar Novo Fornecedor
        </Link>
      </div>
      <SupplierList />
    </div>
  );
};

export default Fornecedores;
