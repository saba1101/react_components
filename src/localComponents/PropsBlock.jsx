import { useEffect, useRef, useState } from 'react'
import style from '@/localComponents/PropsBlock.module.scss'
import Checkbox from '@/components/Form/FormControls/Checkbox/Checkbox.jsx'
import Radio from '@/components/Form/FormControls/Radio/Radio.jsx'

const PropsBlock = (
    {
        propsObj,
        selectionMode,
        update
    }
) => {
    const [renderFlag,setRenderFlag] = useState(false)
    const localProps = useRef(propsObj)

    useEffect(() => {
        localProps.current = propsObj
    },[propsObj])

    const updateProps = () => {
        setRenderFlag(flag => !flag)
        update(localProps.current)
    }

    const setSingleValue = (state,p) => {
        localProps.current.options.forEach(el => {
            if(el === p) el.selected = state
            else{
                el.selected = false
            } 
        })
        updateProps()
    }

    return (
        <div className={style.propsBlockWrapper}>
            <h2>
                {
                    localProps.current.title
                }
            </h2>
            <ul>
                {
                    localProps && localProps.current.options.map((p,ind) => {
                        return (

                            <li key={ind}>
                                <div className={style.controller}>
                                    {
                                        selectionMode === 'multiple' ? (
                                            <Checkbox
                                                checked={p.selected}
                                                change={(state) => (p.selected = state,updateProps())}
                                            />
                                        )
                                        : (
                                            
                                            <Radio 
                                                checked={p.selected}
                                                change={(state) => setSingleValue(state,p)}
                                            />
                                        )
                                    }
                                </div>
                                <span className={style.propsLabel}> { p.type } </span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default PropsBlock