// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import {Routes, Route} from "react-router-dom";
import Header from "./header/header";
import React from 'react';
import News from "./news/news";
import NewsDetail from "./news-detail/news-detail";
import CreateNews from "./create-news/create-news";
import Auth from "./auth/auth";


export function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<h1 style={{textAlign:"center",marginTop:"40px"}}>Проект: новости</h1>}/>
        <Route path="/all" element={<News/>}/>
        <Route path="/detail/:id" element={<NewsDetail/>}/>
        <Route path="/create" element={<CreateNews/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;
