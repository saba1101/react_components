import style from '@/components/Cards/SingleCard/Card.module.scss'
import Toggle from '@/components/Form/FormControls/Toggle/Toggle.jsx'
import DropdownAction from '@/components/Cards/components/DropdownActions/DropdownAction.jsx'
import RawSvgRenderer from '../components/RawSvgRenderer.jsx'
import { useEffect, useRef } from 'react'

const Card = ({
    mode = 'multipleItems',
    id,
    title,
    subTitle,
    description,
    items,
    itemsCount,
    item,
    children,
    actions,
    onExpand,
    actionsVisible,
    onToggleChange,
    onClick,
    onOutsideClick,
    onDelete,
    onEdit,
    alignActions,
    itemsTextEllipsis = true,
    VisibleItemsCount = 2,
    color,
}) => { 
    const componentRef = useRef(null)

    const MODES = {
        DEFAULT: 'multipleItems',
        MULTIPLE: 'singleItem',
        CUSTOM_TEMPLATE: 'customTemplate'
    }

    const DefaultActions = useRef(
        [
            {
                label: 'Edit',
                type: 'edit',
                event: (type,data) => {
                    if(onEdit && typeof onEdit === 'function') onEdit(type,data)
                },
            },
            {
                label: 'Delete',
                type: 'delete',
                event: (type,data) => {
                    if(onDelete && typeof onDelete === 'function') onDelete(type,data)
                },
            }
        ]
    )

    const onActionsExpand = (state) => {
        if(onExpand && typeof onExpand === 'function'){
            onExpand(state)
        }
    }


    const ToggleChange = (state) => {
        if(onToggleChange && typeof onToggleChange === 'function'){
            onToggleChange(state)
        }
    }

    // const clickHandler = (event) => {
    //     if(event.composedPath().includes(componentRef.current))  return
    //     if(onOutsideClick && typeof onOutsideClick === 'function') onOutsideClick(false)
    // }

    // useEffect(() => {
    //     document.addEventListener('click',clickHandler)

    //     return () => {
    //         document.removeEventListener('click',clickHandler)
    //     }
    // })

    return (
        <div
            style={
                {
                    borderTop: color ? `solid 0.375rem ${color}` : ''
                }
            } 
            className={
                `
                    ${style.cardsGridWrapper}
                `
        }
            ref={componentRef}
        >

            <DropdownAction
                visible={actionsVisible}
                actions={actions && actions.length ? actions : DefaultActions.current}
                onExpand={(state) => onActionsExpand(state)}
                itemID={id}
                align={alignActions}
            />

            <div className={style.cardContent} onClick={() => {
                if(onClick && typeof onClick === 'function'){
                    onClick(id ? id : null)
                }
            }}>

                <div className={style.cardTopContent}>
                    <div className={style.cardLabel}>
                        <h1>
                            {title ? title : ''}
                        </h1>
                    </div>

                    {
                        subTitle && (
                            <div className={style.subLabel}>
                                <h4>
                                    {subTitle ? subTitle : ''}
                                </h4>
                            </div>
                        )
                    }
                </div>

                <div className={style.cardMiddleContent}>
                    <div className={style.cardDescription}>
                        <p>
                            {description ? description : ''}
                        </p>
                    </div>
                </div>

                <div className={style.cardBottomContent}>
                    {
                        (mode && mode === MODES.DEFAULT) && (
                            <div className={
                                `
                                    ${style.contentsModeDefault}
                                    ${itemsTextEllipsis ? style.ellipsis : ''}
                                `
                            }>
                                <ul>
                                    {items && items.map((item,index) => {
                                        return (
                                            index < VisibleItemsCount ? (
                                                <li key={index}>
                                                    <span>
                                                        {item}
                                                    </span>
                                                </li>
                                            ) : ''
                                        )
                                    })}
                                </ul>
                                <div className={style.cardItemsCount}>
                                    <span>
                                        {
                                            itemsCount ? `+${itemsCount}` : ''
                                        }
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    {
                        (mode && mode === MODES.CUSTOM_TEMPLATE) && (
                            children && children
                        )
                    }
                    {
                        (mode && mode === MODES.MULTIPLE) && (
                            <div className={style.contentsModeActions}>
                                <div className={style.iconAndLabel}>
                                    <div className={style.icon}>
                                        {
                                            item && item.icon && !item.rawSvg ? item.icon() : 
                                            item.rawSvg ? <RawSvgRenderer width={item.iconWidth} svg={item.icon} />  : ''
                                        }
                                    </div>
                                    <div className={style.label}>
                                        <span>
                                            {
                                                item ? item?.label : ''
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className={style.action}>
                                    <Toggle
                                        checked={item.selected}
                                        change={(state) => ToggleChange(state)}
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Card