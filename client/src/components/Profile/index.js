import { useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../../UserContext";
import Loading from "../../Loading";

const Profile = () => {
  const {
    state: { currentUser, purchasesHistory, status },
    actions: { getUserBuyingHistory, setLoading },
  } = useContext(UserContext);

  useEffect(() => {
    const history = async () => {
      await setLoading({ status: "loading" });
      await getUserBuyingHistory();
    };
    history();
  }, [currentUser]);

  return (
    <Wrapper>
      <h2>Profile</h2>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <WrapperHeader>
            <ProfileImage src="https://picsum.photos/300" alt="profle image" />
            <WrapperText>
              <TextName>{currentUser && currentUser.name}</TextName>
              <Text>@{currentUser && currentUser.email}</Text>
            </WrapperText>
          </WrapperHeader>

          <WrapperHistory>
            <h2>History</h2>
            <HistoryList>
              {purchasesHistory &&
                purchasesHistory.map((purchase) => {
                  return (
                    <HistoryListItem key={`history-list-${purchase._id}`}>
                      <Text key={`history-purchase-${purchase._id}`}>
                        Purchase # {purchase._id}
                      </Text>
                      {purchase.itemIds.map((item) => {
                        return (
                          <WrapperHistoryListItem
                            key={`history-wrapper-${item.itemId}`}
                          >
                            <Text key={`history-article-${item.itemId}`}>
                              Article # {item.itemId}
                            </Text>
                            <Text key={`history-qty-${item.itemId}`}>
                              QTY: {item.quantity}
                            </Text>
                          </WrapperHistoryListItem>
                        );
                      })}
                    </HistoryListItem>
                  );
                })}
            </HistoryList>
          </WrapperHistory>
        </>
      )}
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
const Text = styled.p`
  font-size: 1.1em;
`;

const HistoryList = styled.ul`
  border: 1px solid var(--font-color);
  padding: 20px;
`;
const HistoryListItem = styled.li``;

const WrapperHistoryListItem = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  p {
    padding: 20px;
  }
`;

export default Profile;
