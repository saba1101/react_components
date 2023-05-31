import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import SingleSelectDropdown from '@/components/Form/Selects/SingleSelect/SingleSelectDropdown.jsx'
import {Data} from '@/utils/Data'
import PropsDoc from '@/localComponents/PropsDoc.jsx'

const SingleSelectDropdownView = () => {

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
            description: 'Dropdown label',
            type: 'String',
        },
        {
            title: 'data',
            description: 'dropdown data',
            type: 'Array',
            example: "[ { label : String, id: Number,String } ]"
        },
        {
            title: 'withFilter',
            description: 'adds input filter inside select container',
            type: 'Boolean',
        },
        {
            title: 'withClear',
            description: 'adds clear icon inside select container',
            type: 'Boolean',
        },
        {
            title: 'closeOnSelect',
            description: 'when item in clicked and selected dropdown will close',
            type: 'Boolean',
        },
        {
            title: 'isRequired',
            description: 'input attribute required',
            type: 'Boolean',
        },
        {
            title: 'size',
            description: 'input size, height',
            type: 'String',
            example: 'small,medium,large',
        },
        {
            title: 'msg',
            description: 'dropdown validation message',
            type: 'Object',
            example: "{type: 'error' || 'success', visible: true || false, text: String}",
        },
        {
            title: 'selectedOptonID',
            description: 'selects item that contains same id',
            type: 'Number,String',
        },
        {
            propType: 'event',
            title: 'selected',
            description: 'returns Selected Item Object',
            type: 'function',
            example: "selected(obj) => obj"
        },
    ]

    const componentTypes = useRef(
        [
            {
                label: 'Default Dropdown With Label',
                data : Data.Plain,
                selected: null,
            },
            {
                label: 'Default Filled With Label',
                data : Data.Plain,
                selected: null,
                selectedOptonID: 12,
            },
            {
                label: 'With Filter',
                data : Data.Plain,
                withFilter: true,
                selected: null,
            },
            {
                label: 'withClear',
                data : Data.Plain,
                withClear: true,
                selected: null,
            },
            {
                label: 'close On Select',
                closeOnSelect:true,
                data : Data.Plain,
                selected: null,
            },
            {
                label: 'isRequired',
                isRequired:true,
                data : Data.Plain,
                selected: null,
            },
            {
                label: 'disabled',
                disabled:true,
                data : Data.Plain,
                selected: null,
            },
            {
                label: 'error type',
                data : Data.Plain,
                selected: null,
                msg: {
                    visible: true,
                    type:'error',
                },
            },
            {
                label: 'error msg',
                data : Data.Plain,
                selected: null,
                msg: {
                    visible: true,
                    type:'error',
                    text:'error message'
                },
            },
            {
                label: 'success type',
                data : Data.Plain,
                selected: null,
                msg: {
                    visible: true,
                    type:'success',
                },
            },
            {
                label: 'success msg',
                data : Data.Plain,
                selected: null,
                msg: {
                    visible: true,
                    type:'success',
                    text:'success message'
                },
            },
            {
                label: 'large',
                data : Data.Plain,
                selected: null,
                size: 'large'
            },
            {
                label: 'small',
                data : Data.Plain,
                selected: null,
                size: 'small'
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> FormDropdown </span>
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
                                <SingleSelectDropdown
                                    label={c.label}
                                    size={c.size}
                                    withFilter={c.withFilter}
                                    withClear={c.withClear}
                                    closeOnSelect={c.closeOnSelect}
                                    isRequired={c.isRequired}
                                    disabled={c.disabled}
                                    msg={c.msg}
                                    data={c.data}
                                    selectedOptonID={c.selectedOptonID}
                                    selected={(obj) => (c.selected = obj,setRenderFlag(state => !state))}
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

export default SingleSelectDropdownView
