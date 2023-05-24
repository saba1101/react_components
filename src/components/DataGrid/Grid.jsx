import { DataGrid,Column } from 'devextreme-react/data-grid';
import './Styles/Grid.scss'
const Grid = ({
    data,
    customColumns
}) => {


    return (
        <div className="gridWrapper __dx_DataGrid_Component__">
            <DataGrid
                dataSource={data}
                keyExpr={'id'}
            >
                <Column 
                    dataField={"id"}
                    caption={'ID'}
                />
                
            </DataGrid>
        </div>
    )
}


export default Grid