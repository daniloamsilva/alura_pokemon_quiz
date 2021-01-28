import Widget from '../Widget';

const ResultWidget = ({points}) => {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado
      </Widget.Header>

      <Widget.Content>
        Você fez {points} ponto{points == 1 ? '' : 's'}!
      </Widget.Content>
    </Widget>
  );
}

export default ResultWidget;