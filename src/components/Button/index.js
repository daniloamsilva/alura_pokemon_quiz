import styled from 'styled-components';
import { shade } from 'polished';

import db from '../../../db.json';

const Button = styled.button`
  background: ${db.theme.colors.secondary};
  height: 40px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: white;
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, db.theme.colors.secondary)};
    cursor: pointer;
  }
`;

export default Button;