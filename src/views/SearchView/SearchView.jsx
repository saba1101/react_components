import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import Search from '../../components/Search/Search'
import PropsDoc from '@/localComponents/PropsDoc.jsx'

const SearchView = () => {

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
            title: 'placeholder',
            description: 'search input placeholder',
            type: 'String',
        },
        {
            title: 'value',
            description: 'search input value',
            type: 'String',
        },
        {
            title: 'size',
            description: 'search height size',
            type: 'String',
            example: 'small,medium,large'
        },
        {
            title: 'withSuggestions',
            description: 'state that defines if suggestions must be shown',
            type: 'Boolean',
        },
        {
            title: 'suggestions',
            description: 'Array Of Suggested Words',
            type: 'Array',
            example: '["Suggested Word","Suggested Word 2","Suggested Word3", ...etc]'
        },
        {
            propType: 'event',
            title: 'change',
            description: 'returns search value',
            type: 'function',
            example: "change(value) => setValue(value)"
        },
    ]

    const componentTypes = useRef(
        [
            {
                placeholder: 'Initial Search',
                value: '',
            },
            {
                placeholder: 'Initial Filled',
                value: 'Search Value..',
            },
            {
                placeholder: 'Start Typing c ',
                value: '',
                withSuggestions: true,
                suggestions: ['component','array','component2','component3','react','vue']
            },
            {
                placeholder: 'Size large',
                value: '',
                size: 'large'
            },
            {
                placeholder: 'Size small',
                value: '',
                size: 'small'
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> Search </span>
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
                                {
                                    c.title && (
                                        <h5>
                                            {c.title}
                                        </h5>
                                    )
                                }

                                <Search 
                                    value={c.value}
                                    size={c.size}
                                    withSuggestions={c.withSuggestions}
                                    suggestions={c.suggestions}
                                    placeholder={c.placeholder}
                                    change={(value) => (c.value = value,setRenderFlag(state => !state))}
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

export default SearchView
