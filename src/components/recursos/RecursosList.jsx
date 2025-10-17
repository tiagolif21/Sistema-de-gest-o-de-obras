import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import '../ClientList.css'; // Reutilizando estilos

const RecursosList = () => {
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecursos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('recursos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        const formattedData = data.map(r => ({
          id: r.id,
          nome_descricao: r.nome_razao_social || r.descricao_equipamento || r.descricao_servico || 'N/A',
          tipo: r.tipo_recurso,
          contato: r.telefone || r.email || 'N/A',
          valor: r.valor ? `R$ ${r.valor} / ${r.unidade_pagamento || 'N/A'}` : (r.salario_base ? `R$ ${r.salario_base} / Mês` : 'N/A'),
        }));
        setRecursos(formattedData);
      }
      setLoading(false);
    };

    fetchRecursos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este recurso?')) {
      const { error } = await supabase.from('recursos').delete().eq('id', id);

      if (error) {
        setError(`Erro ao excluir recurso: ${error.message}`);
      } else {
        setRecursos(recursos.filter(r => r.id !== id));
      }
    }
  };

  if (loading) {
    return <p>Carregando recursos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar recursos: {error}</p>;
  }

  return (
    <table className="client-table"> {/* Reutilizando a classe da tabela de clientes */}
      <thead>
        <tr>
          <th>Nome / Descrição</th>
          <th>Tipo</th>
          <th>Contato Principal</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {recursos.map(recurso => (
          <tr key={recurso.id}>
            <td>{recurso.nome_descricao}</td>
            <td>{recurso.tipo}</td>
            <td>{recurso.contato}</td>
            <td>{recurso.valor}</td>
            <td>
              <button onClick={() => alert('Editar ' + recurso.id)} className="btn-action btn-edit">Editar</button>
              <button onClick={() => handleDelete(recurso.id)} className="btn-action btn-delete">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecursosList;
