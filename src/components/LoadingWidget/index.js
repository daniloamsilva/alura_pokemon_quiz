import styled from 'styled-components';

import Widget from '../Widget';
import db from '../../../db.json';

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

const LoadingWidget = () => {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Image src={db.loading} alt="Carregando..."/>
      </Widget.Content>
    </Widget>
  );
}

export default LoadingWidget;