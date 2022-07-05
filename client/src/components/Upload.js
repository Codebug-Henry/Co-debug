import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserInfo, putUserInfo } from "../redux/actions"
import style from "./styles/Upload.module.css"



const Upload = () => {
    const todoElUser = useSelector((state)=>state.user)
    const [ image, setImage ] = useState(null);
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getUserInfo(todoElUser.sub))
    }, [loading])

    const handleClick = () => {
      setLoading(true)
      dispatch(putUserInfo(todoElUser.sub,{
        picture:image
      }, setLoading))
    }

    const uploadImage = async (e)=>{
        setLoading(true)
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset','codebug')
        const res = await axios.post("https://api.cloudinary.com/v1_1/codebugers/image/upload",data)
        const file = res.data
        setImage(file.secure_url)
        setLoading(false)
    }

  return (
    <div>
        {loading ? <h5>Cargando...</h5> : (
        <div className={style.fullContainer}>
          <div className={`col-lg-4 ${style.col2}`}>
            <p>Cambia tu foto:</p>
          </div>
          <div className={`col-lg-4 ${style.col2} ${style.photo}`}>
            <div>
              <img src={image || todoElUser.picture} alt="foto usuario" className={style.foto} referrerpolicy="no-referrer"/>
            </div>
            <div className={style.btn}>
              <input  type="file"
                      name="file"
                      placeholder='Click para elegir'
                    onChange={(e)=>uploadImage(e)}
              />
            </div>
            <div id="archivoseleccionado"></div>
          </div>
          <div className={`col-lg-4 ${style.col2}`}>
            <button onClick={handleClick} className={style.btnPhoto}>Confirmar</button>
          </div>
        </div>)
        }
    </div>
  );
}

export default Upload
