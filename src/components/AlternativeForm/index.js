import styled from 'styled-components';
import { shade } from 'polished';

import db from '../../../db.json';

const AlternativesForm = styled.form`
  label {
    &[data-selected="true"] {
      background-color: ${({ theme }) => theme.colors.secondary};
      
      &[data-status="SUCCESS"] {
        background-color: ${({ theme }) => theme.colors.success};
      }
      &[data-status="ERROR"] {
        background-color: ${({ theme }) => theme.colors.wrong};
      }
    }
    
    &:focus {
      opacity: 1;
    } 

    &:hover {
      background: ${shade(0.2, db.theme.colors.secondary)};
      cursor: pointer;
    }
  }
  button {
    margin-top: 24px;
  }
`;

export default AlternativesForm;