import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserInfo, putUserInfo } from "../redux/actions"
import style from "./styles/Upload.module.css"
import { useAuth0 } from "@auth0/auth0-react";

const Upload = () => {
    const { isAuthenticated, user } = useAuth0();
    const userInfo = useSelector((state) => state.user)
    const [ image, setImage ] = useState(null);
    const [ loading, setLoading ] = useState(false)
    const [ isModify, setIsModify ] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
      if (isAuthenticated) {
        dispatch(getUserInfo(user.sub));
      }
      // eslint-disable-next-line
    }, [isModify])

    const handleClick = () => {
      dispatch(putUserInfo(userInfo.sub, {
        picture: image
      }, null, setIsModify))
    }

    const uploadImage = async (e) => {
      const files = e.target.files
      if (files[0]) {
        setLoading(true)
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'codebug')
        const res = await axios.post("https://api.cloudinary.com/v1_1/codebugers/image/upload", data)
        const file = res.data
        setImage(file.secure_url)
        setLoading(false)
      }
    }

  return (
    <div>
        <div className={style.fullContainer}>
          <div className={`col-lg-4 ${style.col2}`}>
            Cambia tu foto:
          </div>
          <div className={`col-lg-4 ${style.col2} ${style.photo}`}>
            <div className={style.loader}>
              {loading
              ? <h6>Cargando...</h6>
              : <img src={image || userInfo.picture} alt="foto usuario" className={style.foto} referrerPolicy="no-referrer"/>}
            </div>
            <div className={style.btn}>
              <input  type="file"
                      name="file"
                      placeholder='Click para elegir'
                      accept=".jpg, .jpeg, .png"
                      onChange={(e)=>uploadImage(e)}
              />
            </div>
            <div id="archivoseleccionado"></div>
          </div>
          <div className={`col-lg-4 ${style.col2}`}>
            <button onClick={handleClick} className={style.btnPhoto}>Confirmar</button>
          </div>
        </div>
    </div>
  );
}

export default Upload
