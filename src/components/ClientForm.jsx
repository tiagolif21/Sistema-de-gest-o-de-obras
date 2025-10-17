import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './ClientForm.css';
import { useParams, useNavigate, Link } from 'react-router-dom';

const getInitialFormData = () => ({
  tipo_pessoa: 'pf',
  nome_completo: '',
  razao_social: '',
  nome_fantasia: '',
  cpf: '',
  cnpj: '',
  inscricao_estadual: '',
  inscricao_municipal: '',
  email: '',
  telefone: '',
  pessoa_contato: '',
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
  observacoes: '',
});

export default function ClientForm() {
  const [formData, setFormData] = useState(getInitialFormData());
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate(); // Para redirecionar após salvar

  useEffect(() => {
    const fetchClient = async () => {
      if (!id) {
        setFormData(getInitialFormData());
        return;
      }

      setStatus('Carregando cliente...');
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError(`Erro ao carregar cliente: ${error.message}`);
        setStatus('');
      } else if (data) {
        setFormData({ ...getInitialFormData(), ...data });
        setStatus('');
      }
    };

    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTipoPessoaChange = (tipo) => {
    setFormData(prev => ({ ...getInitialFormData(), tipo_pessoa: tipo }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Salvando...');
    setError('');

    const { error: submissionError } = id
      ? await supabase.from('clientes').update(formData).eq('id', id)
      : await supabase.from('clientes').insert(formData);

    if (submissionError) {
      setError(`Erro ao salvar: ${submissionError.message}`);
      setStatus('');
    } else {
      setStatus(id ? 'Cliente atualizado com sucesso!' : 'Cliente salvo com sucesso!');
      setTimeout(() => {
        navigate('/clientes'); // Redireciona para a lista
      }, 1500);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Editar Cliente' : 'Cadastro de Clientes'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="type-selector">
          <button type="button" className={`type-selector-btn ${formData.tipo_pessoa === 'pf' ? 'selected' : ''}`} onClick={() => handleTipoPessoaChange('pf')}>
            Pessoa Física
          </button>
          <button type="button" className={`type-selector-btn ${formData.tipo_pessoa === 'pj' ? 'selected' : ''}`} onClick={() => handleTipoPessoaChange('pj')}>
            Pessoa Jurídica
          </button>
        </div>

        {formData.tipo_pessoa === 'pf' ? (
          <PessoaFisicaForm formData={formData} handleChange={handleChange} />
        ) : (
          <PessoaJuridicaForm formData={formData} handleChange={handleChange} />
        )}

        <EnderecoForm formData={formData} handleChange={handleChange} />
        <ObservacoesForm formData={formData} handleChange={handleChange} />

        <div className="form-actions">
          <Link to="/clientes" className="btn btn-secondary">Voltar</Link>
          <button type="submit" className="btn btn-primary">Salvar Cliente</button>
        </div>
        {status && <p style={{ marginTop: '1rem', color: 'green' }}>{status}</p>}
        {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

// --- Sub-componentes permanecem os mesmos ---

const PessoaFisicaForm = ({ formData, handleChange }) => (
  <div className="form-section">
    <p className="form-section-title">Dados Pessoais</p>
    <div className="form-grid">
      <div className="form-group col-span-12">
        <label htmlFor="nome_completo">Nome Completo</label>
        <input id="nome_completo" name="nome_completo" type="text" placeholder="Nome Completo" value={formData.nome_completo} onChange={handleChange} required />
      </div>
      <div className="form-group col-span-4">
        <label htmlFor="cpf">CPF</label>
        <input id="cpf" name="cpf" type="text" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} required />
      </div>
      <div className="form-group col-span-4">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" placeholder="contato@email.com" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group col-span-4">
        <label htmlFor="telefone">Telefone</label>
        <input id="telefone" name="telefone" type="text" placeholder="(00) 90000-0000" value={formData.telefone} onChange={handleChange} />
      </div>
    </div>
  </div>
);

const PessoaJuridicaForm = ({ formData, handleChange }) => (
  <>
    <div className="form-section">
      <p className="form-section-title">Dados da Empresa</p>
      <div className="form-grid">
        <div className="form-group col-span-6">
          <label htmlFor="razao_social">Razão Social</label>
          <input id="razao_social" name="razao_social" type="text" placeholder="Razão Social" value={formData.razao_social} onChange={handleChange} required />
        </div>
        <div className="form-group col-span-6">
          <label htmlFor="nome_fantasia">Nome Fantasia</label>
          <input id="nome_fantasia" name="nome_fantasia" type="text" placeholder="Nome Fantasia" value={formData.nome_fantasia} onChange={handleChange} />
        </div>
        <div className="form-group col-span-6">
          <label htmlFor="cnpj">CNPJ</label>
          <input id="cnpj" name="cnpj" type="text" placeholder="00.000.000/0001-00" value={formData.cnpj} onChange={handleChange} required />
        </div>
      </div>
    </div>
    <div className="form-section">
      <p className="form-section-title">Contato</p>
      <div className="form-grid">
        <div className="form-group col-span-4">
          <label htmlFor="pessoa_contato">Pessoa de Contato</label>
          <input id="pessoa_contato" name="pessoa_contato" type="text" placeholder="Nome do contato" value={formData.pessoa_contato} onChange={handleChange} />
        </div>
        <div className="form-group col-span-4">
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" placeholder="contato@empresa.com" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group col-span-4">
          <label htmlFor="telefone">Telefone</label>
          <input id="telefone" name="telefone" type="text" placeholder="(00) 0000-0000" value={formData.telefone} onChange={handleChange} />
        </div>
      </div>
    </div>
    <div className="form-section">
      <p className="form-section-title">Informações Fiscais</p>
      <div className="form-grid">
        <div className="form-group col-span-6">
          <label htmlFor="inscricao_estadual">Inscrição Estadual</label>
          <input id="inscricao_estadual" name="inscricao_estadual" type="text" placeholder="Número da Inscrição Estadual" value={formData.inscricao_estadual} onChange={handleChange} />
        </div>
        <div className="form-group col-span-6">
          <label htmlFor="inscricao_municipal">Inscrição Municipal</label>
          <input id="inscricao_municipal" name="inscricao_municipal" type="text" placeholder="Número da Inscrição Municipal" value={formData.inscricao_municipal} onChange={handleChange} />
        </div>
      </div>
    </div>
  </>
);

const EnderecoForm = ({ formData, handleChange }) => (
  <div className="form-section">
    <p className="form-section-title">Endereço</p>
    <div className="form-grid">
      <div className="form-group col-span-3">
        <label htmlFor="cep">CEP</label>
        <input id="cep" name="cep" type="text" placeholder="00000-000" value={formData.cep} onChange={handleChange} />
      </div>
      <div className="form-group col-span-9">
        <label htmlFor="logradouro">Logradouro</label>
        <input id="logradouro" name="logradouro" type="text" placeholder="Rua, Avenida, etc." value={formData.logradouro} onChange={handleChange} />
      </div>
      <div className="form-group col-span-2">
        <label htmlFor="numero">Número</label>
        <input id="numero" name="numero" type="text" placeholder="Nº" value={formData.numero} onChange={handleChange} />
      </div>
      <div className="form-group col-span-4">
        <label htmlFor="complemento">Complemento</label>
        <input id="complemento" name="complemento" type="text" placeholder="Apto, Bloco, etc." value={formData.complemento} onChange={handleChange} />
      </div>
      <div className="form-group col-span-6">
        <label htmlFor="bairro">Bairro</label>
        <input id="bairro" name="bairro" type="text" placeholder="Bairro" value={formData.bairro} onChange={handleChange} />
      </div>
      <div className="form-group col-span-9">
        <label htmlFor="cidade">Cidade</label>
        <input id="cidade" name="cidade" type="text" placeholder="Cidade" value={formData.cidade} onChange={handleChange} />
      </div>
      <div className="form-group col-span-3">
        <label htmlFor="uf">UF</label>
        <input id="uf" name="uf" type="text" placeholder="Estado" value={formData.uf} onChange={handleChange} />
      </div>
    </div>
  </div>
);

const ObservacoesForm = ({ formData, handleChange }) => (
    <div className="form-section">
        <p className="form-section-title">Observações</p>
        <div className="form-grid">
            <div className="form-group col-span-12">
                <label htmlFor="observacoes">Observações Adicionais</label>
                <textarea id="observacoes" name="observacoes" placeholder="Detalhes importantes, restrições, etc." value={formData.observacoes} onChange={handleChange}></textarea>
            </div>
        </div>
    </div>
);