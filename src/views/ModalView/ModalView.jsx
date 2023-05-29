import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import MainButton from '@/components/Button/MainButton.jsx'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import Popup from '@/components/Modal/Popup.jsx'
import ToggleView from '@/views/FormView/ToggleView/ToggleView.jsx'


const ModalView = () => {

    const [renderFlag,setRenderFlag] = useState(false)
    const [Visible,setVisible] = useState(false)
    const [PopupConfig,setPopupConfig] = useState({})

    const OpenPopup = (conf) => {
        setPopupConfig(conf)
        setVisible(true)
    }

    const ClosePopup = () => {
        setPopupConfig({})
        setVisible(false)
    }

    const closeButtonTemplate = () => {
        return (
            <MainButton
                label={'Close'}
                size={'small'}
                customStyle={
                    {
                        border: `0.0625rem solid #EF4D4D`,
                        color: '#EF4343',
                        borderRadius: '0.375rem',
                        width: '7.5rem',
                    }
                }
                type={'border'}
                onClick={ ClosePopup }
            />
        )
    }



    const propsList =[
        {
            title: 'Props Name',
            description: 'Description',
            type: 'Type',
            example: 'Example',
            header: true
        },
        {
            title: 'visible',
            description: 'Popup Visibility State',
            type: 'Boolean',
        },
        {
            title: 'size',
            description: 'Popup Size Types in Width',
            type: 'String',
            example: 'small,medium,large',
        },
        {
            title: 'template',
            description: 'Popup Slot for Template',
            type: 'Function / React Component',
        },
        {
            title: 'options',
            description: 'Popup Configure Options',
            type: 'Object',
            example: `
                {
                    title: String, 
                    description: String,
                    type: String(error,success,info,warning)
                    align: String(left,center,right)
                }
            `
        },
    ]

    const componentTypes = useRef(
        [
            {
                label: 'Small Popup Type Error',
                closeButton: true,
                customStyle: {
                    background: '#EF4D4D',
                    color: '#FFF',
                },
                popupConfig: {
                    size: 'small',
                    template: closeButtonTemplate,
                    options: {
                        type: 'error',
                        title: 'Error',
                        description: 'Error Description',
                        align: 'center',
                    }
                }
            },
            {
                label: 'Small Popup Type Warning',
                closeButton: true,
                customStyle: {
                    background: '#EBB924',
                    color: '#FFF',
                },
                popupConfig: {
                    size: 'small',
                    options: {
                        type: 'warning',
                        title: 'Warning',
                        description: 'Warning Description',
                        align: 'center',
                    }
                }
            },
            {
                label: 'Small Popup Type Info',
                closeButton: true,
                customStyle: {
                    background: '#00ADEE',
                    color: '#FFF',
                },
                popupConfig: {
                    size: 'small',
                    options: {
                        type: 'info',
                        title: 'Info',
                        description: 'Info Description',
                        align: 'center',
                    }
                }
            },
            {
                label: 'Small Popup Type Success',
                customStyle: {
                    background: '#27B989',
                    color: '#FFF',
                },
                popupConfig: {
                    size: 'small',
                    options: {
                        type: 'success',
                        title: 'Success',
                        description: 'Success Description',
                        align: 'center',
                    }
                }
            },
            {
                label: 'Medium Size Popup',
                popupConfig: {
                    size: 'medium',
                    options: {
                        type: 'none',
                        title: 'Medium Size ',
                        description: 'Medium Size Popup with Toggle Views Template inside',
                        align: 'left',
                    }
                }
            },
            {
                label: 'Large Size Popup',
                popupConfig: {
                    size: 'large',
                    options: {
                        type: 'none',
                        title: 'Large Size',
                        description: 'Large Size Popup with Toggle Views Template inside',
                        align: 'left',
                    }
                }
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> Popup </span>
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

                                <MainButton 
                                    label={c.label}
                                    size={'small'}
                                    customStyle={c.customStyle}
                                    onClick={() => OpenPopup(c.popupConfig)}
                                />

                            </div>
                        )
                    })
                }

            </div>

            <div className="docs__component_static_preview_props">
                <PropsDoc propsList={propsList} />
            </div>

            <Popup 
                visible={Visible}
                options={PopupConfig.options ?? {}}
                size={PopupConfig?.size}
                template={() => {
                    return (
                        <div
                            style={
                                PopupConfig?.size === 'small' ? {width:'100%',display:'flex',justifyContent:'center'} : {}
                            }
                        >
                                {
                                    PopupConfig.size === 'small' ? closeButtonTemplate() : (
                                        <ToggleView />
                                    )
                                }
                                {
                                    PopupConfig.size !== 'small' ? (
                                        <div style={
                                            {width:'100%',display:'flex',justifyContent:'center',marginTop: '1.25rem'}
                                        }>
                                            {closeButtonTemplate()}
                                        </div>
                                    ) : ''
                                }
                        </div>

                        // <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                        // </div>
                    )
                }}
            />
        </div>
    )
}

export default ModalView
