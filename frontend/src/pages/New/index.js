import React, { useState, useMemo } from 'react';

import './style.css';
import api from '../../services/api';
import camera from '../../assets/camera.svg';

export default function New({ history }) {

  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thubnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thubnail ? URL.createObjectURL(thubnail) : null;
  }, [thubnail]);

  async function handleSubmit(e) {

    e.preventDefault();

    const user_id = localStorage.getItem('user');

    const data = new FormData();

    data.append('thumbnail', thubnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id="thumbnail" className={thubnail ? 'has-thumbnail' : ''} style={{ backgroundImage: `url(${preview})` }}>
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Camera" />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input type="text" id="company" value={company} onChange={event => setCompany(event.target.value)} placeholder="Sua empresa incrível." />

      <label htmlFor="techs">TECNOLOGIAS *  <span>(separadas por vírgula)</span> </label>
      <input type="text" id="techs" value={techs} onChange={event => setTechs(event.target.value)} placeholder="Quais tecnologias usam?" />

      <label htmlFor="price">VALOR DA DIÁRIA * <span>em branco para GRATUITO</span> </label>
      <input type="text" id="price" value={price} onChange={event => setPrice(event.target.value)} placeholder="Valor cobrado por dia." />

      <button type="submit" className="btn">CADASTRAR</button>
    </form>
  )
}
