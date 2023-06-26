import style from '@/components/DataGrid/components/DeleteAll.module.scss'
import IconDelete from '@/assets/svgComponents/IconDelete.jsx'
import { forwardRef,useState } from 'react'
import { useImperativeHandle } from 'react'
const DeleteAll = forwardRef((props,ref) => {
    const [Length,setLength] = useState(0)
    const setValue = (len) => {
        setLength(len);
    };

    useImperativeHandle(ref,() => ({
        setValue,
    }))

    const click = () => {
        if(props.onDeleteAll && typeof props.onDeleteAll === 'function'){
            props.onDeleteAll()
        }
    }

    return (
        <div ref={ref} className={`${style.datagridDeleteAllAction} ${style.deleteAllWrapper}`}>
            <div className={style.iconContainer} onClick={click}>
                <IconDelete />
            </div>
            <div className={style.deleteItemsCountLabel}>
                <span>
                    Delete {Length}  Checked Item
                </span>
            </div>
        </div>
    )
})

export default DeleteAll