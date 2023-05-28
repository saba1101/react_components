import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import MultiSelect from '../../../components/Form/Selects/MultiSelect/MultiSelect.jsx'
import PropsDoc from '@/localComponents/PropsDoc.jsx'

import {Data} from '@/utils/Data'

const MultiSelectDropdownView = () => {
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
            example: "[ { label : String, id: Number,String, children: Array ,selected: Optional(Boolean) } ]"
        },
        {
            title: 'withApply',
            description: 'adds Apply Button in collapsable dropdown',
            type: 'Boolean / Default Value is True',
        },
        {
            title: 'withSearch',
            description: 'adds search inside collapsable dropdown',
            type: 'Boolean / Default Value is True',
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
            propType: 'event',
            title: 'change',
            description: 'returns Selected Items Flat Array of Objects',
            type: 'function',
            example: "change(arr) => arr"
        },
    ]

    const componentTypes = useRef(
        [
            {
                label: 'Default Dropdown With Label',
                data : Data.Tree,
                selected: null,
            },
            {
                label: 'Default Filled With Label',
                data : Data.Tree.map(el => ({...el,selected:true})),
                selected: null,
            },
            {
                label: 'withApply',
                data : Data.Tree,
                withApply: true,
                selected: null,
            },
            {
                label: 'isRequired',
                isRequired:true,
                data : Data.Tree,
                selected: null,
            },
            {
                label: 'disabled',
                disabled:true,
                data : Data.Tree,
                selected: null,
            },
            {
                label: 'error type',
                data : Data.Tree,
                selected: null,
                msg: {
                    visible: true,
                    type:'error',
                },
            },
            {
                label: 'error msg',
                data : Data.Tree,
                selected: null,
                msg: {
                    visible: true,
                    type:'error',
                    text:'error message'
                },
            },
            {
                label: 'success type',
                data : Data.Tree,
                selected: null,
                msg: {
                    visible: true,
                    type:'success',
                },
            },
            {
                label: 'success msg',
                data : Data.Tree,
                selected: null,
                msg: {
                    visible: true,
                    type:'success',
                    text:'success message'
                },
            },
            {
                label: 'large',
                data : Data.Tree,
                selected: null,
                size: 'large'
            },
            {
                label: 'small',
                data : Data.Tree,
                selected: null,
                size: 'small'
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> FormMultiSelectDropdown </span>
                </h1>
            </div>
            <div className="docs__component_wrapper comp__dropdown">
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >
                                <MultiSelect
                                    label={c.label}
                                    size={c.size}
                                    disabled={c.disabled}
                                    isRequired={c.isRequired}
                                    msg={c.msg}
                                    data={c.data}
                                    withApply={c.withApply}
                                    withSearch={c.withSearch}
                                    change={(arr) => (c.selected = arr,setRenderFlag(state => !state))}

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

export default MultiSelectDropdownView