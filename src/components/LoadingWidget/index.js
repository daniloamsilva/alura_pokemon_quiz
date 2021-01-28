import Widget from '../Widget';

const LoadingWidget = () => {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <p>Vai ser rápido... (ou não)</p>
      </Widget.Content>
    </Widget>
  );
}

export default LoadingWidget;