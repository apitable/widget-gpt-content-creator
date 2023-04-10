import React, { FC } from 'react';
import { HELP_TOPIC_MAP } from './config';
import { useThemeColors } from '@apitable/components';
import { HelpContainerStyled, HelpItemContentStyled, HelpItemLinkContentStyled, HelpItemStyled, HelpTopicNameStyled, HelpTopicStyled, HelpTopicWrapperStyled } from './styled';

export const Help: FC = () => {
  const colors = useThemeColors();

  return (
    <HelpContainerStyled>
      {
        HELP_TOPIC_MAP.map((topic, index) => {
          const { name, list } = topic;
          const Icon = topic.icon;

          return (
            <HelpTopicWrapperStyled key={index}>
              <HelpTopicStyled>
                <Icon size={24} color={colors.textCommonPrimary} />
                <HelpTopicNameStyled>
                  {name}
                </HelpTopicNameStyled>
                {
                  list.map((item, index) => {
                    const ContentStyled = item?.url ? HelpItemLinkContentStyled : HelpItemContentStyled;
                    return (
                      <HelpItemStyled key={index}>
                        <ContentStyled 
                          href={item?.url} 
                          target='_blank'
                        >
                          {item.text}
                        </ContentStyled>
                      </HelpItemStyled>
                    );
                  })
                }
              </HelpTopicStyled>
            </HelpTopicWrapperStyled>
          )
        })
      }
    </HelpContainerStyled>
  );
}