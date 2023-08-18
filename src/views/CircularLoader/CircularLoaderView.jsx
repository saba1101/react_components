import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import CircularLoader from '@/components/Loader/CircularLoader.jsx'

const CircularLoaderView = () => {
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
            title: 'loading',
            description: 'Loader Loading and Visibility State',
            type: 'Boolean',
            example: 'true | false',
        },
        {
            title: 'mode',
            description: 'Loader mode',
            type: 'String',
            example: 'inline | outline',
        },
        {
            title: 'customStyle',
            description: 'loader Overlay customStyle',
            type: 'Style/Object',
            example: `{
                background: '#000'
            }`,
        },
        {
            title: 'circleColor',
            description: 'Loader circle Color',
            type: 'Hex Color/String Color',
            example: '',
        },
    ]

    const componentTypes = useRef(
        [
            {
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> Loader </span>
                </h1>
            </div>
            <div className="docs__component_wrapper">
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >

                                <CircularLoader
                                    loading={true}
                                    mode={'inline'}
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

export default CircularLoaderView
