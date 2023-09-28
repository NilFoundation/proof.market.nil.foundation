/**
 * @file Constant data.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import {
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  TelegramIcon,
  DiscordIcon,
} from '@nilfoundation/ui-kit';

export const socialLinks = [
  {
    icon: 'twitter',
    url: 'https://twitter.com/nil_foundation',
    Component: TwitterIcon,
  },
  {
    icon: 'linkedin',
    url: 'https://www.linkedin.com/company/nil-foundation',
    Component: LinkedinIcon,
  },
  {
    icon: 'github',
    url: 'http://github.com/nilfoundation',
    Component: GithubIcon,
  },
  {
    icon: 'telegram',
    url: 'https://t.me/nilfoundation',
    Component: TelegramIcon,
  },
  {
    icon: 'discord',
    url: 'https://discord.gg/KmTAEjbmM3',
    Component: DiscordIcon,
  },
];
