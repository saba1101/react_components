import { useEffect, useRef, useState } from 'react'
import './SingleSelectDropdown.scss'
import IconArrow from '@/assets/icons/svg/arrow.svg'

const SingleSelectDropdown = ({
    label,
    size,
    withFilter,
    isRequired,
    disabled,
    msg,
    data,
    selectedOptonID,
    selected,
}) => {

    useEffect(() => {
        document.addEventListener('click',ClickHandler)
        SetPreSelectedObj()
        return () => {
            document.removeEventListener('click',ClickHandler)
        }
    },[])

    const [Value,setValue] = useState('')
    // const [SelectedObj,setSelectedObj] = useState({})
    let SelectedObj = useRef('')
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

    const CollapseOptions = () => {
        setCollapsed(state => !state)
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

    const SetPreSelectedObj = () => {
        if(selectedOptonID) {
            let target_obj = data.filter(el => el.id === selectedOptonID)
            if(target_obj && target_obj[0]){
                SelectedObj.current = target_obj[0]
                SelectOption(target_obj[0])
            }
        }
    }

    const SelectOption = (obj) => {
        // setSelectedObj(obj)
        SelectedObj.current = obj
        setValue(obj.label)
        setCollapsed(state => false)

        if(selected) selected(SelectedObj.current)
    }

    const CollapsableDropdown = () => {
        return (
            <div className="collapsable-options" ref={CollapsableRef}>
                <ul>
                    {
                        data ?
                            data.map((item,index) => 
                                {
                                    return (
                                        <li 
                                            onClick={() => SelectOption(item)} 
                                            className={`
                                                single-option 
                                                ${SelectedObj.current?.id && SelectedObj.current?.id === item.id ? 'selected' : '' }
                                            `} 
                                            key={index}
                                        >
                                            <span className='option-label'>
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
                select-wrapper
                ${_getSize()}
                ${FocusStates.focusedIn || Value ? 'focused' : ''}
            `}

        >
            <div className="select-container">
                <div className="select-label" onClick={Focus}>
                    <span> { label ?? 'Label' } </span>
                </div>
                <div className="selected-option">
                    <input 
                        type="text" 
                        value={Value} 
                        required={isRequired} 
                        disabled={false} 
                        readOnly={false}
                        onFocus={Focus}
                        onBlur={Blur}
                        ref={InputRef}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </div>
                <div className="collapse-action" onClick={Focus}>
                    <img src={IconArrow} alt="arrow" />
                </div>
            </div>
            {
                Collapsed && data  ? CollapsableDropdown() : ''
            }
        </div>
    )
}

export default SingleSelectDropdown