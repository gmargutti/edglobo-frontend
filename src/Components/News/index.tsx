import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import NewsList from './List';
import NewsModel from '../../@types/News';
import SingleNew from './Single';
import Form from './Form';

interface NewsProps {
    token: string
    news: NewsModel[]
    setUpdatedNews(updatedNews: NewsModel[]): void
}

export default function News({ token, news, setUpdatedNews }: NewsProps) {
  return (
    <Switch>
      <Route path="/read/:newsId?" exact>
        <SingleNew token={token} />
      </Route>
      <Route path="/form/:newsId?">
        <Form token={token} news={news} setUpdatedNews={setUpdatedNews} />
      </Route>
      <Route path="/">
        <NewsList token={token} news={news} setUpdatedNews={setUpdatedNews} />
      </Route>
    </Switch>
  );
}
