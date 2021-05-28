import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;
`;

export const Header = styled.header`
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > a {
    color: var(--title-color);
    font-weight: bold;
    text-decoration: none;

    display: flex;
    align-items: center;

    > svg {
      margin-right: 16px;
      color: var(--primary-color);
    }
  }
`;

export const Form = styled.form`
  margin: 80px auto;
  padding: 64px;
  max-width: 730px;
  background: #fff;
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 36px;
  }

  > button {
    width: 260px;
    height: 56px;
    background: var(--primary-color);
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    margin-top: 40px;
    transition: background-color 0.2s;
    cursor: pointer;

    :hover {
      background: #2fb86e;
    }
  }
`;
