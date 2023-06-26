import { useEffect, useRef, useState } from 'react'
// import IconPassword from '@/assets/icons/svg/password.svg'
// import IconPasswordHide from '@/assets/icons/svg/password-hide.svg'
import {_getSize} from '@/utils/Helpers.js'
import style from '@/components/Form/Input/Input.module.scss'
import PasswordHide from '@/assets/svgComponents/PasswordHide.jsx'
import Password from '@/assets/svgComponents/Password.jsx'
import IconArrowUp from '@/assets/svgComponents/IconArrowUp.jsx'
import IconArrowDown from '@/assets/svgComponents/IconArrowDown.jsx'


const Input = (
    {
        value,
        label,
        placeholder,
        isRequired,
        disabled,
        inputType,
        size,
        msg,
        readOnly,
        onChange,
        focusChange,
        blurChange,
    }
) => {

    useEffect(() => {
        setElementInputType(inputType && inputType !== 'number' ? inputType : inputType === 'number' ? 'text' : 'text')
        setInputPlaceholder(placeholder)
    },[])

    const [FocusStates,setFocusStates] = useState({
            focusedIn: false,
            focusedOut: true,
    })
    const [ElementInputType,setElementInputType] = useState('')
    const [PasswordVisible,setPasswordVisible] = useState(false)
    const [InputPlaceholder,setInputPlaceholder] = useState('')
    const IncrementValue = 1
    
    const Change = (event) => {
        let value = event.target.value
        if(onChange && typeof onChange === 'function'){
            onChange(value)
        }
    }

    const TriggerFocus = () => {
        setFocusStates(() => ({focusedIn : true,focusedOut : false}))
        if(focusChange && typeof focusChange === 'function'){
            focusChange()
        }
    }
    const TriggerBlur = () => {
        setFocusStates(() => ({focusedIn : false, focusedOut : true}))
        if(blurChange && typeof blurChange === 'function'){
            blurChange()
        }
    }

    const ShowPassword = () => {
        setPasswordVisible(state => !state)
    }

    const IncreaseValue = () => {
        let numberValue = Math.abs(Number(value) ? Number(value) : 0)
        syncNumberChange(numberValue += IncrementValue)
    }

    const DecreaseValue = () =>{
        let numberValue = Math.abs(Number(value) ? Number(value) : 0)
        syncNumberChange(numberValue == 0 ? '0' : (numberValue -= IncrementValue))
    }

    const syncNumberChange = (numberValue) => {
        if((onChange && typeof onChange === 'function') && 
            (numberValue && typeof numberValue == 'number')){
            onChange(numberValue)
        }
    }

    useEffect(() => {
        setElementInputType(PasswordVisible ? 'text' : inputType)
    },[PasswordVisible])

    return (
        <>
            <div 
                className={
                    `${style.componentInputWrapper}
                    ${style[_getSize(size,['xs'])]}
                    ${FocusStates.focusedIn || value ? style.focused : ''}
                    ${FocusStates.focusedIn  ? style.active : ''}
                    ${disabled  ? style.disabled : ''}
                    ${
                        (msg?.type && msg?.visible) ? style[msg?.type] : ''
                    }
                    `
                }>

                <div className={style.inputLabel}>
                    <span> {label ?? 'Label'} </span>
                    {
                        isRequired ? <span className={style.requiredMark}>*</span> : ''
                    }

                </div>
                <div className={style.inputElementWrapper}>
                    <input
                        className={`${inputType === 'password' ? style.paddingRight : ''}`}
                        type={ElementInputType} 
                        value={value} 
                        onChange={(event) => Change(event)}
                        onFocus={TriggerFocus}
                        onBlur={TriggerBlur}
                        disabled={disabled ?? false}
                        required={isRequired ?? false}
                        readOnly={readOnly ?? false}
                        spellCheck={false}
                        placeholder={placeholder && !value && FocusStates.focusedIn ? InputPlaceholder : ''}
                    />
                    {
                        inputType === 'number' && (
                            <div className={style.numberTypeInput}>
                                <div className={style.numberTypeActionArrowUp} onClick={IncreaseValue}>
                                    <IconArrowUp/>
                                </div> 
                                <div className={style.numberTypeActionArrowDown} onClick={DecreaseValue}>
                                    <IconArrowDown/>
                                </div> 
                            </div>
                        )
                    }
                </div>
                {
                    inputType && inputType === 'password' ?
                        (
                            <div className={style.iconPassword} onClick={() => ShowPassword()}>
                                {
                                    PasswordVisible ? <PasswordHide /> : <Password />
                                }                        
                            </div>
                        )
                    :
                    ''
                }
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
        </>
    )
}

export default Input