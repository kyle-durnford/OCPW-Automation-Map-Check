import React, { useCallback, useState } from "react"
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

const Dropzone = ({ onChange, setFiles, files, ...rest}) => {

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log({ acceptedFiles });
    setFiles(acceptedFiles)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const removeFile = i => {
    setFiles(files.filter((v, j) => j !== i))
  }

  const filesDisplay = (
    <div>
      {files.map((file, i) =>
        file !== null ? (
            <div key={file.id} {...dropFileProps}>{file.name} <small> {Math.round(file.size / 1024)} KB</small>
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
      <input {...getInputProps({ onChange })} />
      {isDragActive ? (
        <p {...dropzoneContProps} {...dropTextProps}>Drop the files here ...</p>
      ) : (
        <div {...dropzoneContProps}>
          <h2 {...dropTitleProps}>Drag and Drop</h2>
          <p {...dropTextProps}>or click to choose files</p>
        </div>
      )}
      <aside>{filesDisplay}</aside>
    </div>
  );
}


export default Dropzone