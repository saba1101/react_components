import style from '@/components/ToogerTrip/ToogerTrip.module.scss'
import MainButton from '@/components/Button/MainButton.jsx'
import { useEffect, useRef, useState } from 'react'
const ToogerTrip = ({
    children,
    description,
    actionsTemplate,
    triggerClose,
    openPosition,
    onConfirm,
    onCancel,
}) => {
    const [Visible,setVisible] = useState(false)
    const ToogerTripRef = useRef(null)
    const timeOut = 100

    const _getOpenPosition = () => {
        if(openPosition && !['top','left','right','bottom'].includes(openPosition)) return 'bottom'
        else return openPosition
    }

    const Confirm = () => {
        if(onConfirm && typeof onConfirm === 'function'){
            onConfirm()
            setTimeout(() => {
                setVisible(false)
            }, timeOut);
        }
    }

    const Cancel = () => {
        if(onCancel && typeof onCancel === 'function'){
            onCancel()
            setTimeout(() => {
                setVisible(false)
            }, timeOut);
        }
    }

    const ClickHandler = (event) => {
        if(event.composedPath().includes(ToogerTripRef.current)) return
        setVisible(false)
    }

    useEffect(() => {
        document.addEventListener('click',ClickHandler)
        return () => {
            document.removeEventListener('click',ClickHandler)
        }
    },[])

    useEffect(() => {
        setVisible(false)
    },[triggerClose])

    return (
        <>
            <div className={style.toogerTripRootWrapper} onClick={() => setVisible(state => !state)} ref={ToogerTripRef}>
                {children}
                {
                    Visible && (
                        <div className={
                            `
                                ${style.toogerTripContentDropdown}
                                ${style[_getOpenPosition()]}
                            `
                        }
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        >
                            <div className={style.toogerTripContentWrapper}>
                                <div className={style.toogerTripDescription}>
                                    <p>
                                        {description ?? ''}
                                    </p>
                                </div>
                                <div className={style.toogerTripActions}>
                                    {!actionsTemplate && (
                                        <div className={style.toogerTripDefaultActions}>
                                            <MainButton 
                                                label={'Cancel'}
                                                size={'small'}
                                                type={'border'}
                                                customStyle={
                                                    {
                                                        width: '8.125rem',
                                                        border: '0.0625rem solid #EF4343',
                                                        color: '#EF4343'
                                                    }
                                                }
                                                onClick={Cancel}
                                            />
                                            <MainButton 
                                                label={'Confirm'}
                                                size={'small'}
                                                customStyle={
                                                    {width: '8.125rem'}
                                                }
                                                onClick={Confirm}
                                            />
                                        </div>
                                    )}
                                    {
                                        actionsTemplate && (actionsTemplate())
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>   
    )
}

export default ToogerTrip