import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import { Data } from '../../utils/Data'
import Grid from '../../components/DataGrid/Grid'
import PropsDoc from '@/localComponents/PropsDoc.jsx'


const GridView = () => {

    const [renderFlag,setRenderFlag] = useState(false)

    const logEvent = (event) => {
        console.log('Grid Event',event)
    }

    const customColumns = useRef(
        [
            {
                columnKey: 'id',
                columnName: 'ID',
                template: null,
                orderIndex: 3,
                visible:true,
            },
            {
                columnKey: 'first_name',
                columnName: 'First Name',
                orderIndex: 1,
                visible:true,
            },
            {
                columnKey: 'last_name',
                columnName: 'Last Name',
                visible:true,

            },
            {
                columnKey: 'email',
                columnName: 'Email',
                visible:true,

            },
            {
                columnKey: 'ip_address',
                columnName: 'IP Address',
                visible:true,

            },
            {
                columnKey: 'car',
                columnName: 'Car Model',
                visible:true,

            }
        ]
    )

    const propsList =[
        {
            title: 'Props Name',
            description: 'Description',
            type: 'Type',
            example: 'Example',
            header: true
        },
        {
            title: 'data',
            description: 'Grid DataSource',
            type: 'Array',
            example: '',
        },
        {
            title: 'keyExpr',
            description: 'data key',
            type: 'String',
            example: '"id"',
        },
        {
            title: 'customColumns',
            description: 'Array of Columns',
            type: 'Array',
            example: '[ { columnKey: String, columnName: String, template : React Component(returns column data in args) } ]',
        },
        {
            title: 'withCustomStore',
            description: 'Enables Custom Store Operations',
            type: 'Boolean',
        },
        {
            title: 'storeKey',
            description: 'store key',
            type: 'String',
        },
        {
            title: 'loadFunction',
            description: 'store load function',
            type: 'function',
        },
        {
            title: 'updateFunction',
            description: 'store update function',
            type: 'function',
        },
        {
            title: 'insertFunction',
            description: 'store insert function',
            type: 'function',
        },
        {
            title: 'removeFunction',
            description: 'store remove function',
            type: 'function',
        },
        {
            title: 'withMasterDetail',
            description: 'Enabled Expandable Dropdown',
            type: 'Boolean',
        },
        {
            title: 'detailTemplate',
            description: 'MasterDetail template',
            type: 'React Component/Function',
        },
        {
            title: 'filterOptions',
            description: 'Grid Filter Options',
            type: 'Object',
            example: '{ filterRow: Boolean, headerFilter: Boolean }'
        },
        {
            title: 'searchPanel',
            description: 'Grid Global Search Panel with Highlight',
            type: 'Object',
            example: '{ visible: Boolean, width: Number, placeholder: String }'
        },
        {
            title: 'editingOptions',
            description: 'grid editingOptions',
            type: 'Object',
            example: '{ mode: String(row,batch), allowUpdating : Boolean, allowDeleting: Boolean }'
        },
        {
            title: 'scrollMode',
            description: 'grid scrollMode',
            type: 'String',
            example: 'none,infinite',
        },
        {
            title: 'pagerOptions',
            description: 'Grid Paging Options',
            type: 'Object',
            example: '{ defaultPageSize: Number, visible: Boolean, allowedPageSizes : Array of Numbers, showPageSizeSelector: Boolean, showInfo: Boolean, showNavigationButtons: Boolean}',
        },
        {
            title: 'selection',
            description: 'Grid Row Selection',
            type: 'Object',
            example: '{ mode: String(single,multiple), selectAllMode: String(allPages,page) }'
        },
        {
            propType: 'event',
            title: 'onEvent',
            description: 'returns Grid events with eventName and event arg',
            type: 'function',
            example: 'onEvent={(eventType,event) => ....}'
        },
        {
            propType: 'event',
            title: 'selectionChanged',
            description: 'returns event on row selection change',
            type: 'function',
            example: 'selectionChanged={(event) => ....}'
        },
        {
            propType: 'event',
            title: 'focusedRowChanging',
            description: 'returns event on row focused changing',
            type: 'function',
            example: 'focusedRowChanging={(event) => ....}'
        },
        {
            propType: 'event',
            title: 'focusedRowChanged',
            description: 'returns event on row focused changed',
            type: 'function',
            example: 'focusedRowChanged={(event) => ....}'
        },

    ]

    const componentTypes = useRef(
        [
            {
                title: 'Initial Default Grid',
                data: Data.Grid.slice(0,5),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
            },
            {
                title: 'With Header Filters && Row Filter && SearchPanel',
                data: Data.Grid.slice(0,5),
                filterOptions: {
                    headerFilter:true,
                    filterRow:true,
                },
                searchPanel:{
                    visible:true,
                    placeholder: 'Filter Data ... '
                },
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
            },
            {
                title: 'withMasterDetail',
                data: Data.Grid.slice(0,5),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
                withMasterDetail:true,
                detailTemplate: (data) => {
                    return (
                        <h1>{data.data.data.first_name}</h1>
                    )
                }
            },
            {
                title: 'editingOptions',
                data: Data.Grid.slice(0,5),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
                editingOptions: {
                    allowUpdating:true,
                    allowDeleting:true,
                }
            },
            {
                title: 'Batch Editing Mode',
                data: Data.Grid.slice(0,5),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
                editingOptions: {
                    allowUpdating:true,
                    allowDeleting:true,
                    mode: 'batch'
                }
            },
            {
                title: 'pagerOptions',
                data: Data.Grid.slice(0,60),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
                pagerOptions:{
                    defaultPageSize:5,
                    visible:true,
                    showPageSizeSelector: true,
                    showInfo:true,
                    showNavigationButtons: true,
                }
            },
            {
                title: 'pagerOptions',
                data: Data.Grid.slice(0,5),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
                selection:{
                    mode: 'multiple'
                }
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Function Import Name : <span> Grid </span>
                </h1>
            </div>
            <div className="docs__component_wrapper comp_grid">
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

                                <Grid
                                    customColumns={c.customColumns}
                                    data={c.data}
                                    withMasterDetail={c.withMasterDetail}
                                    filterOptions={c.filterOptions}
                                    keyExpr={'id'}
                                    withCustomStore={c.withCustomStore}
                                    detailTemplate={c.detailTemplate}
                                    editingOptions={c.editingOptions}
                                    scrollMode={c.scrollMode}
                                    pagerOptions={c.pagerOptions}
                                    selection={c.selection}
                                    searchPanel={c.searchPanel}
                                    onEvent={(event) => (logEvent(event),setRenderFlag(state => !state))}
                                >


                                </Grid>
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

export default GridView
