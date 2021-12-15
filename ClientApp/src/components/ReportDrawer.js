import React, {useState} from 'react';
import * as docx from 'docx'
import {saveAs} from 'file-saver'
import good from '../assets/check.svg'

const ReportDrawer = ({data}) => {
    const [success, setSuccess] = useState(false);

    console.log(data)

    const paragraphs = () => { //Building a paragraph (1 per parcel)
        return data.map((e, i) => new docx.Paragraph({
            children: [ new docx.TextRun({text: 'parcel_' + (i + 1), break: 2, bold: true,  font: "Calibri", size: 32}), //Creating the title
                        ...Object.entries(e[1][1][1][0]['Segments']).map((el, il) => new docx.TextRun({break: 2, size: 24, font: "Calibri", text:el[1]['desc_grid']}))] //Looping through segment info
        }))
    }

    const generate = () => {

        const doc = new docx.Document({ //Creating the document
            sections: [{
                properties: {},
                children: [...paragraphs()] // Add each paragraph
                }]
            })

            docx.Packer.toBlob(doc).then((blob) => {
                // saveAs from FileSaver will download the file
                saveAs(blob, "parcel-report.docx");
                setSuccess(true)
            });

        } 
        return (
            <div className="report">
                <button type="button" className="button--outline" onClick={() => generate()}>Generate Full Report</button>
                {(success ? <div className="validation--success"><img src={good} alt="Pass" style={{marginRight: '.5rem'}}></img>Success</div> : null)}
            </div>
        )
    }

export default ReportDrawer