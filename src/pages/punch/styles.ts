import styled from 'styled-components'

export const PunchWrapper = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 768px;
    h4 {
        font-weight: normal;
        margin: 0;
    }

    p {
        color: #656565;
    }

    span {
        color: #243746;
    }
`
export const PunchHeader = styled.div`
    min-width: 320px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    text-align: right;
    p {
        margin: 0;
    }
`

export const PunchUploadFileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #deedee;
`
export const PunchAddUploadContainer = styled.div`
    display: flex;
    padding: 25px;
`

export const PunchUploadFilesContainer = styled.div`
    margin-left: 8px;
`

export const PunchUploadButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: #deedee solid 0.7px;
    padding-right: 20px;
    gap: 8px;
`

export const PunchUploadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 175px;
`

export const SeverityIconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4;
`

export const PunchDescriptionContainer = styled.div`
    width: 100%;
    margin-top: 15px;
    p {
        margin-bottom: 48px;
    }
`

export const PunchButton = styled.button`
    color: #007079;
    position: absolute;
    right: 0;
    bottom: 100px;
    border: none;
    background-color: transparent;
    font-size: 12px;
    line-height: 150%;
`

export const PunchForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin-top: 20px;
`

export const SeverityButtonWrapper = styled.div`
    background-color: #eaeaea;
    display: flex;
    border-radius: 4px;
    padding: 5px;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
`
export const Button = styled.button`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: 4px;
    width: 100%;
    border: none;
    box-shadow: 0px 4px 4px 0px #bebebe;
    min-height: 70px;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const PunchDateContainer = styled.div`
    text-align: right;
    p {
        margin: 0;
    }
`

export const PunchAddContainer = styled.div`
    padding: 20px;
`

/* listPunches */

export const PunchListItem = styled.div`
    background-color: #f0f3f3;
    padding: 20px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 80px;
`

export const PunchListBoxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 4px;
    box-shadow: 0px 4px 4px 2px #bebebe;
    font-size: 12px;
    color: #007079;
    background-color: #fff;
`
export const TicketInfo = styled.div`
    display: flex;
    align-items: center;
`

export const TicketSeverityContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 0.7px solid #dcdcdc;
    padding-right: 18px;
`

export const TicketDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 7px;
`

export const TicketActions = styled.div`
    text-align: right;
    display: flex;
    flex-direction: column;
`

export const TicketIcons = styled.div`
    display: flex;
    justify-content: right;
`

export const TicketButtonContainer = styled.div`
    display: flex;
    align-items: center;
`
