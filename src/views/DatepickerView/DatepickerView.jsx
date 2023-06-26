import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import Datepicker from '@/components/Date/DatePicker.jsx'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import { useDispatch, useSelector } from "react-redux"

const DatepickerView = () => {
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
            propType: 'date',
            title: 'defaultValue',
            description: 'Default Value',
            type: 'Date Format',
        },
        {
            propType: 'date',
            title: 'valueFormat',
            description: 'define in what format, onChange event will return date',
            type: 'Date Format',
            example: 'Default is DD/MM/YYYY, additional format is unix timestamp (valueFormat: "timestamp")'
        },
        {
            propType: 'date',
            title: 'format',
            description: 'Datepicker Value format',
            type: 'Date Format',
            example: 'Default is DD/MM/YYYY'
        },
        {
            title: 'showTime',
            description: 'Datepicker with Time Picker',
            type: 'Boolean',
            example: 'prop format and valueFormat Requires Hours and Minutes, '
        },
        {
            title: 'mode',
            description: 'Datepicker Mode',
            type: 'String',
            example: 'single,range, Default is single'
        },
        {
            title: 'iconOnly',
            description: 'Datepicker Without Inputs',
            type: 'Boolean',
        },
        {
            title: 'placeholder',
            description: 'Datepicker Input Placeholder',
            type: 'String,Number',
        },
        {
            title: 'allowClear',
            description: 'Sets Clear Icon when Value is Available',
            type: 'Boolean',
        },
        {
            title: 'bordered',
            description: 'Bordered Style',
            type: 'Boolean',
        },
        {
            title: 'inputReadOnly',
            description: 'Input Value is read only, NOTE: only in mode: "single"',
            type: 'Boolean',
        },
        {
            title: 'disabled',
            description: 'Disabled Datepicker',
            type: 'Boolean',
        },
        {
            title: 'size',
            description: 'Datepicker Size',
            type: 'String',
            example: 'large | middle | small'
        },
        {
            title: 'themeMode',
            description: 'Datepicker Theme',
            type: 'String',
            example: 'theme_light | theme_dark'
        },
        {
            propType: 'event',
            title: 'onChange',
            description: 'returns selected Date or Dates,Depends on mode Prop',
            type: 'function',
            example: "onChange(date) => ..."
        },
    ]
    // defaultValue: [
    //     "12/06/2023",
    //     "11/07/2023"
    // ],
    const componentTypes = useRef(
        [
            {
                title:'Default Single Mode Datepicker',
                mode:'single',
                defaultValue: null,
                value: null,
            },
            {
                title:'Default Single with Time Picker',
                mode:'single',
                defaultValue: new Date(),
                value: null,
                valueFormat: 'DD/MM/YYYY HH:mm',
                format: 'DD/MM/YYYY HH:mm',
                showTime: true,
            },
            {
                title:'With allowClear',
                mode:'single',
                allowClear: true,
                value: null,
                defaultValue: new Date()
            },
            {
                title:'With bordered : false',
                mode:'single',
                allowClear: true,
                value: null,
                bordered: false,
            },
            {
                title:'With inputReadOnly',
                mode:'single',
                allowClear: true,
                value: null,
                inputReadOnly: true,
            },
            {
                title:'With disabled',
                mode:'single',
                allowClear: true,
                value: null,
                disabled: true,
            },
            //////////////////////////////////////
            {
                title:'Default Range Mode Datepicker',
                mode:'range',
                defaultValue: null,
                value: null,
            },
            {
                title:'Range Defined Values',
                mode:'range',
                allowClear: true,
                value: null,
                defaultValue:[
                    '03/06/2022',
                    '05/12/2023',
                ],
            },
            {
                title:'Range With bordered : false',
                mode:'range',
                allowClear: true,
                value: null,
                bordered: false,
            },
            {
                title:'Range disabled',
                mode:'range',
                allowClear: true,
                value: null,
                disabled: true,
            },
            {
                title:'With Icon Only',
                mode:'single',
                value: null,
                iconOnly:true,
            },
            {
                title:'Range With Icon Only',
                mode:'range',
                value: null,
                iconOnly:true,
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span>Datepicker</span>
                </h1>
            </div>
            <div className="docs__component_wrapper">
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >

                                {
                                    c.title && (
                                        <h5>
                                            {c.title}
                                        </h5>
                                    )
                                }

                                <Datepicker
                                    placeholder={c.placeholder}
                                    allowClear={c.allowClear}
                                    bordered={c.bordered}
                                    inputReadOnly={c.inputReadOnly}
                                    disabled={c.disabled}
                                    defaultValue={c.defaultValue}
                                    valueFormat={c.valueFormat}
                                    format={c.format}
                                    mode={c.mode}
                                    showTime={c.showTime}
                                    themeMode={Theme.Theme}
                                    onChange={(date) => {
                                        c.value = date
                                        setRenderFlag(state => !state)
                                    }}
                                    iconOnly={c.iconOnly}
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

export default DatepickerView
