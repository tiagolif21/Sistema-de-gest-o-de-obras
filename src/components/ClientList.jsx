import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './ClientList.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('clientes')
        .select('id, nome_completo, razao_social, cpf, cnpj, email');

      if (error) {
        setError(error.message);
      } else {
        // Mapeia os dados usando as colunas corretas para o nome
        const formattedData = data.map(c => ({
          id: c.id,
          name: c.nome_completo || c.razao_social,
          document: c.cpf || c.cnpj,
          email: c.email || 'N/A',
        }));
        setClients(formattedData);
      }
      setLoading(false);
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      const { error } = await supabase.from('clientes').delete().eq('id', id);

      if (error) {
        setError(`Erro ao excluir cliente: ${error.message}`);
      } else {
        setClients(clients.filter(client => client.id !== id));
      }
    }
  };

  if (loading) {
    return <p>Carregando clientes...</p>;
  }

  if (error) {
    return <p>Erro ao carregar clientes: {error}</p>;
  }

  return (
    <table className="client-table">
      <thead>
        <tr>
          <th>Nome / Razão Social</th>
          <th>CPF / CNPJ</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.document}</td>
            <td>{client.email}</td>
            <td>
                            <Link to={`/clientes/editar/${client.id}`} className="btn-action btn-edit">Editar</Link>
              <button onClick={() => handleDelete(client.id)} className="btn-action btn-delete">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientList;