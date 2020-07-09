import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardMedia, CardContent, CardActionArea, Typography,
  Fab, Box,
} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import NewsModel from '../../../@types/News';

interface NewsListProps {
    token: string
    news: NewsModel[],
    setUpdatedNews(updatedNews: NewsModel[]): void
}

export default function NewsList({ token, news, setUpdatedNews }: NewsListProps) {
  const history = useHistory();

  const newsCard_OnClick = (newsId: string) => {
    history.push(`/read/${newsId}`);
  };

  const fabAddNews_OnClick = () => {
    history.push('/form');
  };

  const fabRemoveNews_OnClick = async (newsId: string) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/news/${newsId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200) {
        setUpdatedNews(news.filter((n) => n._id !== newsId));
      }
    } catch (err) {
      alert('Não foi possível remover a notícia!');
    }
  };

  return (
    <>
      <Grid container justify="center" alignItems="center">
        <Typography variant="h3" component="h3">
          Cadastro de Notícias
        </Typography>
      </Grid>
      {news
      && (
      <Grid container justify="space-around" alignItems="center">
        {news.map((n) => (
          <React.Fragment key={`${n._id}`}>
            <Grid item xs={8} style={{ padding: '20px 0 20px 0' }}>
              <Card onClick={() => newsCard_OnClick(`${n._id}`)}>
                <CardActionArea style={{ height: '100%' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {n.titulo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ whiteSpace: 'pre-wrap', maxHeight: '100px' }} noWrap>
                      {n.conteudo}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Fab color="secondary" onClick={() => fabRemoveNews_OnClick(`${n._id}`)}>
                <DeleteIcon />
              </Fab>

            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      )}
      <Grid container style={{ position: 'fixed', bottom: '20px', right: '40px' }} justify="flex-end" alignItems="center">
        {news.length === 0
      && (
        <Grid item style={{ margin: '0 50px' }}>
          <Typography variant="h5" component="h2">
            Para começar a inserir notícias, utilize esse ícone >>>
          </Typography>
        </Grid>
      )}
        <Grid item>
          <Fab color="primary" onClick={() => fabAddNews_OnClick()}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}
