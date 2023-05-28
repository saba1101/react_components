import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import MainButton from '@/components/Button/MainButton.jsx'
const ButtonsView = () => {

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
            title: 'label',
            description: 'Button Label',
            type: 'String,Number',
        },
        {
            title: 'loading',
            description: 'button attribute disabled',
            type: 'Boolean',
        },
        {
            title: 'type',
            description: 'Button style type',
            type: 'String / Default Value is "background"',
            example: 'background,border,text',
        },
        {
            title: 'size',
            description: 'button height size',
            type: 'String',
            example: 'small,medium,large'
        },
        {
            title: 'customStyle',
            description: 'apply styles to button',
            type: 'Object',
            example: '{width: "120px", height: "120px" ,background: "red", color: "red", borderRadius: "18px", ..etc}'
        },
        {
            propType: 'component',
            title: 'icon',
            description: 'icon slot template',
            type: 'React Component',
            example: 'const icon = (imgUrl) => <img src={imgUrl} />'
        },
        {
            propType: 'event',
            title: 'onClick',
            description: 'returns click event',
            type: 'function',
            example: "onClick() => ..."
        },
    ]

    const componentTypes = useRef(
        [
            {
                label: 'Default Button'
            },
            {
                label: 'loading',
                loading: true,
            },
            {
                label: 'disabled',
                disabled: true,
            },
            {
                label: 'Type border',
                type: 'border'
            },
            {
                label: 'Type text',
                type: 'text'
            },
            {
                label: 'size Medium',
                size: 'medium'
            },
            {
                label: 'size small',
                size: 'small'
            },
            {
                label: 'size large',
                size: 'large'
            },
            {
                label: 'Custom Style',
                customStyle: {
                    border: '0.0625rem solid indianred',
                    background: 'indianred',
                    color: "#fff",
                }
            },
            {
                label: 'Custom Style',
                customStyle: {
                    border: '0.0625rem solid indianred',
                    background: 'none',
                    color: "indianred",
                }
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> MainButton </span>
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
                                    disabled={c.disabled}
                                    loading={c.loading}
                                    type={c.type}
                                    size={c.size}
                                    customStyle={c.customStyle}
                                    icon={c.icon}
                                    onClick={() => console.log('Clicked')}
                                />

                            </div>
                        )
                    })
                }

            </div>

            <div className="docs__component_static_preview_props">
                <ul>
                    {
                        propsList && propsList.map((p,ind) => {
                            return (
                                <li key={ind} className={p.propType && p.propType === 'event' ? 'event' : p.propType === 'component' ? 'component' : 'prop'}>
                                    <span className='docs__label'>
                                        <span> { p.title}</span> 
                                    </span>
                                    <span className='docs__type'>
                                        <span>
                                            { p.type} 
                                        </span>
                                    </span>
                                    <span className='docs__description'>
                                        <span>{ p.description}</span>
                                    </span>
                                    <span className='docs__example'> 
                                        <span> { p.example} </span>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ButtonsView
