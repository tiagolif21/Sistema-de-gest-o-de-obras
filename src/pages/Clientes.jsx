import React from 'react';
import { Link } from 'react-router-dom';
import ClientList from '../components/ClientList';
import '../components/ClientList.css'; // Reusing styles

const Clientes = () => {
  return (
    <div className="list-page-container">
      <div className="list-page-header">
        <h1>Gestão de Clientes</h1>
        <Link to="/clientes/novo" className="btn btn-primary">
          Adicionar Novo Cliente
        </Link>
      </div>
      <div className="list-page-content">
        <ClientList />
      </div>
    </div>
  );
};

export default Clientes;
