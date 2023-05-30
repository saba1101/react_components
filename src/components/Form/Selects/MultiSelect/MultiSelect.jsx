import { useEffect, useRef, useState } from 'react'
import TreeNodeDropdown from '../../../Reusable/Tree/TreeNode'
import style from './MultiSelect.module.scss'
import { _getSize } from '../../../../utils/Helpers'
import IconArrow from '@/assets/icons/svg/arrow.svg'
import Search from '../../../Search/Search'

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
    }
) => {
    const MultiselectRef = useRef(null)
    const CollapsableRef = useRef(null)
    const [Focused,setFocused] = useState(false)
    const [TagsOverflowed,setTagsOverflowed] = useState(false)
    const [SearchValue,setSearchValue] = useState('')
    const VisibleTagsCount = 3

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

      const SyncChange = (arr) => {
        if(change && typeof change === 'function'){
            change(RemoveDuplicates(arr))
            setSelectedNodesArr(RemoveDuplicates(arr))
        }
      }
    
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
                    <img src={IconArrow} alt="" />
                </div>
                {
                    SelectedNodesArr && (
                        <div className={style.selectedTagsList}>
                            {SelectedNodesArr.map((tag,ind) => {
                                return(
                                    <div 
                                        className={`
                                            ${style.singleTag}
                                            ${ind >= VisibleTagsCount ? style.hidden : ''}
                                        `}
                                        key={ind}
                                    >
                                        <span>
                                            {tag.label ?? '-'}
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