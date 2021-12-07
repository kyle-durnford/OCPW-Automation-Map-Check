import React, {useState} from 'react';
import * as docx from 'docx'
import {saveAs} from 'file-saver'
import good from '../assets/check.svg'

const validationCont = {
    style: {
        backgroundColor: '#ebfaf0',
        color: '#5bd381',
        padding: '.5rem',
        width: '100%',
        borderRadius: '.5rem',
        fontSize: '1rem',
        marginTop: '1rem'
    }
}

const buttonOutlineProps = {
    style: {
        fontFamily: 'poppins, sans-serif',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#fe805c',
        padding: '.25rem 1.5rem',
        background: '#fff',
        border: '2px solid #fe805c',
        borderRadius: '.5rem',
        cursor: 'pointer',
        textTransform: 'uppercase',
        transition: 'color .2s ease, background.2s ease',
        width: '100%'
    }
}

const reportDrawerCont = {
    style: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        width: '100%',
        padding: '1rem',
    }
}

const ReportDrawer = ({data}) => {
    const [success, setSuccess] = useState(false);

    console.log(data)

    const paragraphs = () => {
        return data.map((e, i) => new docx.Paragraph({
            children: [ new docx.TextRun({text: 'parcel_' + (i + 1), break: 2, bold: true,  font: "Calibri", size: 32}), 
                        ...Object.entries(e[1][1][1][0]['Segments']).map((el, il) => new docx.TextRun({break: 2, size: 24, font: "Calibri", text:el[1]['desc_grid']}))]
        }))
    }

    const generate = () => {

        const doc = new docx.Document({
            sections: [{
                properties: {},
                children: [...paragraphs()]
                }]
            })

            docx.Packer.toBlob(doc).then((blob) => {
                // saveAs from FileSaver will download the file
                saveAs(blob, "parcel-report.docx");
                setSuccess(true)
            });

        } 
        return (
            <div {...reportDrawerCont}>
                <button type="button" className={`orangeOutlineButton`} {...buttonOutlineProps} onClick={() => generate()}>Generate Full Report</button>
                {(success ? <div {...validationCont}><img src={good} alt="Pass" style={{marginRight: '.5rem'}}></img>Success</div> : null)}
            </div>
        )
    }

export default ReportDrawer