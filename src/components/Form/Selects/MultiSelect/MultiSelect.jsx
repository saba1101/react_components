import { useEffect, useRef, useState } from 'react'
// import IconArrow from '@/assets/svgComponents/Arrow.jsx'
import Arrow from '@/assets/svgComponents/Arrow.jsx'
import TreeNodeDropdown from '@/components/Reusable/Tree/TreeNode.jsx'
import style from '@/components/Form/Selects/MultiSelect/MultiSelect.module.scss'
import {_getSize} from '@/utils/Helpers.js'
import Search from '@/components/Search/Search.jsx'

const MultiSelect = (
    {
        label,
        size,
        disabled,
        isRequired,
        msg,
        data,
        change,
        withApply,
        withSearch = true,
        fixedDropdown,
        onItemClick,
    }
) => {
    const MultiselectRef = useRef(null)
    const CollapsableRef = useRef(null)
    const [Focused,setFocused] = useState(false)
    const [TagsOverflowed,setTagsOverflowed] = useState(false)
    const [SearchValue,setSearchValue] = useState('')
    const VisibleTagsCount = 3
    const FixedPosition = useRef(
        {
            top: 0,
            left: 0,
        }
    )

    const [SelectedNodesArr,setSelectedNodesArr] = useState([])
    
    useEffect(() => {
        document.addEventListener('click',ClickHandler)

        return () => {
            document.removeEventListener('click',ClickHandler)
        }
    },[])

    useEffect(() => {
        if(SelectedNodesArr.length >= VisibleTagsCount) setTagsOverflowed(true)
        else setTagsOverflowed(false)
    },[SelectedNodesArr])
    
    const ClickHandler = (event) => {
        if(event.composedPath().includes(MultiselectRef.current)) return
        setFocused(false)
    }

    const ToggleFocus = () => {
        setFocused(state => !state)
        CalculatePos()
    }

    const CloseCollapsable = () => {
        setFocused(false)
    }

    const RemoveDuplicates = (arr) => {
        const uniqueArray = arr.filter(
          (object, index, self) =>
            index ===
            self.findIndex(
              (obj) =>
                obj.itemNodeID === object.itemNodeID
            )
        );
        return uniqueArray
      };

      const RemoveUncontrolledTriggers = (arr) => {
        return arr.filter(el => el.selected)
      }

      const SyncChange = (arr) => {
        if(change && typeof change === 'function'){
            change(RemoveDuplicates(arr))
            setSelectedNodesArr(RemoveDuplicates(arr))
        }
      }

    const CalculatePos = () => {
        const componentRect = MultiselectRef.current.getBoundingClientRect()
        const gap = 6
        FixedPosition.current.width = componentRect.width
        FixedPosition.current.left = componentRect.left
        FixedPosition.current.top = (componentRect.top + componentRect.height + gap)
    }

    useEffect(() => {
        CalculatePos()
    },[MultiselectRef])
    
    return (
        <div 
            ref={MultiselectRef} 
            className={`
                ${style.multiselectWrapper}
                ${style[_getSize(size)]}
                ${Focused || SelectedNodesArr.length ? style.focused : ''}
                ${!Focused && SelectedNodesArr.length ? style.unfocused : ''}
                ${disabled ? style.disabled : ''}
                ${msg?.type && msg?.visible ? style[msg.type] : ''}
            `}
        >
            <div className={style.selectedTags} onClick={ToggleFocus}>
                <div className={style.selectLabel}>
                    <span>
                        { label ?? 'Label' }
                    </span>
                </div>
                <input type="text" value={JSON.stringify(SelectedNodesArr)} hidden required={isRequired} readOnly/>
                <div 
                    className={`
                        ${style.selectArrow}
                        ${Focused ? style.expanded : ''}
                    `}
                >
                    <Arrow/>
                </div>
                {
                    SelectedNodesArr && (
                        <div className={style.selectedTagsList}>
                            {SelectedNodesArr.filter(el => el.selected).map((tag,ind) => {
                                return(
                                    <div 
                                        className={`
                                            ${style.singleTag}
                                            ${ind >= VisibleTagsCount ? style.hidden : ''}
                                        `}
                                        key={ind}
                                    >
                                        <span>
                                            {tag?.label}
                                        </span>
                                    </div>

                                )}
                            )}
                            <div className={`
                                ${style.tagsCount}
                                ${TagsOverflowed && (SelectedNodesArr.length - VisibleTagsCount) !== 0 ? style.visible : ''}
                            `}>
                                <span>
                                    {
                                        `+(${(SelectedNodesArr.length - VisibleTagsCount)})`
                                    }
                                </span>
                            </div>
                        </div>
                    )
                }
                <div 
                    ref={CollapsableRef}
                    className={`
                        ${style.collapsableOptions}
                        ${Focused ? style.expanded : ''}
                    `}
                    style={fixedDropdown ? {
                        width: FixedPosition.current.width,
                        top: FixedPosition.current.top,
                        left: FixedPosition.current.left,
                        position: 'fixed',
                        zIndex: '150',
                    } : {}}
                    onClick={(ev) => ev.stopPropagation()}
                >
                    {
                        withSearch && (
                            <div className={style.searchWrapper}>
                                <Search 
                                    value={SearchValue}
                                    change={(value) => setSearchValue(value)}
                                    placeholder={'search....'}
                                    size={'small'}
                                />
                            </div>
                        )
                    }
                    <div className={style.treeWrapper}>
                        <TreeNodeDropdown 
                            data={data ?? []}
                            onSelectionChange={(arr) => SyncChange(arr)}
                            SearchValue={SearchValue}
                            WithApply={withApply ?? true}
                            Apply={() => CloseCollapsable()}
                            WithBottomAction={true}
                            WithMaxHeight={true}
                            onItemClick={onItemClick}
                        />
                    </div>
                </div>
            </div>
            {
                    msg?.type && msg?.visible && msg?.text 
                        ?   (
                            <div className={style.msgText}>
                                <p>{msg.text}</p>
                            </div>
                        )
                : ''
            }
        </div>
    )
}

export default MultiSelect