import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Fab } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import News from '../../../@types/News';

interface SingleNewProps {
    token: string
}

export default function SingleNew({ token }: SingleNewProps) {
  const [currentNew, setCurrentNew] = useState<News>();
  const { newsId } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/news/${newsId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setCurrentNew(response.data);
    });
  }, []);

  const fabEditNews_OnClick = () => {
    history.push(`/form/${newsId}`);
  };

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Typography gutterBottom variant="h5" component="h1" style={{ padding: '50px' }}>
          {currentNew?.titulo}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" style={{ padding: '50px 200px', whiteSpace: 'pre-wrap' }}>
          <p>{currentNew?.conteudo}</p>
        </Typography>
      </Grid>
      <Fab color="primary" style={{ position: 'fixed', bottom: '20px', right: '40px' }} onClick={() => fabEditNews_OnClick()}>
        <EditIcon />
      </Fab>
    </>
  );
}
