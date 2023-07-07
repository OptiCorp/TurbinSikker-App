import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { Category } from 'src/models/CategoryEntity'
import { ControllerWrap } from './styles'

const customStyles = {
    control: (styles: any) => ({ ...styles }),
    option: (styles: any) => ({ ...styles }),
    container: (styles: any) => ({ ...styles, width: 330 }),
    menu: (styles: any) => ({ ...styles, width: '200px' }),
}

export const CategorySelector = () => {
    const { control } = useFormContext()

    const [category, setCategory] = useState<Category[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(
                'http://20.251.37.226:8080/api/GetAllCategories'
            )
            if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
            const data = await res.json()

            const category = data.map((item: any) => ({
                value: item.name,
                label: item.name,
            }))
            setCategory(category)
        }
        fetchCategories()
    }, [])

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
                            onChange={(val) => onChange(val?.value)}
                        />
                    )}
                />
            </ControllerWrap>
        </>
    )
}
