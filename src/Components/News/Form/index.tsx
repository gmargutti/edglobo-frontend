import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import NewsModel from '../../../@types/News';

interface FormProps {
  token: string
  news: NewsModel[]
  setUpdatedNews(updatedNews: NewsModel[]): void
}

export default function Form({ token, setUpdatedNews, news }: FormProps) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const { newsId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (newsId) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/news/${newsId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        const { titulo: responseTitulo, conteudo: responseConteudo } = response.data;
        setTitulo(responseTitulo);
        setConteudo(responseConteudo);
      }).catch((err) => {
        alert(err.response.data.message);
      });
    }
  }, []);

  const btnSalvar_OnClick = async () => {
    try {
      const path = `news${newsId ? `/${newsId}` : ''}`;
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/${path}`,
        method: newsId ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          titulo,
          conteudo,
          dataPublicacao: new Date(),
        },
      });
      if (response.status === 200) {
        if (newsId) {
          const updated = [...news.filter((n) => n._id !== newsId), response.data];
          setUpdatedNews(updated);
        } else {
          setUpdatedNews([...news, response.data]);
        }

        history.push('/');
      }
    } catch (err) {
      alert('Não foi possível adicionar/atualizar essa notícia!');
    }
  };

  const txtTitulo_OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.currentTarget.value);
  };

  const txtConteudo_OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConteudo(e.currentTarget.value);
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={8}>
        <TextField variant="outlined" label="Título" style={{ width: '100%', margin: '20px 0 20px 0' }} value={titulo} onChange={txtTitulo_OnChange} />
      </Grid>
      <Grid item xs={8}>
        <TextField variant="outlined" label="Conteúdo" style={{ width: '100%', margin: '20px 0 20px 0' }} multiline rows={10} value={conteudo} onChange={txtConteudo_OnChange} />
      </Grid>
      <Grid container xs={8} alignItems="flex-end" direction="column">
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={btnSalvar_OnClick}>{newsId ? 'Atualizar' : 'Adicionar'}</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
