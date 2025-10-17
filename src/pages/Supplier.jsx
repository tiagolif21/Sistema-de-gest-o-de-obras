import React, { useState } from 'react';
import SupplierList from '../components/SupplierList';
import SupplierForm from '../components/SupplierForm';
import './Supplier.css';

// Dados de exemplo que agora vivem no componente de página
const initialSuppliers = [
  { id: 1, name: 'Fornecedor A', contact: 'contato@fornecedora.com' },
  { id: 2, name: 'Fornecedor B', contact: 'contato@fornecedorb.com' },
  { id: 3, name: 'Fornecedor C', contact: 'contato@fornecedorc.com' },
];

const Supplier = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [suppliers, setSuppliers] = useState(initialSuppliers);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Função para adicionar um novo fornecedor à lista
  const handleAddSupplier = (newSupplierData) => {
    const newSupplier = {
      id: suppliers.length + 1, // Simples geração de ID
      ...newSupplierData,
    };
    setSuppliers([...suppliers, newSupplier]);
    setIsFormVisible(false); // Opcional: esconde o formulário após o envio
  };

  return (
    <div className="supplier-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Módulo de Fornecedores</h1>
        <button onClick={toggleFormVisibility} className="btn btn-primary">
          {isFormVisible ? 'Fechar Formulário' : 'Adicionar Novo Fornecedor'}
        </button>
      </div>

      {isFormVisible && <SupplierForm onSave={handleAddSupplier} />}

      <div style={{ marginTop: '2rem' }}>
        <SupplierList suppliers={suppliers} />
      </div>

    </div>
  );
};

export default Supplier;
