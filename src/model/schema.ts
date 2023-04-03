import { Field, t } from '@apitable/widget-sdk';
import { Strings } from '../utils';

export const getSchema = (fields: Field[]) => {
  const fieldIds = fields.map(f => f.id);
  const fieldNames = fields.map(f => f.name);

  return {
    type: 'object',
    title: t(Strings.widget_settings),
    properties: {
      apiKey: {
        title: t(Strings.open_ai_apikey),
        type: 'string',
      },
      promptFieldId: {
        title: t(Strings.select_the_prompt_field),
        type: 'string',
        enum: fieldIds,
        enumNames: fieldNames,
      },
      resultCount: {
        title: t(Strings.choices),
        type: 'number',
      },
      resultFieldId: {
        title: t(Strings.save_result_to_field),
        type: 'string',
        enum: fieldIds,
        enumNames: fieldNames,
      },
    },
  };
}