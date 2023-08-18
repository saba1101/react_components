import { useEffect, useRef, useState } from 'react'
// import IconArrow from '@/assets/icons/svg/arrow.svg'
// import IconRemove from '@/assets/icons/svg/close-circle.svg'
import Arrow from '@/assets/svgComponents/Arrow.jsx'
import CloseCircle from '@/assets/svgComponents/CloseCircle.jsx'
import style from '@/components/Form/Selects/SingleSelect/SingleSelectDropdown.module.scss'
import Search from '@/components/Search/Search.jsx'
import {_getSize} from '@/utils/Helpers.js'


const SingleSelectDropdown = ({
    label,
    size,
    withFilter,
    withClear,
    withDropdownSearch,
    fixedDropdown,
    closeOnSelect = true,
    isRequired,
    disabled,
    msg,
    data,
    selectedOptionID,
    selected,
}) => {

    useEffect(() => {
        document.addEventListener('click',ClickHandler)
        // document.addEventListener("wheel",ScrollHandler);
        return () => {
            document.removeEventListener('click',ClickHandler)
            // document.removeEventListener("wheel",ScrollHandler);
        }
    },[])

    const [Value,setValue] = useState('')
    const [DropdownSearchValue,SetDropdownSearchValue] = useState('')
    // const [SelectedObj,setSelectedObj] = useState({})
    let SelectedObj = useRef({})
    const [Collapsed,setCollapsed] = useState(false)
    const [FocusStates,setFocusStates] = useState({
        focusedIn: false,
        focusedOut: true,
    })
    const ComponentRef = useRef(null)
    const InputRef = useRef(null)
    const CollapsableRef = useRef(null)
    const FixedPosition = useRef(
        {
            top: 0,
            left: 0,
        }
    )
    const ClickHandler = (event) => {
        if(event.composedPath().includes(ComponentRef.current)) return
        Blur()
        setCollapsed(state => false)
    }

    // const ScrollHandler = (event) => {
    //     Blur()
    //     setCollapsed(state => false)
    //     CalculatePos()
    // }
    

    const Focus = () => {
        InputRef.current.focus()
        setFocusStates(prev => ({focusedIn : true, focusedOut : false}))
        setCollapsed(state => true)
        CalculatePos()
    }
    const Blur = () => {
        setFocusStates(prev => ({focusedIn : false, focusedOut : true}))
        // setCollapsed(state => false)
    }

    const onChange = (value) => {
        setValue(value)
    }

    const SetFilteredOptiopClassState = (searchString) => {
        let visible = true
        let SearchValue = withFilter ? Value : DropdownSearchValue
        if(withFilter || withDropdownSearch){
            if(
                !searchString.toLowerCase().split(' ').join('').trim()
                    .includes(SearchValue.toLowerCase().split(' ').join('').trim())
                    &&
                SearchValue.trim() !== ''
            ){
                visible = false
            }
        }

        return visible ? 'visible' : 'hidden'
    }

    const SetPreSelectedObj = () => {
        if(selectedOptionID || selectedOptionID === 0) {
            let target_obj = data.filter(el => Number(el.id) === Number(selectedOptionID))
            console.log(target_obj)
            if(target_obj && target_obj[0]){
                SelectedObj.current = target_obj[0]
                SelectOption(target_obj[0])
            }
        }
    }

    
    useEffect(() => {
        SetPreSelectedObj()
    },[selectedOptionID])

    const SelectOption = (obj,triggerClose) => {
        // setSelectedObj(obj)
        SelectedObj.current = obj
        setValue(obj.label)

        if(triggerClose){
            setCollapsed(state => false)
        }

        if(selected) selected(SelectedObj.current)
        if(withDropdownSearch && DropdownSearchValue) SetDropdownSearchValue('')
    }

    const clearSelection = () => {
        SelectedObj.current = {}
        setValue('')
        selected({})
    }

    const CalculatePos = () => {
        const componentRect = ComponentRef.current.getBoundingClientRect()
        const gap = 6
        FixedPosition.current.width = componentRect.width
        FixedPosition.current.left = componentRect.left
        FixedPosition.current.top = (componentRect.top + componentRect.height + gap)
    }

    useEffect(() => {
        CalculatePos()
    },[ComponentRef])

    const CollapsableDropdown = () => {
        return (
            <div style={fixedDropdown ? {
                width: FixedPosition.current.width,
                top: FixedPosition.current.top,
                left: FixedPosition.current.left,
                position: 'fixed',
                zIndex: '150',
            } : {}} className={style.collapsableOptions} ref={CollapsableRef}>
                <ul>
                    {
                        withDropdownSearch && (
                            <li className={style.searchBar}>
                                <Search 
                                    value={DropdownSearchValue}
                                    change={(value) => SetDropdownSearchValue(value)}
                                    placeholder={'Search...'}
                                    withSuggestions={false}
                                    size={'small'}
                                />
                            </li>
                        )
                    }
                    {
                        data ?
                            data.map((item,index) => 
                                {
                                    return (
                                        <li
                                            onClick={() => SelectOption(item,closeOnSelect ?? false)}
                                            className={`
                                                ${SelectedObj.current?.id && SelectedObj.current?.id === item.id ? style.selected : '' }
                                                ${withFilter || withDropdownSearch ? style[SetFilteredOptiopClassState(item.label)] : ''}
                                            `} 
                                            key={index}
                                        >
                                            <span className={style.optionLabel}>
                                                {item.label}
                                            </span>
                                        </li>
                                    )
                                }
                            )
                        : ''
                    }
                </ul>
            </div>
        )
    }

    return (
        <>
            <div
                ref={ComponentRef}
                className={`
                    ${style.selectWrapper}
                    ${style[_getSize(size)]}
                    ${FocusStates.focusedIn || Value ? style.focused : ''}
                    ${!FocusStates.focusedIn && Value ? style.focusedAndFilled : ''}
                    ${disabled ? style.disabled : ''}
                    ${
                        (msg?.type && msg?.visible) ? style[msg?.type] : ''
                    }
                `}

            >
                <div className={style.selectContainer}>
                    <div className={style.selectLabel} onClick={Focus}>
                        <span> { label ?? 'Label'} </span>
                        {
                            isRequired ? (
                                    <span className={style.requiredMark}>
                                        *
                                    </span>
                                )
                            : ''
                        }
                    </div>
                    <div className={style.selectedOption}>
                        <input 
                            type="text" 
                            value={Value} 
                            required={isRequired} 
                            disabled={disabled} 
                            readOnly={!withFilter}
                            onFocus={Focus}
                            onBlur={Blur}
                            ref={InputRef}
                            onChange={(event) => onChange(event.target.value)}
                        />
                    </div>
                    
                    {
                        (withClear && Value) ? (
                            <div className={style.clearAction} onClick={clearSelection}>
                                <CloseCircle/>
                                {/* <img src={IconRemove} alt="" /> */}
                            </div>
                        )
                        : ''
                    }

                    <div className={style.collapseAction} onClick={Focus}>
                        <Arrow />
                        {/* <img src={IconArrow} alt="arrow" /> */}
                    </div>
                </div>
                {
                    Collapsed && data  ? CollapsableDropdown() : ''
                }
                

            </div>
            {
                msg?.type && msg?.visible && msg?.text 
                ?   (
                        <div className={`${style.msgText} ${
                            (msg?.type && msg?.visible) ? style[msg?.type] : ''
                        }`}>
                            <p>{msg.text}</p>
                        </div>
                    )
                : ''
            }
        </>
    )
}

export default SingleSelectDropdown