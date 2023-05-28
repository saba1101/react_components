import '@/views/ViewsCommon/common.scss'
import Input from '@/components/Form/Input/Input.jsx'
import { useRef, useState } from 'react'

const InputView = () => {

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
            description: 'input label',
            type: 'String,Number',
        },
        {
            title: 'placeholder',
            description: 'input placeholder',
            type: 'String,Number',
        },
        {
            title: 'value',
            description: 'input value',
            type: 'String,Number',
        },
        {
            title: 'isRequired',
            description: 'input attribute required',
            type: 'Boolean',
        },
        {
            title: 'disabled',
            description: 'input attribute disabled',
            type: 'Boolean',
        },
        {
            title: 'readOnly',
            description: 'input attribute readOnly',
            type: 'Boolean',
        },
        {
            title: 'inputType',
            description: 'input attribute type',
            type: 'String',
            example: 'Text,Password',
        },
        {
            title: 'size',
            description: 'input size, height',
            type: 'String',
            example: 'small,medium,large',
        },
        {
            title: 'msg',
            description: 'input validation message',
            type: 'Object',
            example: "{type: 'error' || 'success', visible: true || false, text: String}",
        },
        {
            propType: 'event',
            title: 'onChange',
            description: 'returns input value from onChange event',
            type: 'function',
            example: "onChange(value) => setValue(value)",
        },
        {
            propType: 'event',
            title: 'focusChange',
            description: 'returns event when focus triggers',
            type: 'function',
            example: "focusChange() => .....",
        },
        {
            propType: 'event',
            title: 'blurChange',
            description: 'returns event when blue triggers',
            type: 'function',
            example: "blurChange() => .....",
        },

    ]

    const componentTypes = useRef(
        [
            {
                label: 'Default Input With Label',
                value: '',
            },
            {
                label: 'Default Filled With Label',
                value: 'Vue is better',
            },
            {
                label: 'Label and Placeholder',
                value: '',
                placeholder: 'Type Something'
            },
            {
                label: 'required',
                value: '',
                isRequired: true
            },
            {
                label: 'inputType password',
                value: '',
                inputType: 'password'
            },
            {
                label: 'disabled',
                value: '',
                disabled: true
            },
            {
                label: 'readOnly',
                value: 'read only',
                readOnly: true,
            },
            {
                label: 'error type',
                value: '',
                msg: {
                    visible: true,
                    type:'error',
                },
            },
            {
                label: 'error msg',
                value: '',
                msg: {
                    visible: true,
                    type:'error',
                    text:'error message'
                },
            },
            {
                label: 'success type',
                value: '',
                msg: {
                    visible: true,
                    type:'success',
                },
            },
            {
                label: 'success msg',
                value: '',
                msg: {
                    visible: true,
                    type:'success',
                    text:'success message'
                },
            },
            {
                label: 'large',
                value: '',
                size: 'large'
            },
            {
                label: 'small',
                value: '',
                size: 'small'
            },
        ]
    )


    // const propsArr = useRef(
    //     [
    //         {
    //             title: 'msg',
    //             selectionMode: 'single',
    //             options: [
    //                 {
    //                     type: 'error',
    //                     selected: false,
    //                     text: 'Error Message',
    //                     visible: true,
    //                 },
    //                 {
    //                     type: 'success',
    //                     selected: false,
    //                     text: 'Success Message',
    //                     visible: true,
    //                 }
    //             ]
    //         },
    //         {
    //             title: 'disabled',
    //             selectionMode: 'single',
    //             options: [
    //                 {
    //                     type: 'readOnly',
    //                     selected: false,
    //                 },
    //                 {
    //                     type: 'disabled',
    //                     selected: false,
    //                 }
    //             ]
    //         },
    //         {
    //             title: 'inputType',
    //             selectionMode: 'single',
    //             options: [
    //                 {
    //                     type: 'password',
    //                     inputType: 'password',
    //                     selected: false,
    //                 },
    //                 {
    //                     type: 'text',
    //                     inputType: 'text',
    //                     selected: false,
    //                 }
    //             ]
    //         }
    //     ]
    // )

    // const selectedProps = useRef({})

    // const UpdateProps = (newProps) => {
    //     selectedProps.current[newProps.title] = newProps.options.find(opt => opt.selected)
    //     setRenderFlag(state => !state)
    // }


    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> FormInput </span>
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
                                <Input
                                    label={c.label}
                                    placeholder={c.placeholder}
                                    isRequired={c.isRequired}
                                    disabled={c.disabled}
                                    inputType={c.inputType}
                                    size={c.size}
                                    msg={c.msg}
                                    readOnly={c.readOnly}
                                    value={c.value}
                                    onChange={(value) => (c.value = value,setRenderFlag(state => !state))}
                                />
                            </div>
                        )
                    })
                }

            </div>
            {/* <div className="docs__component_dynamic_props">
                {
                    propsArr && propsArr.current.map((p,index) => (
                        <PropsBlock 
                            key={index}
                            propsObj={p}
                            selectionMode={p.selectionMode}
                            update={UpdateProps}
                        />
                    ))
                }
            </div> */}
            <div className="docs__component_static_preview_props">
                <ul>
                    {
                        propsList && propsList.map((p,ind) => {
                            return (
                                <li key={ind} className={p.propType && p.propType === 'event' ? 'event' : 'prop'}>
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

export default InputView