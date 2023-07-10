import styled from "styled-components";

const ResultCard = styled.div`
    width: 100%;
    max-width: 300px;
    min-height: 180px;
    background-color: #fff;
    border-radius: 8px;
    margin: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: 0.5s;

    h2 {
        color: #333;
        font-size: 18px;
        margin-bottom: 10px;
    }

    p {
        color: #666;
        font-size: 14px;
        margin-bottom: 0;
    }

    &:hover {
        transform: translateY(-5px);
    }
`;

export { ResultCard }