import styled from "styled-components";

function NoPhotos() {
  return (
    <Container>
      <Text> There are no photos available</Text>
    </Container>
  );
}

export default NoPhotos;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  text-decoration: none;
  font-size: 2em;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: inherit;
  font-family: Arial, Helvetica, sans-serif;
`;
