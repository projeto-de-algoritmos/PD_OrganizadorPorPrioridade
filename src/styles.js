import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin: 0 10px;
  }
  
`;

export const Input = styled.input`
  height: 2rem;
  border: none;
  background: #969cb3;
  font-size: 16px;
  border-radius: 8px;
  padding-left: 16px;
  &::placeholder {
    color: #f5f5f5;
  }
`;

export const Button = styled.button`
  align-self: center;
  background: #457b9d;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  color: #fff;
  font-weight: normal;
  font-size: 18px;
  padding: 10px;
  outline: none;
  cursor: pointer;
`;


export const TableContainer = styled.div`
  margin-top: 64px;
  table {
    width: 100%;
    border-spacing: 0 8px;
    th {
      color: #f1faee;
      background: #1d3557;
      font-weight: bold;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }
    th:first-child {
      border-radius: 8px 0 0 8px;
    }

    th:last-child {
      border-radius: 0 8px 8px 0;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #f1faee;
      font-size: 16px;
      font-weight: normal;
      color: #1d3557;
    }
    td:first-child {
      border-radius: 8px 0 0 8px;
    }
    td:last-child {
      border-radius: 0 8px 8px 0;
    }

    td.solution {
      background-color: green;
      color: #fff;
    }
  }
`;