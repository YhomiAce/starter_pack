import React from 'react';
import FileUpload from './components/fileUpload';

const App = ()=> {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
          <i className="fab fa-react" /> React FileUpload
      </h4>
      <FileUpload />
    </div>
  );
}

export default App;
