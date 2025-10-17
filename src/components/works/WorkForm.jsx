import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Ajuste o caminho se necessário
import '../ClientForm.css'; // Reutilizando o CSS padrão

export default function WorkForm() {
  const [clients, setClients] = useState([]);
  const [workData, setWorkData] = useState({
    client_id: '',
    name: '',
    type: '',
    status: 'Planejamento', // Alterado para seleção
    address: '',
    technical_manager: '',
    area_sqm: '',
    start_date: '',
    end_date: '',
    valor_contrato: '',
    custo_estimado: '',
    status_faturamento: 'A Faturar',
    numero_art_rrt: '',
    link_documentos: '',
    percentual_conclusao: 0,
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('clientes')
        .select('id, nome_completo, razao_social')
        .order('nome_completo', { ascending: true });

      if (error) {
        setError('Não foi possível carregar os clientes.');
        console.error('Erro ao buscar clientes:', error);
      } else {
        setClients(data);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Salvando...');
    setError('');

    // Garante que campos vazios sejam enviados como null para o Supabase
    const newWork = Object.fromEntries(
      Object.entries(workData).map(([key, value]) => [key, value === '' ? null : value])
    );

    const { error: insertError } = await supabase.from('obras').insert([newWork]);

    if (insertError) {
      setError(`Erro ao salvar a obra: ${insertError.message}`);
      setStatus('');
    } else {
      setStatus('Obra salva com sucesso!');
      setTimeout(() => navigate('/obras'), 1500);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Nova Obra</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-section">
          <p className="form-section-title">Informações Principais</p>
          <div className="form-grid">
            <div className="form-group col-span-6">
              <label htmlFor="client_id">Cliente</label>
              <select id="client_id" name="client_id" value={workData.client_id} onChange={handleChange} required>
                <option value="">Selecione um Cliente</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.nome_completo || client.razao_social}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-span-6">
              <label htmlFor="name">Nome da Obra</label>
              <input id="name" name="name" type="text" placeholder="Ex: Residência Unifamiliar" value={workData.name} onChange={handleChange} required />
            </div>
            <div className="form-group col-span-6">
              <label htmlFor="type">Tipo de Obra</label>
              <input id="type" name="type" type="text" placeholder="Ex: Construção, Reforma" value={workData.type} onChange={handleChange} />
            </div>
            <div className="form-group col-span-6">
              <label htmlFor="status">Status da Obra</label>
              <select id="status" name="status" value={workData.status} onChange={handleChange}>
                <option value="Planejamento">Planejamento</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Pausada">Pausada</option>
                <option value="Concluída">Concluída</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
            <div className="form-group col-span-6">
              <label htmlFor="numero_art_rrt">Nº ART/RRT</label>
              <input id="numero_art_rrt" name="numero_art_rrt" type="text" placeholder="Número do documento" value={workData.numero_art_rrt} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <p className="form-section-title">Localização e Medidas</p>
          <div className="form-grid">
            <div className="form-group col-span-8">
              <label htmlFor="address">Endereço da Obra</label>
              <input id="address" name="address" type="text" placeholder="Rua, Nº, Bairro..." value={workData.address} onChange={handleChange} />
            </div>
            <div className="form-group col-span-4">
              <label htmlFor="area_sqm">Área (m²)</label>
              <input id="area_sqm" name="area_sqm" type="number" step="0.01" placeholder="Ex: 150.5" value={workData.area_sqm} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <p className="form-section-title">Detalhes Financeiros</p>
          <div className="form-grid">
            <div className="form-group col-span-4">
              <label htmlFor="valor_contrato">Valor do Contrato</label>
              <input id="valor_contrato" name="valor_contrato" type="number" step="0.01" placeholder="R$" value={workData.valor_contrato} onChange={handleChange} />
            </div>
            <div className="form-group col-span-4">
              <label htmlFor="custo_estimado">Custo Estimado</label>
              <input id="custo_estimado" name="custo_estimado" type="number" step="0.01" placeholder="R$" value={workData.custo_estimado} onChange={handleChange} />
            </div>
            <div className="form-group col-span-4">
              <label htmlFor="status_faturamento">Status do Faturamento</label>
              <select id="status_faturamento" name="status_faturamento" value={workData.status_faturamento} onChange={handleChange}>
                <option value="A Faturar">A Faturar</option>
                <option value="Faturado Parcialmente">Faturado Parcialmente</option>
                <option value="Faturado Totalmente">Faturado Totalmente</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <p className="form-section-title">Prazos e Responsáveis</p>
          <div className="form-grid">
            <div className="form-group col-span-6">
              <label htmlFor="start_date">Data de Início</label>
              <input id="start_date" name="start_date" type="date" value={workData.start_date} onChange={handleChange} />
            </div>
            <div className="form-group col-span-6">
              <label htmlFor="end_date">Data de Término</label>
              <input id="end_date" name="end_date" type="date" value={workData.end_date} onChange={handleChange} />
            </div>
            <div className="form-group col-span-8">
              <label htmlFor="technical_manager">Responsável Técnico</label>
              <input id="technical_manager" name="technical_manager" type="text" placeholder="Nome do engenheiro(a) ou arquiteto(a)" value={workData.technical_manager} onChange={handleChange} />
            </div>
            <div className="form-group col-span-4">
              <label htmlFor="percentual_conclusao">% Concluído</label>
              <input id="percentual_conclusao" name="percentual_conclusao" type="number" min="0" max="100" step="1" placeholder="%" value={workData.percentual_conclusao} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <p className="form-section-title">Documentação</p>
          <div className="form-grid">
            <div className="form-group col-span-12">
              <label htmlFor="link_documentos">Link dos Documentos</label>
              <input id="link_documentos" name="link_documentos" type="url" placeholder="https://..." value={workData.link_documentos} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <Link to="/obras" className="btn btn-secondary">Voltar</Link>
          <button type="submit" className="btn btn-primary">Salvar Obra</button>
        </div>

        {status && <p className={`status-message ${error ? 'error' : 'success'}`}>{status || error}</p>}
        
      </form>
    </div>
  );
}