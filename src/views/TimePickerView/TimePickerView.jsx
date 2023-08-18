import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import { useDispatch, useSelector } from "react-redux"
import Timepicker from '@/components/Timepicker/Timepicker.jsx'
import moment from 'moment'
const TimepickerView = () => {
    const Theme = useSelector(state => state.ThemeStore)
    const [renderFlag,setRenderFlag] = useState(false)

    const propsList =[
        {
            title: 'Props Name',
            description: 'Description',
            type: 'Type',
            example: 'Example',
            header: true
        },
        {
            title: 'label',
            description: 'Timepicker Label',
            type: 'String',
        },
        {
            propType: 'date',
            title: 'format',
            description: 'Timepicker format',
            type: 'Time/Format',
            example: 'HH:mm',
        },
        // {
        //     propType: 'date',
        //     title: 'defaultValue',
        //     description: 'Timepicker Initial Default value',
        //     type: 'Time/Format',
        //     example: 'HH:mm:ss',
        // },
        {
            title: 'minuteStep',
            description: 'Timepicker minute steps',
            type: 'Number',
            example: 'Default 1'
        },
        {
            title: 'disabled',
            description: '',
            type: 'Boolean',
        },
        {
            title: 'themeMode',
            description: 'Timepicker Theme',
            type: 'String',
            example: 'theme_light | theme_dark'
        },
        {
            propType: 'event',
            title: 'onTimeChange',
            description: 'returns Timepicker value',
            type: 'function',
            example: "onTimeChange(time) => ...."
        },
    ]

    const componentTypes = useRef(
        [
            {
                title: 'Default',
                value: null,
                format: 'HH:mm',
            },
            {
                title: 'Minute Step 15',
                value: null,
                format: 'HH:mm',
                minuteStep: 15,
            },
            {
                title: 'Default Value',
                value: null,
                format: 'HH:mm',
                minuteStep: 15,
                placeholder: '05:15:00'
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> Timepicker </span>
                </h1>
            </div>
            <div className="docs__component_wrapper comp__button">
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >

                                <Timepicker 
                                    // value={c.value}
                                    format={c.format}
                                    onTimeChange={(time) => {
                                        c.value = time
                                        setRenderFlag(state => state = !state)
                                    }}
                                    minuteStep={c.minuteStep}
                                    label={"Select Time"}
                                    themeMode={Theme.Theme}
                                    defaultValue={c.defaultValue}
                                    placeholder={c.placeholder}
                                />
                            </div>
                        )
                    })
                }

            </div>

            <div className="docs__component_static_preview_props">
                <PropsDoc propsList={propsList} />
            </div>
        </div>
    )
}

export default TimepickerView
