import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import Radio from '../../../components/Form/FormControls/Radio/Radio'
const RadioView = () => {

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
            description: 'radio disabled',
            type: 'Boolean',
        },
        {
            title: 'isRequired',
            description: 'attribute required',
            type: 'Boolean',
        },
        {
            title: 'withUncheckState',
            description: 'can uncheck radio state',
            type: 'Boolean / Default Value is False',
        },
        {
            propType: 'event',
            title: 'change',
            description: 'returns state',
            type: 'function',
            example: "change(state) => setChecked(state)"
        },
    ]

    const componentTypes = useRef(
        [
            {
                title: 'unchecked initial',
                checked: false
            },
            {
                title: 'checked',
                checked: true
            },
            {
                title: 'with Uncheck State',
                checked: true,
                withUncheckState: true,
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
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> Radio </span>
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

                                <Radio 
                                    checked={c.checked}
                                    disabled={c.disabled}
                                    isRequired={c.isRequired}
                                    withUncheckState={c.withUncheckState}
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

export default RadioView
