import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import Checkbox from '../../../components/Form/FormControls/Checkbox/Checkbox'
const CheckboxView = () => {

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
            title: 'checked',
            description: 'state checked',
            type: 'Boolean',
        },
        {
            title: 'disabled',
            description: 'checkbox disabled',
            type: 'Boolean',
        },
        {
            title: 'isRequired',
            description: 'attribute required',
            type: 'Boolean',
        },
        {
            title: 'multipleChecked',
            description: 'checkbox style with line instead of checkmark',
            type: 'Boolean',
        },
        {
            propType: 'event',
            title: 'change',
            description: 'returns !state',
            type: 'function',
            example: "change(state) => setChecked(state)"
        },
    ]

    const componentTypes = useRef(
        [
            {
                title: 'unchecked',
                checked: false
            },
            {
                title: 'checked',
                checked: true
            },
            {
                title: 'disabled',
                checked: false,
                disabled:true
            },
            {
                title: 'disabled and checked',
                checked: true,
                disabled:true
            },
            {
                title: 'multipleChecked style',
                checked: true,
                multipleChecked:true
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> CheckBox </span>
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

                                <Checkbox 
                                    checked={c.checked}
                                    disabled={c.disabled}
                                    isRequired={c.isRequired}
                                    multipleChecked={c.multipleChecked}
                                    change={(state) => (c.checked = state,setRenderFlag(r => !r))}
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

export default CheckboxView
