import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'

import { ApiContext } from '../../pages/context/apiContextProvider'
import { ControllerWrap } from './styles'

const customStyles = {
    control: (styles: any) => ({ ...styles }),
    option: (styles: any) => ({ ...styles }),
    container: (styles: any) => ({ ...styles, width: 330 }),
    menu: (styles: any) => ({ ...styles, width: '200px' }),
}

export const CategorySelector = () => {
    const { handleCategorySelect, handleSelectTask, category, tasks } =
        useContext(ApiContext)
    const { control } = useFormContext()

    return (
        <>
            <ControllerWrap>
                <Controller
                    control={control}
                    name="category"
                    rules={{
                        required: 'Required',
                    }}
                    defaultValue={category[0]}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            styles={customStyles}
                            options={category}
                            value={category.find((c) => c.value === value)}
                            onChange={(val) => {
                                onChange(val?.value)
                                handleCategorySelect(value)
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="task"
                    rules={{
                        required: 'Required',
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            styles={customStyles}
                            options={tasks}
                            value={tasks.find((c) => c.value === value)}
                            onChange={(val) => {
                                onChange(val?.value)
                                handleSelectTask(value)
                            }}
                        />
                    )}
                />
            </ControllerWrap>
        </>
    )
}
