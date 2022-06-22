import React from 'react'
import gifLoading from "../images/loading5.gif"
import style from "./styles/Loading.module.css"

const Loading = () => {
  return (
    <div className={style.loadingBox}>
      <img className={style.loadingGif} src={gifLoading} alt=''/>
    </div>
  )
}

export default Loading