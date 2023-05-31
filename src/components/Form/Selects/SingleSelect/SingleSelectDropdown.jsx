import { useEffect, useRef, useState } from 'react'
import IconArrow from '@/assets/icons/svg/arrow.svg'
import IconRemove from '@/assets/icons/svg/close-circle.svg'
import style from '@/components/Form/Selects/SingleSelect/SingleSelectDropdown.module.scss'

const SingleSelectDropdown = ({
    label,
    size,
    withFilter,
    withClear,
    closeOnSelect,
    isRequired,
    disabled,
    msg,
    data,
    selectedOptonID,
    selected,
}) => {

    useEffect(() => {
        document.addEventListener('click',ClickHandler)
        return () => {
            document.removeEventListener('click',ClickHandler)
        }
    },[])

    useEffect(() => {
        SetPreSelectedObj()
    },[selectedOptonID])

    const [Value,setValue] = useState('')
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

    const ClickHandler = (event) => {
        if(event.composedPath().includes(ComponentRef.current)) return
        Blur()
        setCollapsed(state => false)
    }

    const _getSize = () => {
        if(size && !['small','medium','large'].includes(size)) return 'medium'
        else return size ? size : 'medium'
    }

    const Focus = () => {
        InputRef.current.focus()
        setFocusStates(prev => ({focusedIn : true, focusedOut : false}))
        setCollapsed(state => true)
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
        if(withFilter){
            if(
                !searchString.toLowerCase().split(' ').join('').trim()
                    .includes(Value.toLowerCase().split(' ').join('').trim())
                    &&
                Value.trim() !== ''
            ){
                visible = false
            }
        }

        return visible ? 'visible' : 'hidden'
    }

    const SetPreSelectedObj = () => {
        if(selectedOptonID) {
            let target_obj = data.filter(el => el.id === selectedOptonID)
            if(target_obj && target_obj[0]){
                SelectedObj.current = target_obj[0]
                SelectOption(target_obj[0])
            }
        }
    }

    const SelectOption = (obj,triggerClose) => {
        // setSelectedObj(obj)
        SelectedObj.current = obj
        setValue(obj.label)

        if(triggerClose){
            setCollapsed(state => false)
        } 

        if(selected) selected(SelectedObj.current)
    }

    const clearSelection = () => {
        SelectedObj.current = {}
        setValue('')
        selected({})
    }

    const CollapsableDropdown = () => {
        return (
            <div className={style.collapsableOptions} ref={CollapsableRef}>
                <ul>
                    {
                        data ?
                            data.map((item,index) => 
                                {
                                    return (
                                        <li
                                            onClick={() => SelectOption(item,closeOnSelect ?? false)}
                                            className={`
                                                ${SelectedObj.current?.id && SelectedObj.current?.id === item.id ? style.selected : '' }
                                                ${withFilter ? style[SetFilteredOptiopClassState(item.label)] : ''}
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
        <div
            ref={ComponentRef}
            className={`
                ${style.selectWrapper}
                ${style[_getSize()]}
                ${FocusStates.focusedIn || Value ? style.focused : ''}
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
                            <img src={IconRemove} alt="" />
                        </div>
                    )
                    : ''
                }

                <div className={style.collapseAction} onClick={Focus}>
                    <img src={IconArrow} alt="arrow" />
                </div>
            </div>
            {
                Collapsed && data  ? CollapsableDropdown() : ''
            }
            
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

export default SingleSelectDropdown