import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'

import { ApiContext } from '../../pages/context/apiContextProvider'
import { ControllerWrap } from './styles'
import { useAddTaskForm } from './useAddTaskForm'

const customStyles = {
    control: (styles: any) => ({
        ...styles,
        background: '#F7F7F7',
        borderBottom: '1px solid black',
    }),

    option: (styles: any) => ({ ...styles }),
    container: (styles: any) => ({
        ...styles,
        width: 250,
        paddingBottom: '10px',
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '200',
        lineHeight: '20px',
    }),
}

export const CategorySelector = () => {
    const { handleCategorySelect, category, tasks, handleTaskSelect } =
        useContext(ApiContext)

    const { methods, register } = useAddTaskForm()

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
                            isClearable
                            options={category}
                            value={category.find((c) => c.value === value)}
                            onChange={(val) => {
                                if (val === null) {
                                    onChange(null)
                                } else {
                                    onChange(val.value)
                                    handleCategorySelect(val.value)
                                }
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
                    defaultValue={[tasks[0]]}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            styles={customStyles}
                            options={tasks}
                            isClearable
                            value={tasks.find((c) => c.id === value)}
                            onChange={(val) => {
                                if (val === null) {
                                    onChange(null)
                                } else {
                                    onChange(val.value)
                                    handleTaskSelect(val.value)
                                }
                            }}
                        />
                    )}
                />
            </ControllerWrap>
        </>
    )
}
