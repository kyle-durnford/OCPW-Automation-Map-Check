import React, { useCallback, useState } from "react"
import {useDropzone} from 'react-dropzone'
import { FaTrashAlt } from "react-icons/fa"

const Dropzone = ({ onChange, ...rest }) => {

  const [files, setFiles] = useState([])  

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log({ acceptedFiles });
    setFiles(acceptedFiles)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = i => {
    setFiles(files.filter((v, j) => j !== i))
  }

  const filesDisplay = (
    <ul>
      {files.map((file, i) =>
        file !== null ? (
          <li key={file.id}>
            {file.name} <small> {file.size} bytes</small>
            <button
              type="button"
              id={file.id + "_remove"}
              onClick={() => {
                removeFile(i)
              }}
            >
              <FaTrashAlt />
            </button>
          </li>
        ) : (
          ""
        )
      )}
    </ul>
  )

  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ onChange })} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <aside>{filesDisplay}</aside>
    </div>
  );
}


export default Dropzone