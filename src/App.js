import React from 'react';
import AdminApp from './adminapp';
import PublicApp from './publicapp';


function App() {
  if(localStorage.getItem("adminid") !=null ){
    return (
        <AdminApp />
    );
  }else{
    return (
      <PublicApp />
    )
  }
}

export default App;


