import React, { FC } from 'react';
import { isEqual, omit } from 'lodash';
import { Form } from '@apitable/components';
import { RuntimeEnv, useFields, useMeta, useSettingsButton } from '@apitable/widget-sdk';
import { FormWrapper } from './styled';
import { getUiSchema, getSchema } from '../../model';

interface IFormDataProps {
  apiKey: string;
  resultCount: number;
  promptFieldId: string;
  resultFieldId: string;
}

interface ISettingProps {
  viewId: string;
  editable: boolean;
  formData: IFormDataProps;
  setFormData: (formData: IFormDataProps) => void;
  setApiKey: (key: string) => void;
}

export const Setting: FC<ISettingProps> = (props) => {
  const { viewId, editable, formData, setFormData, setApiKey } = props;
  const { runtimeEnv } = useMeta();
  const fields = useFields(viewId);
  const [isSettingOpened] = useSettingsButton();

  const onChange = (data) => {
    const curFormData = data.formData;
    const curApiKey = curFormData.apiKey;
    const prevApiKey = formData.apiKey;
    if (curApiKey !== prevApiKey) {
      setApiKey(curApiKey);
      localStorage.setItem('WIDGET_CHAT_API_KEY', curApiKey);
    }
    const finalFormData = omit(curFormData, 'apiKey');
    if (isEqual(finalFormData, omit(formData, 'apiKey'))) return;
    setFormData(finalFormData as IFormDataProps);
  };

  return (
    <FormWrapper 
      readOnly={!editable}
      openSetting={runtimeEnv == RuntimeEnv.Desktop && isSettingOpened} 
    >
      <Form
        formData={formData}
        uiSchema={getUiSchema(viewId)}
        schema={getSchema(fields) as any}
        onChange={onChange}
        liveValidate
        children={<></>}
      />
    </FormWrapper>
  );
};
