// import IconUpload from '@/assets/icons/svg/upload.svg'
import Upload from '@/assets/svgComponents/Upload.jsx'
import MainButton from '@/components/Button/MainButton.jsx'
import { _calculateSizeByUnit,_getFileFormat,_toBase64 } from '@/utils/Helpers'
import { useRef, useState } from 'react'
import FileBlock from '@/components/Files/FileBlock/FileBlock.jsx'
import style from '@/components/Files/Uploader/FileUploader.module.scss'
import { createNotification } from '@/components/Notification/ToastNotification.js'

const FileUploader = (
    {
        validators,
        directionStyle,
        multiple,
        onChange,
        maxSize,
        withFileValidation,
        acceptedFileFormats, // = ['jpeg','png','svg','jpg'],
    }
) => {
    const UploaderID = useRef(crypto.randomUUID())
    const [RenderFlag,setRenderFlag] = useState(false)
    const [IsActive,setIsActive] = useState(false)
    const Files = useRef([])

    const ToggleIsActive = (state) => {
        setIsActive(state)
    }
    
    const DragEnter = (ev) => {
        ev.preventDefault()
        ToggleIsActive(true)
    }

    const DragLeave = (ev) => {
        ev.preventDefault()
        ToggleIsActive(false)
    }

    const DragOver = (ev) => {
        ev.preventDefault()
        ToggleIsActive(true)
    }

    const Drop = (event) => {
        event.preventDefault()
        CollectFiles(event.dataTransfer.files)
        ToggleIsActive(false)
    }

    const HandleFileRemove = (file) => {
        Files.current = Files.current.filter((f,ind) => {
            return (
                f.fileID !== file.fileID
            )
        })
        setRenderFlag(state => !state)
        SyncChange()
    }

    const Change = (event) => {
        CollectFiles(event.target.files)
    }

    const SyncChange = () => {
        if(onChange && typeof onChange === 'function'){
            onChange(Files.current)
        }
    }

    const CollectFiles = async (array) => {

        if(!multiple && (Files.current.length === 1 || Files.current.length > 1)) return

        let files = array
        let mappedFiles = []

        for(let i = 0; i < files.length; i++){

          let fileObject = {
            fileName: files[i].name,
            size: files[i].size,
            unitSize: _calculateSizeByUnit(files[i].size),
            type: files[i].type,
            format: _getFileFormat(files[i].name),
            base64: await _toBase64(files[i]),
            fileID: crypto.randomUUID(),
          }

          if(withFileValidation && acceptedFileFormats && !acceptedFileFormats.includes(fileObject.format.toLowerCase())){
            createNotification(`File ${files[i].name} is Wrong Format`,'info',1500,'top-right',2)
            return
          }
          
          if(maxSize && files[i].size > maxSize){
            createNotification(`File ${files[i].name} is Too Large`,'info',1500,'top-right',2)
          } else mappedFiles.push(fileObject)

        }

        if(!multiple && mappedFiles.length > 1) mappedFiles = mappedFiles.slice(0,1)
        
        // if (multiple && validators && validators?.maxFiles && files.length + mappedFiles.length > validators.maxFiles) {
        //     mappedFiles = mappedFiles.slice(0,validators.maxFiles)
        // }

        Files.current = [...Files.current,...mappedFiles]
        setRenderFlag(state => !state)
        SyncChange()
      }

    return (
        <div 
            className={style.fileUploaderWrapper}
            style={
                {
                    maxWidth: directionStyle ? '450px' : '21.875rem',
                }
            }
        >

            <div 
                className={`${style.fileUploaderContent} ${directionStyle && directionStyle === 'rowStyle' ? style.directionRow : ''} ${IsActive ? style.activeDropzone : ''}`}
                onDragEnter={DragEnter}
                onDragLeave={DragLeave}
                onDragOver={DragOver}
                onDrop={Drop}
            >
                
                <div className={style.iconWrapper}>
                    <Upload/>
                    {/* <img src={IconUpload} alt="" /> */}
                </div>

                <div className={style.fileUploaderLabel}>
                    <span>
                        Select a file or drag and drop here
                    </span>
                </div>

                {
                    validators && (
                        <div className={style.validators}>

                        </div>
                    )
                }

                <div className={style.uploadAction}>
                    <MainButton 
                        label={'Select File'}
                        size={'small'}
                        customStyle={
                            {
                                width: '6.25rem',
                                height: '2rem',
                                borderRadius: '0.375rem',
                            }

                        }
                    />
                    <input 
                        type="file" 
                        name="" 
                        id={UploaderID}
                        multiple={multiple  ? true : false}
                        onChange={Change}
                        accept=''
                    />
                </div>
                
            </div>

            {
                (Files && Files.current && Files.current.length) ? (
                    Files.current.map((f,ind) => {
                        return (
                            <FileBlock 
                                key={ind}
                                file={f}
                                onDelete={HandleFileRemove}
                            />
                        )
                    })
                ) : ''
            }
        </div>
    )
}

export default FileUploader