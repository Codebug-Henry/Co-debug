import React from "react";
import style from "./styles/UserCard.module.css"

const UserCard = ({cantAns,cantQuest,email,locale,nickname,statusBanned,sub,points})=>{
    
    const banUser = (e)=>{
        e.preventDefault() 
    }


    return (
        <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.row}`}>
            <div className={`col-lg-2 ${style.column}`}>
                    <p>{nickname}</p>
            </div>
            <div className={`col-lg-3 ${style.column}`}>
                     <p>{sub}</p>
            </div>
            <div className={`col-lg-3 ${style.column}`}>
                    <p>{email}</p>
            </div>
            <div className={`col-lg-1  ${style.column}`}>
                    <p>{locale}</p> 
            </div>
            <div className={`col-lg  ${style.column}`}>
                    <p>{cantQuest}</p>
            </div>
            <div className={`col-lg  ${style.column}`}>
                    <p>{cantAns}</p>
            </div>
            <div className={`col-lg  ${style.column}`}>
                    <p>{points}</p>
            </div>
            <div className={`col-lg  ${style.column}`}>
                    <p>{String(statusBanned)}</p>
            </div>
            <div className={`col-lg  ${style.column}`}>
                    <button 
                    className={style.banButton}
                    onClick={(e)=>banUser(e)}
                    >
                    Ban
                    </button>
            </div>
            </div> 
        </div>
    )
}

export default UserCard;