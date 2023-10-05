import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { useAddTaskForm } from './hooks/useAddTaskForm'
import { ControllerWrap, customStyles } from './styles'

export const CategorySelector = () => {
    const { category, tasks, handleCategorySelect, handleTaskSelect } =
        useAddTaskForm()
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
