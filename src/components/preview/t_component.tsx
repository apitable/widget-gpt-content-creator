import React, { FC, ReactNode, Fragment, PropsWithChildren, createElement } from 'react';

interface I18nProps {
  tkey: string;
  params: {
    [key: string]: ReactNode;
  };
}

export const TComponent: FC<PropsWithChildren<I18nProps>> = (props) => {
  const { tkey, params } = props;
  const text= tkey;
  const keys = Object.keys(params);

  if (keys.length === 0) return <>{tkey}</>;

  const startKey = keys[0];
  const keyReg = new RegExp('\\${' + startKey + '}', 'g');
  const component = params[startKey];
  delete params[startKey];
  const segments = text.split(keyReg);

  return (
    <>
      {segments.map((segment: string, index: number) => {
        const isPureString = !segment.includes('${');
        const showComponent = index !== segments.length - 1;
        return (
          <Fragment key={index}>
            {isPureString ? segment : createElement(TComponent, { tkey: segment, params })}
            {showComponent && component}
          </Fragment>
        );
      })}
    </>
  );
};