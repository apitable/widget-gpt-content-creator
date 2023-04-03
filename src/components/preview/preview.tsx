import React, { FC, useEffect, useState } from 'react';
import { Avatar, Button, IconButton, Message } from '@apitable/components';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@apitable/icons';
import { t, useActiveCell, useDatasheet, useField, useRecord, useRecords, useSession } from '@apitable/widget-sdk';
import { GenerationAnnounce, PaginationIndex, PreviewAvatar, PreviewContainer, PreviewContent, PreviewFooter, PreviewItem, PreviewSection, PreviewWrapper, RecordPagination } from './styled';
import { Strings } from '../../utils';
import { TComponent } from './t_component';
import { getFirstWordFromString, getMessageFromOpenAI } from './utils';

interface IChatChoice {
  message: {
    content: string;
  };
  isError?: boolean;
}

interface IChatResponse {
  choices: IChatChoice[];
  error?: string | {
    code: number;
    message: string;
  };
}

interface IPreviewPanelProps {
  apiKey: string;
  viewId: string;
  resultCount?: number;
  promptFieldId: string;
  resultFieldId?: string;
}

export const Preview: FC<IPreviewPanelProps> = (props) => {
  const { viewId, apiKey, resultCount = 1, promptFieldId, resultFieldId } = props;
  const field = useField(promptFieldId);
  const datasheet = useDatasheet();
  const activeCell = useActiveCell();
  const activeRecord = useRecord(activeCell?.recordId);
  const records = useRecords(viewId);
  const previewRecord = activeRecord || records[0];
  const [activeIndex, setActiveIndex] = useState(records.findIndex(record => record.id === previewRecord.id) || 0);
  const [loading, setLoading] = useState<boolean>(false);
  const [promptText, setPromptText] = useState<string>('');
  const [resultList, setResultList] = useState<IChatChoice[]>([]);
  const { user } = useSession();
  const { name, avatar } = user;

  useEffect(() => {
    const index = records.findIndex(record => record.id === previewRecord.id) || 0;
    setActiveIndex(index);
  }, [previewRecord])

  useEffect(() => {
    if (field == null) return; 
    const activeRecord = records[activeIndex];
    const text = activeRecord?.getCellValueString(field.id) || '';
    setPromptText(text.trim());
    setResultList([]);
  }, [promptFieldId, activeIndex]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!apiKey || !promptText) return;
    setLoading(true);

    try {
      const response = await getMessageFromOpenAI(apiKey, promptText, resultCount)
      const data: IChatResponse = await response.json();

      if (response.status !== 200) {
        const errorMessage = typeof data.error === 'string' ? data.error : data.error?.message;
        setResultList([{
          message: { content: errorMessage || t(Strings.request_failed) },
          isError: true
        }]);
        return setLoading(false);
      }
      setResultList(data.choices);
    } catch (error) {
      setResultList([{
        message: { content: t(Strings.request_failed) },
        isError: true
      }]);
    }
    setLoading(false);
  };

  const onFillData = async (message: string) => {
    if (!resultFieldId) return;
    const recordId = records[activeIndex].id;
    const valuesMap = { [resultFieldId]: message.trim() };
    const setRecordCheckResult = datasheet?.checkPermissionsForSetRecord(recordId, valuesMap);

    if (!setRecordCheckResult?.acceptable) {
      return Message.error({ content: setRecordCheckResult?.message || t(Strings.default_permission_check_tips) });
    }
    await datasheet?.setRecord(recordId, valuesMap)
  }

  return (
    <PreviewWrapper>
      <PreviewContainer>
        <PreviewContent>
          {
            promptText && 
            <PreviewSection>
              <Avatar 
                size="s"
                src={avatar === '' ? undefined : avatar}
                shape={'square'}
                style={{ marginRight: 16 }}
              >
                {getFirstWordFromString(name || '')}
              </Avatar>
              <PreviewItem style={{ background: 'var(--bgBrandLightDefault)' }}>
                {promptText}
              </PreviewItem>
            </PreviewSection>
          }
          {
            resultList.map((item, index) => {
              const message = item.message.content;
              const isError = item.isError;

              return (
                <PreviewSection key={index}>
                  <PreviewAvatar 
                    referrerPolicy="no-referrer"
                    src="https://s1.apitable.com/space/2023/03/31/a963ea47d91c48c3bc4880b66dc9c9cc" 
                  />
                  <PreviewItem 
                    key={index}
                    style={{ background: isError ? 'var(--bgDangerLightDefault)' : 'var(--bgControlsDefault)' }}
                  >
                    {message}
                    {
                      !isError &&
                      <Button
                        color="primary" 
                        size="small"
                        style={{ marginTop: 8 }}
                        onClick={() => onFillData(message)}
                      >
                        {t(Strings.add_to_cell)}
                      </Button>
                    }
                  </PreviewItem>
                </PreviewSection>
              )
            })
          }
          {
            Boolean(resultList.length) &&
            <GenerationAnnounce>
              {t(Strings.generation_announce)}
            </GenerationAnnounce>
          }
        </PreviewContent>
      </PreviewContainer>

      <PreviewFooter>
        <RecordPagination>
          <IconButton 
            shape='square'
            icon={ChevronLeftOutlined}
            onClick={() => setActiveIndex(Math.max(activeIndex - 1, 0))}
          />
          <PaginationIndex>
            <TComponent
              tkey={t(Strings.position_of_the_record)}
              params={{
                index: activeIndex + 1,
              }}
            />
          </PaginationIndex>
          <IconButton 
            shape='square'
            icon={ChevronRightOutlined} 
            onClick={() => setActiveIndex(Math.min(activeIndex + 1, records.length))}
          />
        </RecordPagination>
        <Button
          color="primary" 
          size="middle"
          onClick={onSubmit}
          loading={loading}
        >
          {t(Strings.generate)}
        </Button>
      </PreviewFooter>
    </PreviewWrapper>
  );
};