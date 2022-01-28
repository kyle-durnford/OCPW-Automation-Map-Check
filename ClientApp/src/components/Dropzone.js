import React, { isValidElement, useCallback, useState } from "react"
import {useDropzone} from 'react-dropzone'
import { FaTrashAlt } from "react-icons/fa"

const dropTextProps = {
  style: {
    fontSize: '1rem',
    minWidth: 'max-content'
  }
}

const dropzoneProps = {
  style: {
      background: '#f4f5fc',
      border: '2px dashed #bbb',
      borderRadius: '1rem',
      padding: '1rem 8rem',
      cursor: 'pointer',
      width: '100%',
  }
}

const dropTitleProps = {
  style: {
    fontSize: '1.5rem',
    fontWeight: '600'
  }
}

const dropFileProps = {
  style: {
    fontSize: '1rem',
    fontFamily: 'poppins, sans-serif',
    textAlign: 'center'
  }
}

const dropzoneContProps = {
  style: {
    fontFamily: 'poppins, sans-serif',
    textAlign: 'center',
    color: '#333',
  }
}

const Dropzone = ({ onChange, ...rest }) => {

  const [files, setFiles] = useState([])
  const [error, setError] = useState(null)

  const fileNameCheck = name => {
    const rg1 = new RegExp('^[^\\/:\*\?%\$\@"{}<>\|]+$') // forbidden characters \ / : * ? " < > |
    console.log(name)
    console.log(rg1.test(name))
    return rg1.test(name);
  }

  const onDrop = async acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles[0])
      checkVersion(acceptedFiles[0]).then(
        response => {
          let v = parseInt(response.slice(2, 6))
          if (v >= 1021) {
            if (fileNameCheck(acceptedFiles[0].name)) {
              console.log(v)
              setFiles(acceptedFiles)
              onChange(acceptedFiles)
              setError(null)
            } else {
              console.log("invalid file name")
              setError("Invalid file name. Please Try again")
            }
          } else {
            console.log("invalid file version")
            setError("Invalid file version. Autocad 2007 and later only (AC1021)")
          }
        } 
      )
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: '.dwg, .dgn', maxFiles: 1, maxSize: 20971520, minSize: 1 });

  const removeFile = i => {
    setFiles(files.filter((v, j) => j !== i))
  }

  const checkVersion = file => {
    return new Promise(resolve => {
      let reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.readAsText(file)
    })
  }

  const filesDisplay = (
    <div>
      {files.map((file, i) =>
       
        file !== null ? (
            <div key={i} {...dropFileProps}>{file.name} <small> {Math.round(file.size / 1024)} KB</small>
              <button
                style={{cursor: 'pointer'}}
                type="button"
                id={file.id + "_remove"}
                onClick={() => {
                  removeFile(i)
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
        ) : (
          ""
        )
      )}
    </div>
  )

  return (
    <div {...dropzoneProps} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p {...dropzoneContProps} {...dropTextProps}>Drop the files here ...</p>
      ) : (
        <div {...dropzoneContProps}>
          <h2 {...dropTitleProps}>Drag and Drop</h2>
          <p {...dropTextProps}>or click to choose files</p>
          <p>{error}</p>
        </div>
      )}
      <aside>{filesDisplay}</aside>
    </div>
  );
}


export default Dropzone