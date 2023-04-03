import React, { FC, useMemo, useState } from 'react';
import { initializeWidget, useActiveViewId, useCloudStorage, useViewIds, useViewport } from '@apitable/widget-sdk';
import { Help, Preview, Setting, Welcome } from './components';

export const Main: FC = () => {
  const viewIds = useViewIds();
  const activeViewId = useActiveViewId();
  const viewId = activeViewId || viewIds[0];
  const { isFullscreen } = useViewport();
  const [apiKey, setApiKey] = useState(localStorage.getItem('WIDGET_CHAT_API_KEY') || '');
  const [formData, setFormData, editable] = useCloudStorage('FormData', {
    promptFieldId: '',
    resultFieldId: '',
    resultCount: 1,
  });

  const realFormData = useMemo(() => {
    return {
      ...formData,
      apiKey
    };
  }, [formData, apiKey]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {
        !formData.promptFieldId ? 
          (
            isFullscreen ?
              <Help /> :
              <Welcome />
          ) :
          <Preview
            viewId={viewId}
            apiKey={apiKey}
            resultCount={formData.resultCount}
            promptFieldId={formData.promptFieldId}
            resultFieldId={formData.resultFieldId}
          />
      }
      <Setting
        viewId={viewId}
        editable={editable}
        formData={realFormData}
        setFormData={setFormData}
        setApiKey={setApiKey}
      />
    </div>
  );
};

initializeWidget(Main, process.env.WIDGET_PACKAGE_ID);
