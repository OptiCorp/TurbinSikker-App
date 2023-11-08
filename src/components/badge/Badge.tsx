import { Chip } from "@equinor/eds-core-react"
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
    value: number;
    children: ReactNode;
    color: string
}

const Badger = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
`;

const Badge = ({ value, children, color }: Props) => {
    return (
        <Badger>
            {value ? <Chip style={{ position: "absolute", top: "-4px", right: "0px", height: "initial", padding: "1px", backgroundColor: color, color: 'white' }}>{value}</Chip> : null}
            {children}
        </Badger>
    )
}

export default Badge;
