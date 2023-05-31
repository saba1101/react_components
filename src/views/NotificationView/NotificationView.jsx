import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import MainButton from '@/components/Button/MainButton.jsx'
import { createNotification } from '@/components/Notification/ToastNotification.js'
import PropsDoc from '@/localComponents/PropsDoc.jsx'

const NotificationView = () => {

    const [renderFlag,setRenderFlag] = useState(false)

    const propsList =[
        {
            title: 'Function Argument',
            description: 'Description',
            type: 'Type',
            example: 'Example',
            header: true
        },
        {
            title: 'type',
            description: 'Notification Type',
            type: 'String',
            example: 'info,warning,error,success'
        },
        {
            title: 'text',
            description: 'Notification Text',
            type: 'String',
        },
        {
            title: 'timeout',
            description: 'Notification Timeout',
            type: 'Number / Millisecond',
        },
        {
            title: 'position',
            description: 'Notification Position',
            type: 'String',
            example: 'top-left , top-right , bottom-left , bottom-right'
        },
        {
            title: 'max',
            description: 'Notifications Maximum Call Stack',
            type: 'Number',
        },
    ]

    const componentTypes = useRef(
        [
            {
                label: 'Info Notification',
                type: 'info',
                position: 'top-right',
                max: 5,
                timeout: 2000,
                text: 'Info Type Notification',
                customStyle: {
                    background : '#4996fd',
                    height: '2.1875rem',
                    borderRadius: '0.375rem'
                }
            },
            {
                label: 'Warning Notification',
                type: 'warning',
                timeout: 2000,
                position: 'top-right',
                max: 5,
                text: 'Info Type Notification',
                customStyle: {
                    background : '#ffc757',
                    height: '2.1875rem',
                    borderRadius: '0.375rem'
                }
            },
            {
                label: 'Success Notification',
                type: 'success',
                timeout: 2000,
                position: 'top-right',
                max: 5,
                text: 'Info Type Notification',
                customStyle: {
                    background : '#10b77f',
                    height: '2.1875rem',
                    borderRadius: '0.375rem'
                }
            },
            {
                label: 'Error Notification',
                type: 'error',
                timeout: 2000,
                position: 'top-right',
                max: 5,
                text: 'Info Type Notification',
                customStyle: {
                    background : '#ef4343',
                    height: '2.1875rem',
                    borderRadius: '0.375rem'
                }
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Function Import Name : <span> createNotification </span>
                </h1>
            </div>
            <div className="docs__component_wrapper comp__button">
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

                                <MainButton
                                    label={c.label}
                                    customStyle={c.customStyle}
                                    onClick={() => {createNotification(c.text,c.type,c.timeout,c.position,c.max)}}
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

export default NotificationView
