import '@/views/ViewsCommon/common.scss'
import { lazy, Suspense, useRef, useState } from 'react'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import { Data } from '@/utils/Data.js'
import IconEdit from '@/assets/svgComponents/IconEdit.jsx'
import IconDelete from '@/assets/svgComponents/IconDelete.jsx'
const Grid  = lazy(() => import('@/components/DataGrid/Grid.jsx'))


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
                orderIndex: 0,
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
                orderIndex: 2,
                visible:true,

            },
            {
                columnKey: 'email',
                columnName: 'Email',
                visible:true,
                orderIndex: 3,

            },
            {
                columnKey: 'ip_address',
                columnName: 'IP Address',
                visible:true,
                orderIndex: 4,

            },
            {
                columnKey: 'car',
                columnName: 'Car Model',
                orderIndex: 5,
                visible:true,
            },
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
            example: `[ 
                {
                    columnKey:String,
                    columnName:String,
                    template:Function/React Component,
                    width:Number,
                    visible:Boolean,
                    dataType:String,
                    format:String,
                    fixed:Boolean,
                    allowFiltering:Boolean,
                    allowSorting:Boolean,
                    allowEditing: Boolean,
                    orderIndex:Number,
                    sortOrderType: 'String(asc, desc)',
                }
            ]`,
            previewType: 'Array',
        },
        {
            title: 'withColumnConfigure',
            description: 'Configre Columns order and visibility',
            type: 'Boolean',
            example: `
                requires customColumns Array of Objects to have orderIndex key type Number,and visible type Boolean
                example => {
                    columnKey: 'id',
                    columnName: 'ID',
                    orderIndex: 0,
                    visible: true,
                }
            `
        },
        {
            title: 'withDeleteAll',
            description: 'Enables Selections Delete / requires selection mode: multiple / triggers Custom event',
            type: 'Boolean',
        },
        {
            title: 'focusedRowEnabled',
            description: 'Enables Row Focus State, Default : true',
            type: 'Boolean',
        },
        {
            title: 'rowAlternationEnabled',
            description: 'Row Alternation style, Default : false',
            type: 'Boolean',
        },
        {
            title: 'columnAutoWidth',
            description: 'Default : true',
            type: 'Boolean',
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
            title: 'summary',
            description: 'Columns Summary TotalItem',
            type: 'Array',
            example: `
            For client Side (
                {
                    column: String(columnKey),
                    total: function(),
                }
            ),-----
            For Remote Operations (
                {
                    column: String(columnKey),
                    summaryType: count | sum | avg | min | max,
                }
            )
            `
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
            title: 'customActions',
            description: 'Additional Custom Editing Column',
            type: 'Array',
            example: `
                {
                    label: String(Action Label),
                    icon: React Component,
                    disabledForKeys: [Array Of Row keys],
                    style: Style Object,
                    type: String(Action Type),
                    event: (type,data) => ....},
                }
            `
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
            title: 'height',
            description: 'default Auto',
            type: 'Number',
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
            title: 'refresh',
            description: 'set refresh Boolean state to true to refresh datasource /trigger method',
            type: 'Boolean',
        },
        {
            propType: 'event',
            title: 'onRowClick',
            description: 'returns Clicked Row Data',
            type: 'function',
            example: 'onRowClick={(data) => ....}'
        },
        {
            propType: 'event',
            title: 'onEvent',
            description: 'returns Grid editing events with eventName and event arg',
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
        {
            propType: 'event',
            title: 'onColumnConfigure',
            description: 'returns sorted cols when ColumnConfigure is changed',
            type: 'function',
            example: 'onColumnConfigure={(columns) => ....}',
        },
        {
            propType: 'event',
            title: 'onDeleteAll',
            description: 'returns Selected Row Keys Array',
            type: 'function',
            example: 'onDeleteAll={(SelectedRowKeys) => ....}',
        },

    ]

    const componentTypes = useRef(
        [
            {
                title: 'Initial Default Grid',
                data: Data.Grid.slice(0,5),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
                withColumnConfigure: true,
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
                title: 'customActions',
                data: Data.Grid.slice(0,5),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
                customActions: [
                    {
                        label: 'Edit',
                        icon: IconEdit,
                        type:'edit',
                        event: (type,data) => {alert(JSON.stringify(data))}
                    },
                    {
                        label: 'Delete',
                        icon: IconDelete,
                        style: {
                            color: 'red',
                        },
                        type:'delete',
                        event: (type,data) => {alert(JSON.stringify(data))}
                    }

                ]
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
            {
                title: 'rowAlternationEnabled',
                data: Data.Grid.slice(0,5),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
                selection:{
                    mode: 'single'
                },
                rowAlternationEnabled: true,
            },
            {
                title: 'With Delete All',
                data: Data.Grid.slice(0,5),
                customColumns: JSON.parse(JSON.stringify(customColumns.current)),
                withDeleteAll: true,
                withColumnConfigure: true,
                selection:{
                    mode: 'multiple'
                }
            },
            {
                title: 'Summary Totals',
                data: Data.GridForSummary.slice(0,5),
                keyExpr: 'ID',
                customColumns: [
                    {
                        columnKey: 'OrderNumber',
                    },
                    {
                        columnKey: 'SaleAmount',
                    }
                ],
                summary: [
                    {
                        column: 'OrderNumber',
                        total: () => {
                            return `Total: 5 (Items)`
                        }
                    },
                    {
                        column: 'SaleAmount',
                        total: () => {
                            return `Total Amounts: ($${Data.GridForSummary.slice(0,5).reduce((accumulator, object) => {
                                return accumulator + object.SaleAmount
                              }, 0)})`
                        }
                    }
                ],
                selection:{
                    mode: 'single'
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

                                <Suspense fallback={<h1>Loading</h1>}>

                                <Grid
                                    customColumns={c.customColumns}
                                    data={c.data}
                                    withMasterDetail={c.withMasterDetail}
                                    filterOptions={c.filterOptions}
                                    keyExpr={c.keyExpr || 'id'}
                                    withCustomStore={c.withCustomStore}
                                    detailTemplate={c.detailTemplate}
                                    editingOptions={c.editingOptions}
                                    scrollMode={c.scrollMode}
                                    pagerOptions={c.pagerOptions}
                                    selection={c.selection}
                                    searchPanel={c.searchPanel}
                                    onEvent={(event) => (logEvent(event),setRenderFlag(state => !state))}
                                    customActions={c.customActions}
                                    withColumnConfigure={c.withColumnConfigure}
                                    summary={c.summary}
                                    withDeleteAll={c.withDeleteAll}
                                    rowAlternationEnabled={c.rowAlternationEnabled}
                                >
                                </Grid>

                                </Suspense>


                            </div>
                        )
                    })
                }

            </div>

            <div className="docs__component_static_preview_props">
                {/* <div className='CustomColumn_Object'>
                    <textarea name="" id="" cols="30" rows="10">fasfasf</textarea>
                </div> */}
                <PropsDoc propsList={propsList} />
            </div>
        </div>
    )
}

export default GridView
