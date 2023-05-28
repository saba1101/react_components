import ColumnConfigure from "../../components/DataGrid/components/ColumnConfigure"

const Guide = () => {
    const items = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
        { id: '3', label: 'Item 3' },
      ];
    return(
        <div>
            <ColumnConfigure items={items} />
      </div>
    )
}

export default Guide