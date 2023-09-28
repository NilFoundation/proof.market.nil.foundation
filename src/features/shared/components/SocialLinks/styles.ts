/**
 * @file Styles for SocialLinks component.
 */

import { PRIMITIVE_COLORS } from '@nilfoundation/ui-kit';
import type { StyleObject } from 'styletron-react';

// @import "@/styles/constants.scss";

// .socialLinks {
//   list-style: none;
//   padding-inline-start: 0;
//   display: flex;
//   justify-content: center;
//   margin-bottom: 0 !important;

//   > li {
//     padding: 4px 0;
//     width: 50px;
//     text-align: center;

//     > a {
//       color: $c-secondary-darker;
//       transition: color 0.1s ease;
//       font-size: 32px;

//       &:hover {
//         color: $c-secondary;
//       }
//     }
//   }
// }

// .bottomIndent {
//   margin-bottom: 24px !important;
// }

const container = (bottomIndent?: boolean): StyleObject => ({
  listStyle: 'none',
  paddingInlineStart: 0,
  display: 'flex',
  justifyContent: 'center',
  marginBottom: bottomIndent ? '2rem' : 0,
});

const item: StyleObject = {
  padding: '4px 0',
  width: '50px',
  textAlign: 'center',
};

const link: StyleObject = {
  color: PRIMITIVE_COLORS.gray300,
  transition: 'color 0.1s ease',
  fontSize: '32px',
  ':hover': {
    color: PRIMITIVE_COLORS.gray200,
  },
};

export const styles = {
  container,
  item,
  link,
};
