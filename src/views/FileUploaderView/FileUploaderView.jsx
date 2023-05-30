import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import FileUploader from '@/components/Files/Uploader/FileUploader.jsx'

const FileUploaderView = () => {

    const [renderFlag,setRenderFlag] = useState(false)

    const propsList =[
        {
            title: 'Props Name',
            description: 'Description',
            type: 'Type',
            example: 'Example',
            header: true
        },
        {
            title: 'multiple',
            description: 'Defines if Multiple Files can be uploaded or Single',
            type: 'Boolean',
        },
        {
            title: 'directionStyle',
            description: 'Defines Drop Zone Direction Style ',
            type: 'String / Default rowStyle',
            example: 'rowStyle,colStyle'
        },
        {
            propType: 'event',
            title: 'onChange',
            description: 'returns Files Array',
            type: 'function',
            example: "onChange(FilesArray) => ..."
        },
    ]

    const componentTypes = useRef(
        [
            {
                title: 'Default Single File Upload',
                multiple: false,
            },
            {
                title: 'Multiple File Upload',
                multiple: true,
            },
            {
                title: 'Row Style Direction',
                multiple: true,
                directionStyle: 'rowStyle',
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> FileUploader </span>
                </h1>
            </div>
            <div className="docs__component_wrapper comp__uploader">
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >
                                {
                                    c.title && (
                                        <h5>
                                            {c.title}
                                        </h5>
                                    )
                                }
                                <FileUploader 
                                    multiple={c.multiple}
                                    directionStyle={c.directionStyle}
                                    onChange={(files) => console.log(files)}
                                    validators={c.validators}
                                />
                            </div>
                        )
                    })
                }

            </div>

            <div className="docs__component_static_preview_props">
                <PropsDoc propsList={propsList} />
            </div>
        </div>
    )
}

export default FileUploaderView
