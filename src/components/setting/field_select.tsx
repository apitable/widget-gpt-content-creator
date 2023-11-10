import React from 'react';
import { WidgetProps } from '@rjsf/core';
import { applyDefaultTheme, ITheme, Select, IOption, useTheme } from '@apitable/components';
import {FieldType, Field, useFields, useField, t, FieldIconMap} from '@apitable/widget-sdk';
import styled from 'styled-components';
import { Strings } from '../../utils';


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
      prefixIcon: FieldIcon ? <FieldIcon color={theme.palette.text.third} /> : null,
    };
  }).filter(Boolean) as IOption[];
};

export const FieldSelect = (props: WidgetProps) => {
  const { viewId, options: { enumOptions }, value: fieldId, onChange, availableFieldTypes } = props;
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
