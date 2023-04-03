import React, { FC } from 'react';
import { Button } from '@apitable/components';
import { t, useViewport } from '@apitable/widget-sdk';
import { Strings } from '../../utils';
import { WelcomeContainerStyled, WelcomeImgStyled, WelcomeSloganStyled } from './styled';

export const Welcome: FC = () => {
  const { toggleFullscreen } = useViewport();

  return (
    <WelcomeContainerStyled>
      <WelcomeImgStyled 
        src="https://legacy-s1.apitable.com/space/2023/03/31/a963ea47d91c48c3bc4880b66dc9c9cc" 
      />
      <WelcomeSloganStyled>
        {t(Strings.ai_content_creator)}
      </WelcomeSloganStyled>
      <Button 
        color='primary' 
        onClick={() => toggleFullscreen(true)}
        style={{ marginTop: 30 }}
      >
        {t(Strings.lets_chart)}
      </Button>
    </WelcomeContainerStyled>
  );
}