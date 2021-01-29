import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import Widget from '../Widget';
import BackLinkArrow from '../BackLinkArrow';

import db from '../../../db.json';

const Badge = styled.img`
  margin: 15px 10px;
`;

const ResultWidget = ({points}) => {
  const [result, setResult] = useState(0);

  useEffect(() => {
    let range = 0

    if(points >= 6) range++;
    if(points >= 24) range++;
    if(points >= 42) range++;
    if(points >= 60) range++;
    if(points >= 78) range++;
    if(points >= 96) range++;
    if(points >= 114) range++;
    if(points >= 132) range++;
    if(points >= 151) range++;

    setResult(range);
  }, []);

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href={'/'} />
        Tela de Resultado
      </Widget.Header>

      <Widget.Content
        as={motion.div}
        transition={{ delay: 0, duration: 0.8 }}
        variants={{
          show: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        initial="hidden"
        animate="show"
      >
        <p><strong>Total:</strong> {points} ponto{points == 1 ? '' : 's'}!</p>

        {db.badges.map((badge, index) => {
          if (index < result) {
            return (
              <Badge key={`badge${index}`} src={badge} />
            )
          }
        })}

        {result == 0 && <p>Continue a pegar todos eles!</p>}
        {result >= 1 && result <= 8 && <p>Parabéns! Você ganhou {result} insígnia{result == 1 ? '' : 's'}.</p>}
        {result == 9 && <p>Parabéns! Você é um verdadeiro <strong>Mestre Pokémon</strong>!</p>}

      </Widget.Content>
    </Widget>
  );
}

export default ResultWidget;