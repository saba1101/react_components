import '@/components/Date/DatePicker.scss'
import { useState,useRef, useEffect } from 'react';
import {__formatDate} from '@/utils/Helpers.js'
import { DatePicker, ConfigProvider, theme  } from 'antd';
import IconCalendar from '@/assets/svgComponents/IconCalendar.jsx';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const Datepicker = (
{
    placeholder,
    allowClear,
    bordered,
    inputReadOnly,
    disabled,
    defaultValue,
    valueFormat,
    format,
    mode = 'single',
    size,
    onChange,
    showTime,
    themeMode,
    iconOnly,
}
) => {

    const Instance = useRef(
        {
            DefaultFormat : 'DD/MM/YYYY',
            DefaultValueFormat: 'DD/MM/YYYY',
            DefaultSize: "large",
        }
    )

    const [Focused,setFocused] = useState(false)

    const [notifierFlag,setNotifierFlag] = useState(false)

    const change = (date,dateString) => {
        let dateValue

        if(!date) {
            setNotifierFlag(false)
        }

        const syncDateChange = () => {
            if(onChange && typeof onChange === 'function'){
                onChange(dateValue)
            }
        }

        setNotifierFlag(date ? true : false)


        if(mode === 'range'){
            if(valueFormat === 'timestamp'){
                dateValue = {
                    from : dayjs(date[0]).valueOf(),
                    to : dayjs(date[1])?.valueOf(),
                }                
                return syncDateChange()
            }

            dateValue = {
                from : dayjs(date[0])?.format(valueFormat ? valueFormat : Instance.current.DefaultValueFormat),
                to : dayjs(date[1])?.format(valueFormat ? valueFormat : Instance.current.DefaultValueFormat),
            }
        }
        if(mode === 'single'){
            if(valueFormat === 'timestamp'){
                dateValue = dayjs(date).valueOf()

                return syncDateChange()
            }

            dateValue =  dayjs(date).format(valueFormat ? valueFormat : Instance.current.DefaultValueFormat)
        }

        syncDateChange()
    }

    const GetFocus = (event) => {
        setFocused(true)
    }
    const GetBlur = (event) => {
        setFocused(false)
    }

    useEffect(() => {
        setNotifierFlag(defaultValue ? true : false)
    },[defaultValue])

    return (
        <ConfigProvider
            theme={{
                algorithm: themeMode && (themeMode === 'theme_light' ? '' : themeMode === 'theme_dark' ? theme.darkAlgorithm : '')
            }}
        > 
            <div className={
                    `
                        datePickerWrapper
                        ${iconOnly ? 'iconOnly' : ''}
                    `
                }
            >
                {
                    iconOnly && (
                        <div className='iconPlaceholder'>
                            <IconCalendar/>
                            <div className={`notifierDot ${defaultValue || notifierFlag ? 'visible' : '' }`}></div>
                        </div>
                    )
                }
                {
                    !iconOnly && (
                        <div className={`datepickerCustomLabel ${Focused || (notifierFlag)  ? 'focused' : ''}`}>
                            <span>
                                {placeholder}
                            </span>
                        </div>
                    )
                }
                {
                    (mode && mode === 'single') && (
                        <DatePicker
                            style={{width: '100%'}}
                            allowClear={iconOnly ? false : allowClear}
                            bordered={bordered}
                            className={'DatepickerComponent'}
                            popupClassName={'PopupDatepickerComponent'}
                            inputReadOnly={inputReadOnly}
                            disabled={disabled}
                            defaultValue={defaultValue ? dayjs(defaultValue) : null}
                            format={format ? format : Instance.current.DefaultFormat}
                            onChange={(date,dateString) => change(date,dateString)}
                            size={size ? size : Instance.current.DefaultSize}
                            placeholder={''}//placeholder
                            showTime={showTime ? { format: 'HH:mm',visible:false } : false}
                            onFocus={GetFocus}
                            onBlur={GetBlur}
                        />
                    )
                }

                {
                    (mode && mode === 'range') && (
                        <RangePicker
                            allowClear={iconOnly ? false : allowClear}
                            style={{width: '100%'}}
                            disabled={disabled}
                            format={format ? format : Instance.current.DefaultFormat}
                            onChange={(date,dateString) => change(date,dateString)}
                            bordered={bordered}
                            defaultValue={
                                defaultValue && defaultValue.length ? [
                                    dayjs(defaultValue[0]) || null,
                                    dayjs(defaultValue[1]) || null
                                ] : null
                            }
                            size={size ? size : Instance.current.DefaultSize}
                            placeholder={''}//placeholder
                            onFocus={GetFocus}
                            onBlur={GetBlur}
                        />
                    )
                }

            </div>             
        </ConfigProvider>
    )
}
export default Datepicker