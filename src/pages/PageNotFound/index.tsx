import { PageNotFoundWrapper } from './styles'

function PageNotFound() {
    return (
        <PageNotFoundWrapper>
            <h1>Page not found</h1>
            <p>Contact support</p>
            <a href="/">Go back to the home page</a>
        </PageNotFoundWrapper>
    )
}

export default PageNotFound
