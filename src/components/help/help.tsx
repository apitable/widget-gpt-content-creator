import React, { FC } from 'react';
import { HELP_TOPIC_MAP } from './config';
import { useThemeColors } from '@apitable/components';
import { HelpContainerStyled, HelpItemContentStyled, HelpItemStyled, HelpTopicNameStyled, HelpTopicStyled } from './styled';

export const Help: FC = () => {
  const colors = useThemeColors();

  return (
    <HelpContainerStyled>
      {
        HELP_TOPIC_MAP.map((topic, index) => {
          const { name, list } = topic;
          const Icon = topic.icon;

          return (
            <HelpTopicStyled key={index}>
              <Icon size={20} color={colors.textCommonPrimary} />
              <HelpTopicNameStyled>
                {name}
              </HelpTopicNameStyled>
              {
                list.map((item, index) => {
                  return (
                    <HelpItemStyled key={index}>
                      <HelpItemContentStyled>
                        {item.text}
                      </HelpItemContentStyled>
                    </HelpItemStyled>
                  );
                })
              }
            </HelpTopicStyled>
          )
        })
      }
    </HelpContainerStyled>
  );
}