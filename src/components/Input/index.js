import styled from 'styled-components';

import db from '../../../db.json';

const Input = styled.input`
  background: transparent;
  border-radius: 10px;
  border: 2px solid ${db.theme.colors.secondary};
  padding: 15px;
  width: 100%;
  color: white;
  margin-top: 20px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: white;
  }
  :-ms-input-placeholder {
     color: white;
  }
`
export default Input;