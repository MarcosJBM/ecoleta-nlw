import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import { Container, Content, Main } from './styles';

export const Home = () => {
  return (
    <Container>
      <Content>
        <header>
          <img src={logo} alt='Logo' />
        </header>

        <Main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>

          <Link to='/create-point'>
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </Main>
      </Content>
    </Container>
  );
};
