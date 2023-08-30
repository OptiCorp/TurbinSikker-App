
import {  FunctionComponent, useState } from 'react'
import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'


import { Card, Checkbox, Icon } from '@equinor/eds-core-react'
import { CustomCard, CustomCardContent, CustomCategoryName, CustomTaskField, FillOutWrap, ImageContainer, NotApplicableWrap, StyledCardHeader, StyledHeaderCard, StyledSwitch } from './styles'
import { arrow_drop_down } from '@equinor/eds-icons' 
import { Controller, useFormContext } from 'react-hook-form'
import { WorkFlow } from '../workflow/context/models/WorkFlowEntity'

type Props = {
    tasks: CheckListEntity | null
    sortedTasks: CheckListEntity['tasks']
WorkFlow: WorkFlow
}

export const FillOutList: FunctionComponent<Props> = ({
    WorkFlow, sortedTasks, tasks
}) => {
    let lastCategoryName = ''

    const [isShowMore, setIsShowMore] = useState(true);
    const toggleReadMore = () => setIsShowMore(show => !show);
    const { control, register } = useFormContext()
    const [applicableStatuses, setApplicableStatuses] =  useState<Record<string, boolean>>({});



    return (
        <>
            <FillOutWrap >
            
                {sortedTasks.map((task) => {
                    const categoryName =
                        task.category.name !== lastCategoryName
                            ? task.category.name
                            : '' 

                    lastCategoryName = task.category.name

                    return (
                        <div key={task?.id}>
                       
                                <CustomCard >
                             
                             <StyledHeaderCard  style={{ filter: applicableStatuses[task.id] ? "blur(3px)" : "none" }}><CustomCategoryName>{categoryName}</CustomCategoryName> 
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
                    render={({ field: { onChange, value} }) => (

                        <StyledSwitch
                      size='small'
                      label='N/A?'
                    
                      style={{display:'flex', flexDirection:'column-reverse',margin:'0 auto', alignItems:'baseline',}}
                        type='checkbox'
                        value={[task.id] || false}
                        {...register(String(task?.id))}
                         
                        
                        checked={applicableStatuses[task.id] || false}
                        onChange={(e) => {
                            setApplicableStatuses(prev => ({
                                ...prev,
                                [task.id]: e.target.checked
                            }));
                            onChange(e.target.checked ? 'Active' : 'Disabled');
                        }}
                      
                      />
                    
                        )
                    }
                    />

                                    </NotApplicableWrap>
                                                    <CustomTaskField style={{ filter: applicableStatuses[task.id] ? "blur(3px)" : "none" }}
                                        
                                                            label=""
                                                            key={task.id}
                                                            id="storybook-multi-readonly"
                                                            name='task'
                                                            
                                                            defaultValue={task.description}
                                                            multiline
                                                            rows={3}
                                                        
                                                            readOnly
                                                            helperText={task.description.length >80 ? "see more" : '  '} helperIcon={task.description.length >100 ? <Icon data={arrow_drop_down} height={30}  color='#007079' title='arrow_drop_down' onClick={toggleReadMore}/> : null}
                                                        />
                                                    
                                                    </CustomCardContent>
                                                    <Card.Actions alignRight> 
                                                    {applicableStatuses[task.id] ? <ImageContainer/> : 


                                                  


                                                    <Checkbox aria-label="" 
                                                    type='checkbox'
                                                    
                                                    /> 
                                                     
                                                
                                                
                                                } 
                                                    
                                                    
                                                    
                                                    </Card.Actions>
                                                </CustomCard>
                              
                      </div>
                     
                    )
                })}
            </FillOutWrap>
          
        </>
    )
}
