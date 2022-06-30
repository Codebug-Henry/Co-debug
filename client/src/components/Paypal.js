import React, { useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom"




const Paypal = ({val}) => {

 
    const navigate = useNavigate()

    const paypal = useRef();

    useEffect(()=>{
        window.paypal.Buttons({
            createOrder: (data, actions, err)=>{
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {  
                            description: "Donación",
                            amount: {
                                currency_code: "BRL",
                                value: val,
                            }
                        },
                    ]
                })
            },

            onApprove: async (data, actions) =>{
                const order = await actions.order.capture();
                console.log(order)
                navigate(`/pagolisto`)
                // aca va lo que queremos que haga cuando da ok
            },
            onError: (err) => {
                console.log(err)
            }

        })
        .render(paypal.current)
    },[navigate, val])


    return (
    <div>
        <div ref={paypal}></div>
    </div>
    )
}

export default Paypal