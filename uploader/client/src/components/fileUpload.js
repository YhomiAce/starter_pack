import React,{Fragment,useState} from 'react';
import axios from 'axios';
import Message from './message';
import Progress from './progressBar';

const FileUpload = (props) => {

  const [file,setFile] = useState('');
  const [filename,setFilename] = useState('Choose File');
  const [uploadedFile,setUploadedFile] = useState({});
  const [message,setMessage] = useState('');
  const [uploadPercentage,setUploadPercentage] = useState(0);

  const changeHandler = e =>{
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  }
  const submitHandler = async e =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('upload',file);
    try {
      const res = await axios.post('/upload',formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        onUploadProgress: progressEvent =>{
          setUploadPercentage(parseInt(Math.round(progressEvent.loaded *100)/progressEvent.total))
          setTimeout(()=>setUploadPercentage(0),10000);
        }
      });
      const {fileName,filePath} = res.data;
      setUploadedFile({fileName,filePath});
      setMessage('File uploaded');
    } catch (err) {
      if(err.response.status === 500){
        setMessage("Problem with the server");
      }else{
        setMessage(err.response.data.msg);
      }
    }
  }

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
        <form onSubmit={submitHandler}>
          <div className="custom-file mb-4">
            <input type="file" className="form-control-input" onChange={changeHandler} />
            <label htmlFor="file">{filename}</label>
          </div>
          <Progress percent={uploadPercentage} />
          <input type="submit" className="btn btn-primary btn-block mt-4" value="Upload" />
        </form>
        {uploadedFile ?
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <h4 className="text-center">{uploadedFile.fileName}</h4>
              <img src={uploadedFile.filePath} style={{width:'100%'}} alt="" />
            </div>
          </div> : null
        }
    </Fragment>
  )
}

export default FileUpload;
