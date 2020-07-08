import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import dotenv from 'dotenv';
import axios from 'axios';
import News from './Components/News';
import NewsModel from './@types/News';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
});

function App() {
  const [token, setToken] = useState('');
  const [news, setNews] = useState<NewsModel[]>([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/auth/new`).then((response) => {
      setToken(response.data.token);
      axios.get(`${process.env.REACT_APP_BASE_URL}/news`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      }).then((responseNews) => {
        setNews(responseNews.data);
      });
    });
  }, []);

  const setUpdatedNews = (updatedNews: NewsModel[]) => {
    setNews(updatedNews);
  };

  if (!token) {
    return (<></>);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <News token={token} news={news} setUpdatedNews={setUpdatedNews} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
