import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

export default function Profile() {

  const [incidents, setIncidents] = useState([]);

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  useEffect(() => {
    //Recuperar ong logada:
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      //Recuperar incidentes da ong logada:
      setIncidents(response.data);
    })
  }, [ongId]);

  //Deletar icidente:
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        //Enviar ong que está deletando o caso:
        headers: {
          Authorization: ongId
        }
      });
      //Remover incidente deletado da lista:
      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch(err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  //Realizar logout da ong:
  function handleLogout() {
    //Remover dados do localStorage:
    localStorage.clear();

    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower color="#E02041" size={18} />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
        <li key={incident.id}>
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p>

          <strong>VALOR:</strong>
          {/* Valor formatado em reais (funcao do JS) */}
          <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
          <button onClick={() => handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color='#a8a8b3' />
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
