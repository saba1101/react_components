import style from './Popup.module.scss'
import { _getSize } from '@/utils/Helpers'
import IconError from '@/assets/icons/svg/error.svg'
import IconInfo from '@/assets/icons/svg/info.svg'
import IconWarning from '@/assets/icons/svg/warning.svg'
import IconSuccess from '@/assets/icons/svg/success.svg'


const Popup = (
    {
        visible,
        size,
        template,
        options,
    }
) => {
    const _getType = () =>{
        if(!options || !options?.type) return
        switch (String(options?.type)){
            case 'error':{
                return IconError
            }
            case 'warning':{
                return IconWarning
            }
            case 'success':{
                return IconSuccess
            }
            case 'info':{
                return IconInfo
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
                                    <img src={_getType()} alt="type" />
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
                    </div>
                </div>
            </div>
        )
    )
}

export default Popup