import React from 'react';
import { FieldType, t } from '@apitable/widget-sdk';
import { TextInput } from '@apitable/components';
import { FieldSelect } from '../components';
import { Strings } from '../utils';

export const getUiSchema = (viewId: string) => ({
  'ui:options': {
    help: {
      text: t(Strings.widget_settings),
      url: '',
    },
  },
  apiKey: {
    'ui:widget': props => {
      const { value, onChange } = props;
      return (
        <TextInput 
          type="password"
          value={value}
          block 
          autoFocus 
          onChange={(e) => onChange(e.target.value)}
        />
      );
    },
  },
  promptFieldId: {
    'ui:widget': props => (
      <FieldSelect 
        {...props} 
        viewId={viewId} 
        availableFieldTypes={[FieldType.Text, FieldType.SingleText, FieldType.Formula]} 
      />
    ),
  },
  resultFieldId: {
    'ui:widget': props => (
      <FieldSelect 
        {...props} 
        viewId={viewId} 
        availableFieldTypes={[FieldType.Text, FieldType.SingleText]}
      />
    ),
  },
});