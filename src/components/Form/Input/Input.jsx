import { useEffect, useRef, useState } from 'react'
import style from './Input.module.scss'
import IconPassword from '@/assets/icons/svg/password.svg'
import IconPasswordHide from '@/assets/icons/svg/password-hide.svg'


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
        setElementInputType(inputType ?? 'text')
        setInputPlaceholder(placeholder)
    },[])

    const [FocusStates,setFocusStates] = useState({
            focusedIn: false,
            focusedOut: true,
    })
    const [ElementInputType,setElementInputType] = useState('')
    const [PasswordVisible,setPasswordVisible] = useState(false)
    const [InputPlaceholder,setInputPlaceholder] = useState('')
    
    const _getSize = () => {
        if(size && !['small','medium','large'].includes(size)) return 'medium'
        return size ? size : 'medium'
    }

    const Change = (event) => {
        if(onChange && typeof onChange === 'function'){
            onChange(event.target.value)
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

    useEffect(() => {
        setElementInputType(PasswordVisible ? 'text' : inputType)
    },[PasswordVisible])

    return (
        <div 
            className={
                `${style.componentInputWrapper}
                ${style[_getSize()]}
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
            </div>
            {
                inputType && inputType === 'password' ?
                    (
                        <div className={style.iconPassword} onClick={() => ShowPassword()}>
                            <img src={PasswordVisible ? IconPasswordHide : IconPassword } alt="icon-visible" />
                        </div>
                    )
                :
                ''
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

export default Input