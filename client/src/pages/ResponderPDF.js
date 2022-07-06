import React from 'react'
import Responder from './Responder';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import style from "./styles/ResponderPDF.module.css"
import pdfdownload from "../images/pdfdownload.png"

function Pdf() {

    const exportPDF = () =>{
        const input = document.getElementById("AppResponder")
        html2canvas(input,{logging: true, letterRendering: 1, useCORS: true}).then(canvas =>{
                const imgWidth = 208;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL("img/png");
                const pdf = new jsPDF("p","mm","a4");
                pdf.addImage(imgData, "PNG",0,0,imgWidth,imgHeight)
                pdf.save("nombreDelPdf.pdf")
            })
    }
    
    return (
        <div className={style.AppResponder}>
          {/* <button onClick={()=> exportPDF()}>Print PDF</button> */}
            {/* <Fab color="#ff9800" variant='extended' aria-label="FileDownoladIcon" size="small" onClick={()=> exportPDF()} className={style.download}>
              <FileDownloadIcon  /> 
            </Fab> */}
            <img src={pdfdownload} onClick={()=> exportPDF()} alt="download" className={style.pdfdownload}/>
          <header id="AppResponder" className="App-header">
            {/* Acá va el componente que quiero guardar en PDF */}
            <Responder />
          </header>
        </div>
     );
    }

    export default Pdf;