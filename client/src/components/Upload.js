import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { putUserInfo } from "../redux/actions"



const Upload = () => {
    const todoElUser = useSelector((state)=>state.user)
    const [ image, setImage ] = useState(null);
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
      if(image !== null){
        dispatch(putUserInfo(todoElUser.sub,{
        picture:image
      }))
      window.location.reload();
      }
      
    },[image])

  
    console.log(todoElUser)

    const uploadImage = async (e)=>{
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset','codebug')
        console.log(data)
        setLoading(true)
        const res = await axios.post("https://api.cloudinary.com/v1_1/codebugers/image/upload",data)
        const file = res.data
        setLoading(false)
        setImage(file.secure_url)
        
    } 
 
    

  return (
    <div>
        <p>Cambia tu foto:</p>
        <img src={todoElUser.picture} alt="foto usuario"></img>
        <input type="file"
        name="file"
        placeholder='Click para elegir'
        onChange={(e)=>uploadImage(e)}
        />
        { loading && <h5>Cargando...</h5> }

    </div>
  );
}

export default Upload
