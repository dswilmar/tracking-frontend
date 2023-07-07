import styled from "styled-components";

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    background-color: #f2f2f2;
    border-radius: 8px;
    padding: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
`;

const Input = styled.input`
    background-color: #FFF;
    padding: 10px;
    border: none;
    border-radius: 4px;
    width: 300px;
    font-size: 16px;
    margin-right: 10px;
`;

const Logo = styled.img`
    width: 120px;
    height: 120px;
    padding: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
`;

const ResultsContainer = styled.div`
    display: flex;
`;

export { Container, Form, Button, Input, Logo, FormGroup, ResultsContainer }