import { Tabs } from '@equinor/eds-core-react'
import styled from 'styled-components'
export const FooterContainer = styled.div`
    min-height: 64px;
    width: 100%;
    position: fixed;
    align-items: center;
    display: flex;
    z-index: 0;
    bottom: 0;
    justify-content: space-evenly;
    box-sizing: border-box;
    background: #243746;
`

export const FooterContainerHook = styled.div`
    min-height: 64px;
    width: 100%;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    background: #243746;
`

export const Sidemenu = styled.div`
    min-height: 80vh;
    width: 100%;
    position: sticky;
    right: 0;
    box-sizing: border-box;
    display: grid;
    column-gap: 24px;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr;
    background: #243746;
`

export const ImageContainer = styled.div`
    border-bottom: none;
    color: white;

    margin: 1rem 0;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 3px;

    align-items: center;
`
export const ActiveThirdTab = styled.div`
    border-bottom: none;
    color: #73b1b5;

    margin: 1rem 0;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
`

export const ThirdTab = styled.div`
    border-bottom: none;
    color: white;

    margin: 1rem 0;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
`

export const ImageContainerActive = styled.div`
    border-bottom: none;
    color: #73b1b5;

    margin: 1rem 0;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: center;
`
export const ChecklistContainer = styled.div`
    border-bottom: none;
    color: white;

    margin: 1rem 0;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
`

export const ActiveChecklistContainer = styled.div`
    border-bottom: none;
    color: #73b1b5;

    margin: 1rem 0;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
`
export const StyledTab = styled(Tabs.Tab)`
    display: flex;
    color: white;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
    width: 100%;

    border-bottom: none;
`
export const NavigationMainWrap = styled.div`
    border-bottom: none;
    color: white;

    margin: 1rem 0;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
`
export const StyledList = styled(Tabs.List)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100vw;
    height: 100%;

    && :active {
        background-color: none;
    }
`

export const StyledTabs = styled(Tabs)`
    && :active {
        background-color: none;
    }
`
