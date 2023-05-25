import { useEffect, useRef, useState } from 'react'
import TreeNodeDropdown from '../../../Reusable/Tree/TreeNode'
import style from './MultiSelect.module.scss'
import { _getSize } from '../../../../utils/Helpers'
import IconArrow from '@/assets/icons/svg/arrow.svg'

const MultiSelect = (
    {
        label,
        size,
        disabled,
        data,
        change,
    }
) => {
    const MultiselectRef = useRef(null)
    const CollapsableRef = useRef(null)
    const [Focused,setFocused] = useState(false)
    const [TagsOverflowed,setTagsOverflowed] = useState(false)
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
    return (
        <div 
            ref={MultiselectRef} 
            className={`
                ${style.multiselectWrapper}
                ${style[_getSize(size)]}
                ${Focused || SelectedNodesArr.length ? style.focused : ''}
            `}
        >
            <div className={style.selectedTags} onClick={ToggleFocus}>
                <div className={style.selectLabel}>
                    <span>
                        { label ?? 'Label' }
                    </span>
                </div>
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

            </div>
            <div 
                ref={CollapsableRef} 
                className={`
                    ${style.collapsableOptions}
                    ${Focused ? style.expanded : ''}
                `}
            >
                <TreeNodeDropdown 
                    data={data ?? []}
                    onSelectionChange={(arr) => (change(arr),setSelectedNodesArr(arr))}
                />
            </div>  
        </div>
    )
}

export default MultiSelect