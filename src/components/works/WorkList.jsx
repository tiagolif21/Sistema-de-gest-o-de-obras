import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './WorkList.css';

const WorkList = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('obras')
          .select(`
            *,
            clientes (
              nome_completo,
              razao_social
            )
          `);

        if (error) {
          throw error;
        }
        
        // Mapeia os dados para extrair o nome do cliente
        const formattedData = data.map(work => ({
          ...work,
          client_name: work.clientes ? (work.clientes.nome_completo || work.clientes.razao_social) : 'Cliente não associado'
        }));

        setWorks(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const handleEdit = (id) => {
    // Futuramente, navegar para a página de edição da obra
    console.log('Editar obra com ID:', id);
    // navigate(`/obras/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta obra?')) {
      const { error } = await supabase.from('obras').delete().match({ id });

      if (error) {
        setError(`Erro ao excluir a obra: ${error.message}`);
      } else {
        // Remove a obra da lista no estado local para atualizar a UI
        setWorks(works.filter(work => work.id !== id));
      }
    }
  };

  if (loading) {
    return <p>Carregando obras...</p>;
  }

  if (error) {
    return <p>Erro ao carregar obras: {error}</p>;
  }

  return (
    <table className="work-table">
      <thead>
        <tr>
          <th>Nome da Obra</th>
          <th>Cliente Associado</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {works.map(work => (
          <tr key={work.id}>
            <td>{work.name}</td>
            <td>{work.client_name}</td>
            <td>{work.status}</td>
            <td>
              <button onClick={() => handleEdit(work.id)} className="btn-action btn-edit">Editar</button>
              <button onClick={() => handleDelete(work.id)} className="btn-action btn-delete">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkList;