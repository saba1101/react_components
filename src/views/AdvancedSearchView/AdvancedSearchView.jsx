import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import AdvancedSearch from '@/components/AdvancedSearch/AdvancedSearch.jsx'
import { Data } from '../../utils/Data'
const AdvancedSearchView = () => {

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
            type: 'String',
        },
        {
            title: 'value',
            type: 'String',
        },
        {
            title: 'mode',
            description: 'Search Modes',
            type: 'String/Array',
            example: 'If using single mode pass string mode example: "configure", if using pair of modes pass as an array of strings ["default","configure"]',
        },
        {
            title: 'multiChoice',
            description: 'When using configure mode pass multiChoice to select multiple options',
            type: 'Boolean',
        },
        {
            title: 'configureData',
            description: 'When using configure mode pass configureData',
            type: 'Array',
            example: `
                [{
                    label : 'Filter Label'
                    parameter: 'filterParamkey',
                }]
            `
        },
        {
            title: 'categories',
            description: 'When using category mode pass categories data',
            type: 'Array',
            example: `
                [{
                    label : 'Category Label'
                    icon: Function/Components,
                    id: 1,
                }]
            `
        },
        {
            title: 'selectedCategoryId',
            type: 'Number/String',
        },
        {
            title: 'categoryLabel',
            description: 'category Dropdown main label',
            type: 'Boolean',
        },
        {
            propType: 'event',
            title: 'onChange',
            description: 'return value',
            type: 'Function',
        },
        {
            propType: 'event',
            title: 'onCategoryChange',
            description: 'return selected Category',
            type: 'Function',
        },
    ]

    const componentTypes = useRef(
        [
            {
                placeholder: 'Default Search ',
                configureData: Data.AdvancedSearch.Plain,
                mode: 'default',
                value: '',
                multiChoice: false,
                categories: Data.AdvancedSearch.Plain,
                selectedCategoryId: 0,
            },
            {
                placeholder: 'Configure Filters',
                configureData: Data.AdvancedSearch.Plain,
                mode: ['default','configure'],
                value: '',
                multiChoice: true,
            },
            {
                placeholder: 'Configure Grouped Filters',
                configureData: Data.AdvancedSearch.Group,
                mode: ['default','configure'],
                value: '',
                multiChoice: true,
            },
            {
                placeholder: 'Configure Grouped Filters',
                categories: Data.AdvancedSearch.Plain,
                mode: 'category',
                value: '',
                categoryLabel: 'All Categories'
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span>AdvancedSearch</span>
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
                                <AdvancedSearch
                                    mode={c.mode}
                                    placeholder={c.placeholder}
                                    configureData={c.configureData}
                                    value={c.value}
                                    onChange={(param) => {
                                        c.value = param
                                        setRenderFlag(state => !state)
                                    }}
                                    multiChoice={c.multiChoice}
                                    categories={c.categories}
                                    selectedCategoryId={c.selectedCategoryId}
                                    onCategoryChange={(category) => {
                                        c.selectedCategoryId = category.id
                                        setRenderFlag(state => !state)
                                    }}
                                    categoryLabel={c.categoryLabel}
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

export default AdvancedSearchView
