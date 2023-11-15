import { Controller, useFormContext } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import { useAddTaskForm } from './hooks/useAddTaskForm'
import { ControllerWrap, customStyles } from './styles'
import { AddTaskForm } from './types'
export const CategorySelector = () => {
    const { category, tasks, setSelectedOption, selectedOption } =
        useAddTaskForm()

    const api = apiService()
    const { openSnackbar, setRefreshList } = useGlobal()
    const methods = useFormContext<AddTaskForm>()

    const addnewOption = async (description: string) => {
        if (!selectedOption) return
        try {
            const res = await api.addTask(selectedOption, description, 0)

            if (openSnackbar) openSnackbar('Task created')
            setRefreshList((prev) => !prev)
            if (description) methods.setValue('id', res.id)
        } catch (error) {
            if (error) return
            console.log(error)
        }
    }

    const addNewCategory = async (name: string) => {
        try {
            const res = await api.addCategory(name)

            if (openSnackbar) openSnackbar('Category created')
            setRefreshList((prev) => !prev)
            if (name) methods.setValue('category', res.id)
        } catch (error) {
            if (error) return
            console.log(error)
        }
    }

    return (
        <>
            <ControllerWrap>
                <Controller
                    control={methods.control}
                    name="category"
                    render={({ field: { onChange, value } }) => {
                        return (
                            <CreatableSelect
                                onCreateOption={(name) => {
                                    addNewCategory(name)
                                }}
                                value={
                                    value
                                        ? category.find((c) => c.id === value)
                                        : null
                                }
                                styles={customStyles}
                                getOptionLabel={(category) =>
                                    category.name
                                        ? category.name
                                        : 'Add new category: ' + category.value
                                }
                                isClearable={true}
                                options={category}
                                placeholder={
                                    'select category or write a new category'
                                }
                                onChange={(val) => {
                                    if (val === null) return onChange(null)

                                    setSelectedOption(val.value)
                                    methods.watch('category')
                                    onChange(val.value)
                                }}
                            />
                        )
                    }}
                />
                <Controller
                    control={methods.control}
                    name="id"
                    rules={{
                        required: 'Required',
                    }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <CreatableSelect
                                onCreateOption={(description) => {
                                    addnewOption(description)
                                }}
                                isDisabled={
                                    methods.watch('category') && selectedOption
                                        ? false
                                        : true
                                }
                                styles={customStyles}
                                options={tasks}
                                isClearable
                                value={
                                    value
                                        ? tasks.find((c) => c.id === value)
                                        : null
                                }
                                getOptionLabel={(task) =>
                                    task.description
                                        ? task.description
                                        : 'Add new task: ' + task.value
                                }
                                onChange={(val) => {
                                    if (val === null) return onChange(null)
                                    onChange(val.id)
                                }}
                                placeholder={
                                    selectedOption
                                        ? 'Select task or write new task'
                                        : 'Select category first!'
                                }
                            />
                        )
                    }}
                />
            </ControllerWrap>
        </>
    )
}
