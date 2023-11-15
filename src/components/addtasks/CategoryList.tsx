import { Button } from '@equinor/eds-core-react'
import { Controller, useFormContext } from 'react-hook-form'
import Select, { components } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import { useAddTaskForm } from './hooks/useAddTaskForm'
import { ControllerWrap, customStyles } from './styles'
import { AddTaskForm } from './types'

export const CategorySelector = () => {
    const {
        category,
        tasks,
        setSelectedOption,
        selectedOption,
        reset,

        resetField,
    } = useAddTaskForm()

    const api = apiService()
    const { currentUser, openSnackbar, setRefreshList, refreshList } =
        useGlobal()
    const methods = useFormContext<AddTaskForm>()

    const SelectMenuButton = (props: any, description: string) => {
        console.log(description)
        return (
            <components.MenuList {...props}>
                {props.children}
                <Button
                    style={{ margin: '0 auto' }}
                    variant="ghost"
                    onClick={() => addnewOption(description)}
                >
                    Add new task
                </Button>
            </components.MenuList>
        )
    }

    const addnewOption = async (description: string) => {
        if (!selectedOption) return
        try {
            const res = await api.addTask(selectedOption, description, 0)

            if (openSnackbar) openSnackbar('task created')
            setRefreshList((prev) => !prev)
            if (description) methods.setValue('id', res.id)
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
                            <Select
                                value={
                                    value
                                        ? category.find((c) => c.id === value)
                                        : null
                                }
                                styles={customStyles}
                                isClearable
                                options={category}
                                placeholder={'select category' || ''}
                                onChange={(val) => {
                                    if (val === null) return onChange(null)

                                    setSelectedOption(val.value)
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
                                    methods.getFieldState('category').isTouched
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
                                        ? 'select task or write new task'
                                        : null
                                }
                            />
                        )
                    }}
                />
            </ControllerWrap>
        </>
    )
}
