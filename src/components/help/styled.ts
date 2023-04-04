import styled from 'styled-components';

export const HelpContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  color: var(--textCommonPrimary);
  overflow: auto;
`;

export const HelpTopicStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;

  &:nth-child(n + 2) {
    margin-left: 40px;
  }
`;

export const HelpTopicNameStyled = styled.div`
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const HelpItemStyled = styled.div`
  margin-top: 16px;
  padding: 8px 16px;
  height: 52px;
  border-radius: 4px;
  background-color: var(--bgCommonDefault);
`;

export const HelpItemContentStyled = styled.div`
  width: 100%;
  height: 100%;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;