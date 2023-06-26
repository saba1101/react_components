import style from '@/components/Modal/Popup.module.scss'
import { _getSize } from '@/utils/Helpers.js'
import IconError from '@/assets/icons/svg/error.svg'
import IconInfo from '@/assets/icons/svg/info.svg'
import IconWarning from '@/assets/icons/svg/warning.svg'
import IconSuccess from '@/assets/icons/svg/success.svg'

import Success from '@/assets/svgComponents/Success.jsx'
import Warning from '@/assets/svgComponents/Warning.jsx'
import Info from '@/assets/svgComponents/Info.jsx'
import Error from '@/assets/svgComponents/Error.jsx'



const Popup = (
    {
        visible,
        size,
        template,
        options,
        children,
    }
) => {
    const _getType = () =>{
        if(!options || !options?.type) return
        switch (String(options?.type)){
            case 'error':{
                return <Error/>
            }
            case 'warning':{
                return <Warning/>
            }
            case 'success':{
                return <Success/>
            }
            case 'info':{
                return <Info/>
            }
        }
    }

    const _getAlign = () => {
        if(!options || !options?.align) return
        return options?.align
    }

    return (
        visible && (
            <div className={style.modalOverlay}>
                <div className={`
                    ${style.popupContainer}
                    ${style[_getSize(size)]}
                `}>
                    <div className={`${style.popupHeader} ${style[_getAlign()]}`}>
                        {
                            _getType() && (
                                <div className={style.typeIcon}>
                                    {_getType()}
                                </div>
                            )
                        }
                        {
                            (options && options?.title) && (
                                <div className={style.popupTitle}>
                                    <h2> { options?.title ?? '' } </h2>
                                </div>
                            )
                        }
                        {
                            (options && options?.description) && (
                                <div className={style.popupDescription}>
                                    <p> { options?.description ?? '' } </p>
                                </div>
                            )
                        }
                    </div>
                    <div className={style.templateWrapper}>
                        {template && template()}
                        {children && children}
                    </div>
                </div>
            </div>
        )
    )
}

export default Popup