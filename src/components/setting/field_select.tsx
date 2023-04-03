import React from 'react';
import { WidgetProps } from '@rjsf/core';
import { applyDefaultTheme, ITheme, Select, IOption, useTheme } from '@apitable/components';
import { FieldType, Field, useFields, useField, t } from '@apitable/widget-sdk';
import {
  ColumnAttachmentFilled,
  ColumnAutonumberFilled,
  AccountFilled,
  ColumnLastmodifiedtimeFilled,
  ColumnTextFilled,
  ColumnCreatedbyFilled,
  ColumnCreatedtimeFilled,
  ColumnCurrencyFilled,
  ColumnPercentFilled,
  ColumnFigureFilled,
  ColumnMultipleFilled,
  ColumnCalendarNonzeroFilled,
  ColumnLinktableFilled,
  ColumnUrlOutlined,
  ColumnRatingFilled,
  ColumnEmailNonzeroFilled,
  ColumnLastmodifiedbyFilled,
  ColumnLongtextFilled,
  ColumnPhoneFilled,
  ColumnLookupNonzeroFilled,
  ColumnSingleNonzeroFilled, 
  ColumnFormulaFilled,
  ColumnCheckboxFilled,
} from '@apitable/icons';
import styled from 'styled-components';
import { Strings } from '../../utils';

const FieldIconMap = {
  [FieldType.Text]: ColumnLongtextFilled,
  [FieldType.Number]: ColumnFigureFilled,
  [FieldType.SingleSelect]: ColumnSingleNonzeroFilled,
  [FieldType.MultiSelect]: ColumnMultipleFilled,
  [FieldType.DateTime]: ColumnCalendarNonzeroFilled,
  [FieldType.Attachment]: ColumnAttachmentFilled,
  [FieldType.MagicLink]: ColumnLinktableFilled,
  [FieldType.URL]: ColumnUrlOutlined,
  [FieldType.Email]: ColumnEmailNonzeroFilled,
  [FieldType.Phone]: ColumnPhoneFilled,
  [FieldType.Checkbox]: ColumnCheckboxFilled,
  [FieldType.Rating]: ColumnRatingFilled,
  [FieldType.Member]: AccountFilled,
  [FieldType.MagicLookUp]: ColumnLookupNonzeroFilled,
  [FieldType.Formula]: ColumnFormulaFilled,
  [FieldType.Currency]: ColumnCurrencyFilled,
  [FieldType.Percent]: ColumnPercentFilled,
  [FieldType.SingleText]: ColumnTextFilled,
  [FieldType.AutoNumber]: ColumnAutonumberFilled,
  [FieldType.CreatedTime]: ColumnCreatedtimeFilled,
  [FieldType.LastModifiedTime]: ColumnLastmodifiedtimeFilled,
  [FieldType.CreatedBy]: ColumnCreatedbyFilled,
  [FieldType.LastModifiedBy]: ColumnLastmodifiedbyFilled,
};

const ErrorText = styled.div.attrs(applyDefaultTheme)`
  font-size: 10px;
  padding: 4px 0 0 8px;
  color: ${(props) => props.theme.palette.danger};
`;

const transformOptions = (enumOptions: { label: string, value: any }[], theme: ITheme, fields: Field[], availableFieldTypes: FieldType[]) => {
  const fieldMap = new Map(fields.map(field => [field.id, field]));
  return enumOptions.map(option => {
    const { value, label } = option;
    const res = {
      label,
      value,
    };
    const field = fieldMap.get(option.value);
    if (!field) {
      return res;
    }
    const FieldIcon = FieldIconMap[field.type];
    return {
      ...res,
      disabled: !availableFieldTypes.includes(field.type),
      prefixIcon: <FieldIcon color={theme.palette.text.third} />,
    };
  }).filter(Boolean) as IOption[];
};

export const FieldSelect = (props: WidgetProps) => {
  const { viewId, options: { enumOptions }, value: fieldId, onChange, rawErrors, availableFieldTypes } = props;
  console.log('fieldId', fieldId);
  const theme = useTheme();
  const fields = useFields(viewId);
  const field = useField(fieldId);
  const _options: IOption[] = transformOptions(enumOptions as any, theme, fields, availableFieldTypes);
  const hasError = fieldId && !field;
  const style = hasError ? { border: '1px solid red', width: '100%' } : { width: '100%', marginBottom: 8 };
  return <>
    <Select
      placeholder={t(Strings.pick_one_option)}
      options={_options}
      value={fieldId}
      triggerStyle={{
        ...style,
        backgroundColor: theme.color.bgControlsDefault
      }}
      onSelected={(option) => onChange(option.value)}
      hideSelectedOption={!field}
      dropdownMatchSelectWidth
      openSearch={_options.length > 7}
      searchPlaceholder={t(Strings.search)}
    />
    {
      hasError && <ErrorText>{t(Strings.option_field_had_been_deleted)}</ErrorText>
    }
  </>;
};
