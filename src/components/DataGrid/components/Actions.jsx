import style from '@/components/DataGrid/components/Actions.module.scss'
import { useEffect, useRef, useState } from 'react'
import IconDelete from '@/assets/svgComponents/IconDelete.jsx'
import IconEdit from '@/assets/svgComponents/IconEdit.jsx'

const Actions = ({
    actions,
    onExpand,
    rowID,
    visible,
    rowData,
}) => {
    const ActionButtonRef = useRef(null)
    const ExpandableRef = useRef(null)
    const CalculatedPos = useRef(
        {
            top: 0,
            left: 0
        }
    )

    const ToggleExpand = (event) => {
        if(onExpand && typeof onExpand === 'function') {
            onExpand(!visible)
            CalculateFixedPos()
        }
    }

    const CalculateFixedPos = () => {
        const Rects = ActionButtonRef.current.getBoundingClientRect()
        const ExpandableRects = ExpandableRef.current.getBoundingClientRect()
        CalculatedPos.current.top = (Rects.top + ExpandableRects.height) + 20
        CalculatedPos.current.left = (Rects.left - (ExpandableRects.width / 1.5))
    }

    const ActionClick = (event,action) => {
        if(action.event && typeof action.event === 'function'){
            action.event(action.type,rowData)
        }
    }

    const _getDefaultActionIcon = (action) => {
        let icon
        const defaultActionTypes = ['delete','edit']
        if(action.type && defaultActionTypes.includes(action.type)){
            switch(String(action.type)){
                case 'delete':{
                    icon = <IconDelete/>
                    break
                }
                case 'edit':{
                    icon = <IconEdit/>
                    break
                }
            }
        }else icon = 'no_icon'

        return icon
    }

    return (
        <div id={`datagrid_action_data_id_${rowID}`} className={`${style.actionsWrapper} datagrid_action_data_controller`} onClick={(e) => e.stopPropagation()}>
            <div className={style.moreActionsButton} onClick={(e) => ToggleExpand(e)} ref={ActionButtonRef}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul ref={ExpandableRef}>
            {/* style={{left: CalculatedPos.current.left,top: CalculatedPos.current.top}} */}
                {
                    (actions) && actions.map((action,ind) => {
                        return (
                            <li
                                key={ind}
                                onClick={(e) => ActionClick(e,action)}
                            >
                                <div className={
                                    `
                                        ${['delete'].includes(action.type) ? style.staticColor : ''}
                                        ${style.actionIcon}
                                        ${_getDefaultActionIcon(action) && _getDefaultActionIcon(action) !== 'no_icon' ? style.defaultIcons : ''}
                                    `
                                }>
                                    {
                                        _getDefaultActionIcon(action) && _getDefaultActionIcon(action) !== 'no_icon' ? _getDefaultActionIcon(action) : action?.icon()
                                    }
                                </div>
                                <div className={style.actionLabel}>                                    
                                    <span style={{...action?.style}} >{ action?.label }</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )    
}

export default Actions