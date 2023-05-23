import { useState } from "react"
import Input from "../../components/Form/Input/Input"
import './Home.scss'
import SingleSelectDropdown from "../../components/Form/Selects/SingleSelect/SingleSelectDropdown"

import { Data } from "../../utils/Data"

const Home  = () => {
    const [value,setValue]  = useState('')
    const [SelectedObj,setSelectedObj] = useState({})
    const [SelectedID,setSelectedID] = useState(14)

    return (
        <div className="page-home-wrapper">
            <div className="input-wrapper" style={{width: '365px'}}>
                <Input
                    onChange={(value) => setValue(value)}
                    value={value}
                    inputType="text"
                    size="medium"
                    label={'Input Label Placeholder'}
                    disabled={false}
                    isRequired={true}
                    msg={
                        {
                            type : 'error',
                            visible : false,
                            text : 'faasmfskfmaskfmasfafasfaklamkfa'
                        }
                    }
                />
            </div>

            <div className="select-wrapper margin" style={{width:'365px'}}>
                <SingleSelectDropdown 
                    label={'Select Option'}
                    size={'medium'}
                    isRequired={true}
                    data={Data.Plain}
                    selectedOptonID={SelectedID}
                    withFilter={false}
                    withClear={true}
                    closeOnSelect={true}
                    selected={(obj) => setSelectedObj(obj)}
                    msg={
                        {
                            type : 'success',
                            visible : false,
                            text : 'faasmfskfmaskfmasfafasfaklamkfa'
                        }
                    }
                />
            </div>
        </div>
    )
}

export default Home