import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { useAddTaskForm } from './hooks/useAddTaskForm'
import { ControllerWrap, customStyles } from './styles'

export const CategorySelector = () => {
    const { category, tasks, setSelectedOption, selectedOption, reset, resetField } = useAddTaskForm()
    const { control } = useFormContext()

    return (
        <>
            <ControllerWrap>
                <Select
                    styles={customStyles}
                    isClearable
                    
                    options={category}
                    placeholder={'select category'}
                    onChange={(val) => {
                        if (val === null) return
                        setSelectedOption(val.value)
                    }}
                />

                <Controller
                    control={control}
                    name="id"
                    rules={{
                        required: 'Required',
                    }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Select
                       isDisabled={selectedOption ? false : true}
                                styles={customStyles}
                                options={tasks}
                                isClearable
                                value={tasks.find((c) => c.id === value)}
                                getOptionLabel={(task) => task.description}
                                onChange={(val) => {
                                    if (val === null) return onChange(null)
                                    onChange(val.id)
                                }}placeholder={selectedOption ? 'select task' : ''}
                            />
                        )
                    }}
                />
            </ControllerWrap>
        </>
    )
}
