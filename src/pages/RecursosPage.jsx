import React from 'react';
import { Link } from 'react-router-dom';
import '../components/ClientList.css'; // Reusing styles for consistency
import RecursosList from '../components/recursos/RecursosList';

const RecursosPage = () => {
  return (
    <div className="list-page-container">
      <div className="list-page-header">
        <h1>Gestão de Recursos</h1>
        <Link to="/recursos/novo" className="btn btn-primary">
          Adicionar Recurso
        </Link>
      </div>
      <div className="list-page-content">
        <RecursosList />
      </div>
    </div>
  );
};

export default RecursosPage;
