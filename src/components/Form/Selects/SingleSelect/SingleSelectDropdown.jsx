import { useRef, useState } from 'react'
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
}) => {
    const [Value,setValue] = useState('')
    const [SelectedObj,setSelectedObj] = useState({})
    const InputRef = useRef(null)
    const [Collapsed,setCollapsed] = useState(false)
    const [FocusStates,setFocusStates] = useState({
        focusedIn: false,
        focusedOut: true,
    })

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
        setCollapsed(state => false)
    }

    return (
        <div className="component-single-select-wrapper">
            <div 
                className={`
                    select-wrapper 
                    ${_getSize()}
                    ${FocusStates.focusedIn ? 'focused' : ''}
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
                            readOnly={true}
                            onFocus={Focus}
                            onBlur={Blur}
                            ref={InputRef}
                        />
                    </div>
                    <div className="collapse-action" onClick={Focus}>
                        <img src={IconArrow} alt="arrow" />
                    </div>
                </div>
                {
                    Collapsed ? 
                        (
                            <div className="collapsable-options">
                                <ul>
                                    {JSON.stringify(data)}
                                </ul>
                            </div>
                        )
                    : ''                    
                }
            </div>
        </div>
    )
}

export default SingleSelectDropdown