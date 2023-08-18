import '@/components/Timepicker/Timepicker.scss'
import { TimePicker,ConfigProvider, theme} from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useEffect } from 'react';
const Timepicker = (
    {
        label,
        format,
        minuteStep,
        defaultValue,
        onTimeChange,
        value,
        size,
        themeMode,
        disabled,
        placeholder
    }
) => {
    const [Focused,setFocused] = useState(false)
    const [Flag,setFlag] = useState(false)
    const [IsDefaulValueAvailabel,setIsDefaulValueAvailabel] = useState(defaultValue ? true : false)
    const [DefaultValue,setDefaultValue] = useState(defaultValue)
    const DEFAULT_FORMAT = 'HH:mm'
    const DEFAULT_MINUTE_STEP = 1

    const [TimeValue,setTimeValue] = useState(null)

    const Change = (time,timeString) => {
        if(!time && DefaultValue) setIsDefaulValueAvailabel(false)
        if(onTimeChange && typeof onTimeChange === 'function'){
            setTimeValue(time)
            onTimeChange(time ?? time?.format('HH:mm'))
        }
    }

    useEffect(() => {
        setFlag(state => !state)
        setDefaultValue(defaultValue)
    },[defaultValue])

    return (
        <ConfigProvider
            theme={{
                algorithm: themeMode && (themeMode === 'theme_light' ? '' : themeMode === 'theme_dark' ? theme.darkAlgorithm : '')
            }}
        > 
            <div className='timePickerComponentWrapper'>
                <div className={`timepickerCustomLabel ${Focused || (TimeValue || IsDefaulValueAvailabel || placeholder)  ? 'focused' : ''}`}>
                    <span>
                        {label}
                    </span>
                </div>
                <TimePicker
                    onChange={Change}
                    // value={value}
                    // defaultValue={defaultValue ? moment(defaultValue ?? '00:00', format ?? DEFAULT_FORMAT) : null} 
                    defaultValue={DefaultValue ? dayjs(DefaultValue,"HH:mm") : null}
                    format={format ?? DEFAULT_FORMAT}
                    minuteStep={minuteStep ?? DEFAULT_MINUTE_STEP}
                    size={size ?? 'large'}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    disabled={disabled}
                    showNow={false}
                    placeholder={placeholder}
                />
            </div>
        </ConfigProvider>
    )
}

export default Timepicker