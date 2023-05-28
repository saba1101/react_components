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

} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import './Styles/Grid.scss'
import ColumnConfigure from './components/ColumnConfigure';
import { useState } from 'react';

const Grid = ({
    data,
    customColumns,
    keyExpr,
    theme,
    height,

    // custom store
    withCustomStore,
    storeKey,
    loadFunction,
    updateFunction,
    insertFunction,
    removeFunction,

    withColumnConfigure,

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
    focusedRowChanged
}) => {

    const [columns,setColumns] = useState(customColumns)

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

    return (
        <div className={`gridWrapper __dx_DataGrid_Component__ light ${theme && !['dark','light'].includes(theme) ? 'light' : theme }`}>
                {
                    withColumnConfigure && (
                        <div className="column_configure_wrapper">
                            <ColumnConfigure 
                                items={columns} 
                                change={(cols) => setColumns(cols)}
                            />
                        </div>
                    )
                }

                <DataGrid
                    style={
                        {
                            height: `${height ? height : 'auto'}`
                        }
                    }
                    dataSource={withCustomStore ? store : data}
                    keyExpr={keyExpr ?? 'id'}
                    allowColumnReordering={false}
                    allowColumnResizing={true}
                    columnAutoWidth={true}
                    showColumnLines={false}
                    showRowLines={false} 
                    rowAlternationEnabled={false}
                    showBorders={false}
                    hoverStateEnabled={true}

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
                    focusedRowEnabled={true}
                    // focusedRowKey={}
                    autoNavigateToFocusedRow={false}
                    onFocusedRowChanging={onFocusedRowChanging}
                    onFocusedRowChanged={onFocusedRowChanged}


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
                        columns.map((col,ind) => {
                            return (
                                <Column
                                    key={ind}
                                    dataField={col.columnKey}
                                    caption={col.columnName}
                                    alignment={'left'}
                                    width={col.width}
                                    visible={col.visible}
                                    dataType={col.dataType}
                                    format={col.format || (
                                        col.format === 'date' ? "M/d/yyyy, HH:mm" : col.format
                                    )}
                                    fixed={col.fixed}
                                    cellRender={col.template}
                                    allowFiltering={col.allowFiltering}
                                    allowSorting={col.allowSorting}
                                    visibleIndex={col.orderIndex}
                                />
                            )
                        })
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
                    <Paging defaultPageSize={pagerOptions?.defaultPageSize ?? 20} />
                    <Pager
                        visible={pagerOptions?.visible ?? false}
                        allowedPageSizes={pagerOptions?.allowedPageSizes ?? [5,10,20,40,60,'all']}
                        showPageSizeSelector={pagerOptions?.showPageSizeSelector ?? false}
                        showInfo={pagerOptions?.showInfo ?? false}
                        showNavigationButtons={pagerOptions?.showNavigationButtons ?? false} 
                    />

                    
                </DataGrid>
        </div>
    )
}


export default Grid