import { useState } from "react"
import Input from "../../components/Form/Input/Input"
import './Home.scss'
import SingleSelectDropdown from "../../components/Form/Selects/SingleSelect/SingleSelectDropdown"
const Home  = () => {
    const [value,setValue]  = useState('')
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
                    isRequired={false}
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
                />
            </div>
        </div>
    )
}

export default Home