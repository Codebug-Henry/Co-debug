import React from 'react'
import Footer from "../components/Footer.js"

//Traemos "user.sub" que contiene el ID unico del usuario conectado para que podamos comparar el id y ver si puede estar acá.
// import { useAuth0 } from '@auth0/auth0-react'



const Admin = () => {

    // const { user } = useAuth0();
    
    return (

        <div>
            <h1>This is Admin</h1>
            <div><Footer/></div>
        </div>
    )
}

export default Admin