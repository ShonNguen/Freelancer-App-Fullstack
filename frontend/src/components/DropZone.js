import React from 'react';
import { useDropzone } from 'react-dropzone';


export default function DropZone({ files, setFiles }) {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    acceptedFiles.map(file => {
        setFiles(oldFiles => [...oldFiles, file]);
    })

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </section>
    )
}
