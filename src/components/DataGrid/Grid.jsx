import { 
  DataGrid,
  Column,
  MasterDetail,
  Paging,
  Scrolling,
  Pager,
  LoadPanel,
  Sorting,
  Editing,
  Lookup,
  FilterRow,
  HeaderFilter,
  FilterPanel,
  SearchPanel,
  Selection,
  Summary,
  TotalItem,
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
// import './Styles/Grid.scss'
// import ColumnConfigure from './components/ColumnConfigure.jsx';
import { useEffect, useRef, useState } from 'react';
import ColumnConfigure from '@/components/DataGrid/components/ColumnConfigure.jsx'
import Actions from '@/components/DataGrid/components/Actions.jsx'
import '@/components/DataGrid/Styles/Grid.theme.scss'
import '@/components/DataGrid/Styles/Grid.scss'
import DeleteAll from '@/components/DataGrid/components/DeleteAll.jsx'
const Grid = ({
    data,
    customColumns,
    summary,
    keyExpr,
    theme,
    height,
    focusedRowEnabled = true,
    rowAlternationEnabled,
    columnAutoWidth = true,
    // custom store
    withCustomStore,
    storeKey,
    loadFunction,
    updateFunction,
    insertFunction,
    removeFunction,

    withColumnConfigure,
    withDeleteAll,

    withMasterDetail,
    detailTemplate,

    editingOptions,
    scrollMode,

    pagerOptions,

    selection,

    filterOptions,

    searchPanel,

    onEvent,
    selectionChanged,
    focusedRowChanging,
    focusedRowChanged,
    onRowClick,

    refresh,
    customActions,
    onColumnConfigure,
    onDeleteAll,

    onFilterValueChange,

}) => {
    // const [columns,setColumns] = useState(customColumns)
    const [renderFlag,setRenderFlag] = useState(false)
    const columns = useRef(customColumns)
    const DataGridRef = useRef(null)
    const [ExpandedActionsKey,setExpandedActionsKey] = useState('')
    const Instance = useRef({
        Refresh: () => DataGridRef.current.instance.refresh(),
        SelectedRowKeys: () => DataGridRef.current.instance.getSelectedRowKeys()
    })
    const [DefaultActions,setDefaultActions] = useState(customActions)
    const DeleteAllRef = useRef(null)

    const ClickHandler = (event) => {
        if(customActions && customActions.length) {
            DestroyCustomActionsContainer()
            // setExpandedActionsKey('')
        }
    }

    const ScrollHandler = () => {
        if(customActions && customActions.length){
            DestroyCustomActionsContainer()
            // setExpandedActionsKey('')
        }
    }

    const DestroyCustomActionsContainer = () => {
        const actionColLists = document.querySelectorAll('.datagrid_action_data_controller > ul')
        actionColLists.forEach(element => {
            element.style.display = 'none'
            element.style.pointerEvents = 'none'
        })
    }

    const store = new CustomStore({
        key: storeKey ?? 'id',
        load : loadFunction,
        update: updateFunction,
        insert: insertFunction,
        remove: removeFunction,
    });

    const LogEvent = (event,eventType) => {
        if(onEvent && typeof onEvent === 'function'){
            onEvent(eventType,event)
        }
    }

    const onSelectionChanged = (ev) => {
        if(focusedRowEnabled && selection?.mode === 'multiple' && withDeleteAll) {
            DeleteAllRef.current.setValue(ev.selectedRowKeys.length)
        }
        if(selectionChanged && typeof selectionChanged === 'function'){
            selectionChanged(ev)
        }
    }

    const onFocusedRowChanging = (ev) => {
        if(focusedRowChanging && typeof focusedRowChanging === 'function'){
            focusedRowChanging(ev)
        }
    }

    const onFocusedRowChanged = (ev) => {
        if(focusedRowChanged && typeof focusedRowChanged === 'function'){
            focusedRowChanged(ev)
        }
    }

    const RowClick = (ev) => {
        if(onRowClick && typeof onRowClick === 'function'){
            onRowClick(ev.data)
        }
    }

    const TriggerDeleteAllSelection = () => {        
        if(onDeleteAll && typeof onDeleteAll === 'function'){
            onDeleteAll(Instance.current.SelectedRowKeys())
        }
    }

    const ExpandActionByDataKey = (data) => {
        const actionPref = 'datagrid_action_data_id'
        let currentEL = document.querySelector(`#${actionPref}_${data[keyExpr]}`)
        let allActionElements = document.querySelectorAll('.datagrid_action_data_controller > ul')
        let currentElList = currentEL.querySelector('ul')
        let Visibility_Controller = {
            display: 'block',
            pointerEvents: 'all'
        }

        allActionElements.forEach(element => {
            element.style.display = 'none'
            element.style.pointerEvents = 'none'
        })

        const Rects = currentEL.getBoundingClientRect()
        const ExpandableRects = currentElList.getBoundingClientRect()

        Visibility_Controller['top'] = `${(Rects.top + ExpandableRects.height) + 20}px`
        Visibility_Controller['left'] = `${(Rects.left - (ExpandableRects.width + 80))}px`
        
        Object.assign(currentElList.style,Visibility_Controller)
    }

    const SyncColumnWithConfigure = (cols) => {
        columns.current = cols
        setRenderFlag(state => !state)
        if(onColumnConfigure && typeof onColumnConfigure === 'function'){
            onColumnConfigure(columns.current)
        }
    }

    const onRowExpanding = (event) => {
        console.log(event.component.collapseAll(-1))
    }

    const onEditorPreparing = (e) => {
        if (e.parentType === 'filterRow') {
            e.editorElement.onchange = (event) => {
                const FilterConfig = {
                    columnKey : e.dataField,
                    columnName : e.caption,
                    filterValue : event.target.value
                }

                if(onFilterValueChange && typeof onFilterValueChange === 'function'){
                    onFilterValueChange(FilterConfig)
                }
            };
        }

    }

    useEffect(() => {
        if(refresh) {
            Instance.current.Refresh()
            console.info('DataSource Refresh.....')
        }
    },[refresh])

    useEffect(() => {
        document.addEventListener('click',ClickHandler)
        document.addEventListener('wheel',ScrollHandler)

        return () => {
            document.removeEventListener('click',ClickHandler)
            document.removeEventListener('wheel',ScrollHandler)
        }
    },[])
  return (
        <div style={{height: '100%'}} className={`gridWrapper __dx_DataGrid_Component__ light ${theme && !['dark','light'].includes(theme) ? 'light' : theme }`}>
            
                {
                    (withColumnConfigure || (withDeleteAll && selection?.mode === 'multiple')) && (
                        <div className="__dx_DataGrid_Toolbar">
                            <div className="__dx_DataGrid_Toolbar_Leftside">
                                {
                                    (withDeleteAll && selection?.mode === 'multiple') && (
                                        <DeleteAll 
                                            ref={DeleteAllRef}
                                            onDeleteAll={TriggerDeleteAllSelection}
                                        />
                                    )
                                }
                            </div>
                            <div className="__dx_DataGrid_Toolbar_Righttside">
                                {
                                    withColumnConfigure && (
                                        <div className="column_configure_wrapper">
                                            <ColumnConfigure 
                                                items={columns.current.sort((a,b) => a.orderIndex - b.orderIndex)} 
                                                change={(cols) => SyncColumnWithConfigure(cols)}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }

                <DataGrid
                    height={height ? height : '100%'}
                    ref={DataGridRef}
                    dataSource={withCustomStore ? store : data}
                    remoteOperations={true}
                    keyExpr={keyExpr ?? 'id'}
                    allowColumnReordering={false}
                    allowColumnResizing={false}
                    columnAutoWidth={columnAutoWidth}
                    showColumnLines={false}
                    showRowLines={true} 
                    rowAlternationEnabled={rowAlternationEnabled}
                    showBorders={false}
                    hoverStateEnabled={true}

                    onEditorPreparing={onEditorPreparing}

                    // //////// editing events //////////////
                    onEditingStart={(event) => LogEvent(event,'onEditingStart')}
                    onInitNewRow={(event) => LogEvent(event,'onInitNewRow')}
                    onRowInserting={(event) => LogEvent(event,'onRowInserting')}
                    onRowInserted={(event) => LogEvent(event,'onRowInserted')}
                    onRowUpdating={(event) => LogEvent(event,'onRowUpdating')}
                    onRowUpdated={(event) => LogEvent(event,'onRowUpdated')}
                    onRowRemoving={(event) => LogEvent(event,'onRowRemoving')}
                    onRowRemoved={(event) => LogEvent(event,'onRowRemoved')}
                    onSaving={(event) => LogEvent(event,'onSaving')}
                    onSaved={(event) => LogEvent(event,'onSaved')}
                    onEditCanceling={(event) => LogEvent(event,'onEditCanceling')}
                    onEditCanceled={(event) => LogEvent(event,'onEditCanceled')}

                    ///////row focus//////
                    focusedRowEnabled={focusedRowEnabled}
                    // focusedRowKey={}
                    autoNavigateToFocusedRow={false}
                    onFocusedRowChanging={onFocusedRowChanging}
                    onFocusedRowChanged={onFocusedRowChanged}
                    onRowClick={RowClick}
                    onRowExpanding={onRowExpanding}

                    // row selection
                    onSelectionChanged={onSelectionChanged}
                >

                    <Selection
                        mode={selection?.mode ?? 'single'} //multiple
                        selectAllMode={selection?.selectAllMode ?? ['allPages', 'page'][0]}
                        showCheckBoxesMode={'always'}
                    />

                    {
                        editingOptions && (
                            <Editing
                                mode={editingOptions?.mode ?? 'row'}
                                allowUpdating={editingOptions?.allowUpdating ?? false}
                                allowDeleting={editingOptions?.allowDeleting ?? false}
                                allowAdding={false} 
                            />
                        )
                        }

                    <FilterRow visible={filterOptions?.filterRow ?? false} applyFilter={'auto'} />
                    <SearchPanel visible={searchPanel?.visible ?? false} width={searchPanel?.width ?? 256 } placeholder={searchPanel?.placeholder ?? 'Search...'} />
                    <HeaderFilter allowSearch={true} visible={filterOptions?.headerFilter ?? false } />
                    {/* <FilterPanel visible={true} />  create filter logic */}

                    {
                        columns && columns.current.map((col,ind) => {
                            return (
                                <Column
                                    key={ind}
                                    dataField={col.columnKey}
                                    caption={col.columnName}
                                    alignment={col.alignment ? col.alignment :
                                        col.dataType === 'number' ? 'right' : 'left'
                                    }
                                    width={col.width}
                                    visible={col.visible}
                                    dataType={col.dataType}
                                    format={
                                        col.format === 'date' ? "M/d/yyyy, HH:mm" 
                                            : 
                                        (col.dataType === 'number' && col.fixedNumber) ? {
                                            type: "fixedPoint",
                                            precision: 2
                                        }
                                            : 
                                        col.format
                                    }
                                    fixed={col.fixed}
                                    cellRender={col.template}
                                    allowFiltering={col.allowFiltering}
                                    allowHeaderFiltering={col.allowHeaderFiltering}
                                    allowSorting={col.allowSorting}
                                    allowEditing={col.allowEditing}
                                    visibleIndex={col.orderIndex}
                                    defaultSortOrder={col.sortOrderType}
                                />
                            )
                        })
                    }

                    {
                        (summary && summary.length && !withCustomStore)  && (
                            <Summary>
                                {
                                    summary && summary.map((s,ind) => {
                                        return (
                                            <TotalItem
                                                key={ind}
                                                column={s.column}
                                                summaryType="custom"
                                                customizeText={s.total}
                                            />
                                        )
                                    })
                                }
                            </Summary>
                        )
                    }

                    {
                        (summary && summary.length && withCustomStore) && (
                            <Summary>
                                {
                                    summary.map((s,index) => {
                                        return (
                                            <TotalItem
                                                column={s.column}
                                                summaryType={s.summaryType}
                                            />
                                        )
                                    })
                                }
                            </Summary>
                        )
                    }


                    {
                        (customActions && customActions.length) && (
                            <Column
                                dataField={null}
                                caption={'Actions'}
                                alignment={'left'}
                                width={100}
                                allowFiltering={false}
                                allowSorting={false}
                                cellRender={(event) => {

                                    return (
                                        <Actions
                                            rowData={event.data}
                                            rowID={event.data[keyExpr]}
                                            actions={DefaultActions.filter(el => {
                                                if(el.disabledForKeys && el.disabledForKeys.length){
                                                    return !el.disabledForKeys.includes(event.data[keyExpr])
                                                }
                                                else return el
                                            })}
                                            onExpand={(state) => {
                                                ExpandActionByDataKey(event.data)
                                                // state ? setExpandedActionsKey(event.data[keyExpr]) : setExpandedActionsKey('')
                                            }}
                                        />
                                    )
                                }
                                }
                            />
                        )
                    }

                    {
                        withMasterDetail && (
                            <MasterDetail
                                enabled={true}
                                component={detailTemplate}
                            />
                        )
                    }
                    {/* <Scrolling rowRenderingMode='infinite'></Scrolling> */}
                    {/* <Sorting mode="asc" /> */}
                    <LoadPanel enabled={true} />
                    <Scrolling mode={scrollMode ?? 'none'} />
                    <Paging defaultPageSize={pagerOptions?.defaultPageSize} />
                    <Pager
                        visible={pagerOptions?.visible}
                        allowedPageSizes={pagerOptions?.allowedPageSizes}
                        showPageSizeSelector={pagerOptions?.showPageSizeSelector}
                        showInfo={pagerOptions?.showInfo}
                        showNavigationButtons={pagerOptions?.showNavigationButtons} 
                    />

                  
                </DataGrid>
        </div>
  )
}


export default Grid