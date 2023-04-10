import { Strings } from '../../utils';
import { t } from '@apitable/widget-sdk';
import { BulbOutlined, ManageApplicationOutlined, InfoCircleOutlined } from '@apitable/icons';
import Settings from '../../../settings.json';

export const HELP_TOPIC_MAP = [
  {
    name: 'Examples',
    icon: BulbOutlined,
    list: [
      {
        text: t(Strings.help_topic_example_1),
        url: Settings.welcome_email_url
      },
      {
        text: t(Strings.help_topic_example_2),
        url: Settings.blog_post_url
      },
      {
        text: t(Strings.help_topic_example_3),
        url: Settings.product_announcement_url
      },
    ]
  },
  {
    name: 'Capabilities',
    icon: ManageApplicationOutlined,
    list: [
      {
        text: t(Strings.help_topic_capabilitie_1),
      },
      {
        text: t(Strings.help_topic_capabilitie_2),
      },
      {
        text: t(Strings.help_topic_capabilitie_3),
      },
    ]
  },
  {
    name: 'Prerequisite',
    icon: InfoCircleOutlined,
    list: [
      {
        text: t(Strings.help_topic_prerequisite_1),
      },
      {
        text: t(Strings.help_topic_prerequisite_2),
      },
      {
        text: t(Strings.help_topic_prerequisite_3),
      },
    ]
  },
];