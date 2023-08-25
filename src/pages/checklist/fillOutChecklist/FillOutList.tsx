import CustomDialog from '@components/modal/useModalHook'
import { ChangeEvent, useState } from 'react'
import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'
import {

    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    
} from '../previewCheckList/styles'

import { Card, Icon, Switch } from '@equinor/eds-core-react'
import { CustomCard, CustomCategoryName, CustomTaskField, FillOutWrap, StyledCardHeader, StyledSwitch, TaskContainer } from './styles'
import { arrow_drop_down } from '@equinor/eds-icons' 
type Props = {
    tasks: CheckListEntity | null
    sortedTasks: CheckListEntity['tasks']

}

export const FillOutList = (props: Props) => {
    let lastCategoryName = ''
    const [content, setContent] = useState('')
    const [dialogShowing, setDialogShowing] = useState(false)
  
    const [check, setCheck] = useState(true);
    const [isShowMore, setIsShowMore] = useState(true);
    const toggleReadMore = () => setIsShowMore(show => !show);

    return (
        <>
            <FillOutWrap>
                {props.sortedTasks.map((task) => {
                    const categoryName =
                        task.category.name !== lastCategoryName
                            ? task.category.name
                            : ''

                    lastCategoryName = task.category.name

                    return (
                        <>
                         
                                <CustomCard>
                                
                                <StyledSwitch onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setCheck(e.target.checked);
      }} checked={check} aria-label="" style={{width:'0', height:'0', margin:'0 auto'}}  size="small"  />

                             <CustomCategoryName>{categoryName}</CustomCategoryName>         
                             <CustomTaskField
                            
                                        label=""
                                        key={task.id}
                                        id="storybook-multi-readonly"
                                        defaultValue={task.description}
                                        multiline
                                        rows={2}
                                        readOnly
                                        helperText={task.description.length >100 ? "see more" : '  '} helperIcon={task.description.length >100 ? <Icon data={arrow_drop_down} color='#007079' title='arrow_drop_down' onClick={toggleReadMore}/> : null}
                                    />
                                </CustomCard>
                          
                        </>
                    )
                })}
            </FillOutWrap>
            {/* <CustomDialog
                isOpen={dialogShowing}
                negativeButtonOnClick={() => setDialogShowing(false)}
                title="Edit task"
                negativeButtonText="Cancel"
                positiveButtonText="Save"
                buttonVariant="ghost"
                positiveButtonOnClick={handleSubmit}
            >
                <EditListPoints
                    label=""
                    key={task?.id ?? ''}
                    id="storybook-multi-readonly"
                    defaultValue={task?.description ?? ''}
                    multiline
                    rows={5}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setContent(event.target.value)
                    }}
                />
            </CustomDialog> */}
        </>
    )
}
