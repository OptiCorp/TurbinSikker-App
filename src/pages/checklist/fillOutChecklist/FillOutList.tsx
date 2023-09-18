import { FunctionComponent, useEffect, useState } from 'react'
import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'

import CustomDialog from '@components/modal/useModalHook'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { Card, Checkbox, Icon } from '@equinor/eds-core-react'
import { arrow_drop_down } from '@equinor/eds-icons'
import { Controller, useFormContext } from 'react-hook-form'

import { WorkFlow } from '../workflow/types'
import {
    CustomCard,
    CustomCardContent,
    CustomCategoryName,
    CustomTaskField,
    FillOutWrap,
    ImageContainer,
    NotApplicableWrap,
    StyledHeaderCard,
    StyledSwitch,
} from './styles'

import { useParams } from 'react-router'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import { useWorkflowContext } from '../workflow/context/workFlowContextProvider'

type Props = {
    /* sortedTasks: CheckListEntity['tasks'] */
    WorkFlow: WorkFlow[]
    onUpdate: (data: {
        id: string
        checklistId: string
        userId: string
        status: string
    }) => void
}

type Checklist = {
    id: string
    createdDate: string
    status: string
    title: string
    updateDate: string
    checklistTasks: [{
        description: string
        categoryId: string
        id: string
        category: {
            id: string
            name: string
        }
    }]
}

export const FillOutList: FunctionComponent<Props> = ({
     WorkFlow,
    /*sortedTasks, */

   
}) => {
    let lastCategoryName = ''

    const [isShowMore, setIsShowMore] = useState(true)
    const toggleReadMore = () => setIsShowMore((show) => !show)
    const { control, register } = useFormContext()
    const [applicableStatuses, setApplicableStatuses] = useState<
        Record<string, boolean>
    >({})
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)
    
    const { checklistById } = useCheckListContext()
    
    
    
    
   
    
 

    return (
        <>
        
        
            <FillOutWrap>
                {checklistById?.checklistTasks.map((task) => {
                    const categoryName =
                        task.category.name !== lastCategoryName
                            ? task.category.name
                            : ''

                    lastCategoryName = task.category.name

                    return (
                        <div key={task?.id}>
                            <CustomCard>
                                <StyledHeaderCard
                                    style={{
                                        filter: applicableStatuses[task.id]
                                            ? 'blur(3px)'
                                            : 'none',
                                    }}
                                >
                                    <CustomCategoryName>
                                        {categoryName}
                                    </CustomCategoryName>
                                </StyledHeaderCard>
                                <CustomCardContent>
                                    <NotApplicableWrap>
                                        <Controller
                                            control={control}
                                            name="N/A"
                                            rules={{
                                                required: 'Required',
                                            }}
                                            defaultValue={false}
                                            render={({
                                                field: { onChange },
                                            }) => (
                                                <StyledSwitch
                                                    size="small"
                                                    label="N/A?"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection:
                                                            'column-reverse',
                                                        margin: '0 auto',
                                                        alignItems: 'baseline',
                                                    }}
                                                    type="checkbox"
                                                    value={[task.id] || false}
                                                    {...register(
                                                        String(task?.id)
                                                    )}
                                                    checked={
                                                        applicableStatuses[
                                                            task.id
                                                        ] || false
                                                    }
                                                    onChange={(e) => {
                                                        setApplicableStatuses(
                                                            (prev) => ({
                                                                ...prev,
                                                                [task.id]:
                                                                    e.target
                                                                        .checked,
                                                            })
                                                        )
                                                        onChange(
                                                            e.target.checked
                                                                ? 'Active'
                                                                : 'Disabled'
                                                        )
                                                        
                                                    }}
                                                />
                                            )}
                                        />
                                    </NotApplicableWrap>
                                    <CustomTaskField
                                        style={{
                                            filter: applicableStatuses[task.id]
                                                ? 'blur(3px)'
                                                : 'none',
                                        }}
                                        label=""
                                        key={task.id}
                                        id="storybook-multi-readonly"
                                        name="task"
                                        defaultValue={task.description}
                                        multiline
                                        rows={3}
                                        readOnly
                                        helperText={
                                            task.description.length > 80
                                                ? 'see more'
                                                : '  '
                                        }
                                        helperIcon={
                                            task.description.length > 100 ? (
                                                <Icon
                                                    data={arrow_drop_down}
                                                    height={30}
                                                    color="#007079"
                                                    title="arrow_drop_down"
                                                    onClick={toggleReadMore}
                                                />
                                            ) : null
                                        }
                                    />
                                </CustomCardContent>
                                <Card.Actions alignRight>
                                    {applicableStatuses[task.id] ? (
                                        <ImageContainer />
                                    ) : (
                                        <Checkbox
                                            aria-label=""
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) console.log(task.id + ", is checked")
                                            }}
                                        />
                                    )}
                                </Card.Actions>
                            </CustomCard>
                        </div>
                    )
                })}
            </FillOutWrap>
            <CustomDialog
                title="Submit form?"
                type="submit"
                form="fill-out-checklist"
                buttonVariant="ghost"
                negativeButtonOnClick={() => setSubmitDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="OK"
                // positiveButtonOnClick={() => {
                //     handleSubmit()
                // }}
                isOpen={submitDialogShowing}
            ></CustomDialog>
 
            <NavActionsComponent
                buttonColor="primary"
                secondButtonColor="primary"
                buttonVariant="outlined"
                secondOnClick={() => setSubmitDialogShowing(true)}
                isShown={true}
                ButtonMessage="Clear"
                SecondButtonMessage="Submit"
            />
        </>
    )
}
