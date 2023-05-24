import { DataGrid } from 'devextreme-react/data-grid';

const Grid = ({
    data,
}) => {
    return (
        <div className="gridWrapper __dx-grid_component_datagrid">
            <DataGrid
                dataSource={data}
                keyExpr={'id'}
            />
        </div>
    )
}

export default Grid