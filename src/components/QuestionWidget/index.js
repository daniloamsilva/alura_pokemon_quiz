import styled from 'styled-components';

import Button from '../Button';
import Widget from '../Widget';
import AlternativesForm from '../AlternativeForm';
import db from '../../../db.json';

const StatusPoints = styled.p`
  padding-bottom: 0;
  text-align: center;
  background-color: ${db.theme.colors.secondary};
  margin: 0 35px;
  border-radius: 5px;
  padding: 10px;
`;

const StatusSuccess = styled.p`
  padding-bottom: 0;
  text-align: center;
  background-color: ${db.theme.colors.success};
  margin: 0 35px;
  border-radius: 5px;
  padding: 10px;
`;

const StatusWrong = styled.p`
  padding-bottom: 0;
  text-align: center;
  background-color: ${db.theme.colors.wrong};
  margin: 0 35px;
  border-radius: 5px;
  padding: 10px;
`;

const QuestionWidget = (
  { 
    question, 
    onSubmit,
    selectedAlternative,
    setSelectedAlternative,
    isCorrect, 
    isQuestionsSubmited,
    points,
  }
  ) => {

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById('question_image').style.filter = 'brightness()';
    onSubmit();
  }

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {question.title}
        </h3>
      </Widget.Header>

      <Widget.Image src={question.image} id="question_image" />

      { !isQuestionsSubmited && <StatusPoints>Você está com {points} ponto{points == 1 ? '' : 's'}!</StatusPoints> }
      { isQuestionsSubmited && isCorrect && <StatusSuccess>Resposta correta!</StatusSuccess> }
      { isQuestionsSubmited && !isCorrect && <StatusWrong>Resposta errada. Era o {question.answer}!</StatusWrong> }

      <Widget.Content>
        <AlternativesForm onSubmit={handleSubmit} >
          {question.alternatives.map((alternative, index) => {
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';

            return (
              <Widget.Topic
                as="label"
                key={`alternative${index}`}
                htmlFor={`alternative${index}`}
                data-selected={selectedAlternative === alternative}
                data-status={isQuestionsSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={`alternative${index}`}
                  name="question"
                  onChange={() => setSelectedAlternative(alternative)}
                  type="radio"
                />
                {alternative.charAt(0).toUpperCase() + alternative.slice(1)}
              </Widget.Topic>
            )
          })}
          
          <Button type="submit" disabled={!selectedAlternative || isQuestionsSubmited}>
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

export default QuestionWidget;