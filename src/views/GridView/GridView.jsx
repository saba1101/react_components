import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import { Data } from '../../utils/Data'
import Grid from '../../components/DataGrid/Grid'

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
            },
            {
                columnKey: 'first_name',
                columnName: 'First Name',
            },
            {
                columnKey: 'last_name',
                columnName: 'Last Name',
            },
            {
                columnKey: 'email',
                columnName: 'Email',
            },
            {
                columnKey: 'ip_address',
                columnName: 'IP Address',
            },
            {
                columnKey: 'car',
                columnName: 'Car Model',
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

export default GridView
