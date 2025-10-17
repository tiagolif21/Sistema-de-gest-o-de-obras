import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './SupplierList.css';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*');

      if (error) {
        setError(error.message);
        console.error('Error fetching suppliers:', error);
      } else {
        setSuppliers(data);
      }
    };

    fetchSuppliers();
  }, []);

  if (error) {
    return <div className="error-message">Erro ao carregar fornecedores: {error}</div>;
  }

  return (
    <table className="supplier-table">
      <thead>
        <tr>
          <th>RAZÃO SOCIAL / NOME</th>
          <th>CNPJ / CPF</th>
          <th>E-MAIL</th>
          <th>AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map(supplier => (
          <tr key={supplier.id}>
            <td>{supplier.name}</td>
            <td>{supplier.document}</td>
            <td>{supplier.email}</td>
            <td>
              <button className="btn-action btn-edit">Editar</button>
              <button className="btn-action btn-delete">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SupplierList;
