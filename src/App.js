import React, { useState } from 'react';

function FormularioCadastro() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    sexo: ''
  });
  
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  const validarFormulario = () => {
    const novosErros = {};
    
    if (!formData.nomeCompleto.trim()) {
      novosErros.nomeCompleto = 'Nome completo é obrigatório';
    }
    
    if (!formData.dataNascimento) {
      novosErros.dataNascimento = 'Data de nascimento é obrigatória';
    } else {
      const idade = calcularIdade(formData.dataNascimento);
      if (idade < 18) {
        novosErros.dataNascimento = 'Você deve ter mais de 18 anos';
      }
    }
    
    if (!formData.sexo) {
      novosErros.sexo = 'Sexo é obrigatório';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      console.log('Dados válidos:', formData);
      setSucesso(true);
      // Aqui você poderia enviar os dados para um backend
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Cadastro</h1>
      
      {sucesso ? (
        <div style={styles.mensagemSucesso}>
          <p>Cadastro realizado com sucesso!</p>
          <button 
            style={styles.botao} 
            onClick={() => {
              setSucesso(false);
              setFormData({ nomeCompleto: '', dataNascimento: '', sexo: '' });
            }}
          >
            Novo Cadastro
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.formulario}>
          <div style={styles.grupo}>
            <label htmlFor="nomeCompleto" style={styles.rotulo}>Nome Completo:</label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              style={styles.input}
            />
            {erros.nomeCompleto && <span style={styles.erro}>{erros.nomeCompleto}</span>}
          </div>
          
          <div style={styles.grupo}>
            <label htmlFor="dataNascimento" style={styles.rotulo}>Data de Nascimento:</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              style={styles.input}
            />
            {erros.dataNascimento && <span style={styles.erro}>{erros.dataNascimento}</span>}
          </div>
          
          <div style={styles.grupo}>
            <label style={styles.rotulo}>Sexo:</label>
            <div style={styles.radioGrupo}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="sexo"
                  value="Homem"
                  checked={formData.sexo === 'Homem'}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                Homem
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="sexo"
                  value="Mulher"
                  checked={formData.sexo === 'Mulher'}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                Mulher
              </label>
            </div>
            {erros.sexo && <span style={styles.erro}>{erros.sexo}</span>}
          </div>
          
          <button type="submit" style={styles.botao}>Cadastrar</button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  titulo: {
    textAlign: 'center',
    color: '#333'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  grupo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  rotulo: {
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  radioGrupo: {
    display: 'flex',
    gap: '15px',
    marginTop: '5px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  radioInput: {
    margin: '0'
  },
  botao: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  },
  erro: {
    color: 'red',
    fontSize: '14px'
  },
  mensagemSucesso: {
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: 'bold'
  }
};

export default FormularioCadastro;