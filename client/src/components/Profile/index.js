import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../UserContext";

const Profile = () => {
  const {
    state: { currentUser },
    actions: {},
  } = useContext(UserContext);

  return (
    <Wrapper>
      <h2>Profile</h2>

      <WrapperHeader>
        <ProfileImage src="https://picsum.photos/300" alt="profle image" />
        <WrapperText>
          <TextName>{currentUser && currentUser.name}</TextName>
          <Text>@{currentUser && currentUser.email}</Text>
        </WrapperText>
      </WrapperHeader>

      <WrapperHistory>
        <h2>History</h2>

        <ul>
          <li>Purchased #1</li>
        </ul>
      </WrapperHistory>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    padding: 20px;
    font-size: 2em;
    text-align: center;
  }
`;

const WrapperHeader = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperHistory = styled.div``;

const ProfileImage = styled.img`
  width: 300px;
  outline: var(--warning) solid 5px;
  border-radius: 50%;
`;
const WrapperText = styled.div`
  padding: 20px;
`;
const TextName = styled.p`
  font-size: 1.75em;
  font-weight: bold;
`;
const Text = styled.div`
  font-size: 1.1em;
`;

export default Profile;
