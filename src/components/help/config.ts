import { Strings } from '../../utils';
import { t } from '@apitable/widget-sdk';
import { BulbOutlined, ManageApplicationOutlined, InfoCircleOutlined } from '@apitable/icons';

export const HELP_TOPIC_MAP = [
  {
    name: 'Examples',
    icon: BulbOutlined,
    list: [
      {
        text: t(Strings.help_topic_example_1),
        url: '#'
      },
      {
        text: t(Strings.help_topic_example_2),
        url: '#'
      },
      {
        text: t(Strings.help_topic_example_3),
        url: '#'
      },
    ]
  },
  {
    name: 'Capabilities',
    icon: ManageApplicationOutlined,
    list: [
      {
        text: t(Strings.help_topic_capabilitie_1),
        url: '#'
      },
      {
        text: t(Strings.help_topic_capabilitie_2),
        url: '#'
      },
      {
        text: t(Strings.help_topic_capabilitie_3),
        url: '#'
      },
    ]
  },
  {
    name: 'Prerequisite',
    icon: InfoCircleOutlined,
    list: [
      {
        text: t(Strings.help_topic_prerequisite_1),
        url: '#'
      },
      {
        text: t(Strings.help_topic_prerequisite_2),
        url: '#'
      },
      {
        text: t(Strings.help_topic_prerequisite_3),
        url: '#'
      },
    ]
  },
];