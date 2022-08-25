import { ReactElement } from 'react';
import { Dropdown } from '../Dropdown';
import { navigationLinks } from '../../constants';
import './MobileMenu.scss';

type MobileMenuProps = {
    className?: string;
}

export const MobileMenu = ({className}: MobileMenuProps): ReactElement => {
    return (
        <Dropdown className={`mobileMenu ${className ? className : ''}`}>
            <Dropdown.Button
                iconNameDropdownClosed="bars"
                iconNameDropdownOpend="times"
            />
            <Dropdown.Menu>
                {
                    navigationLinks.map(({title, link}) =>
                        <Dropdown.Item
                            href={link}
                            key={title}
                        >
                            {title}
                        </Dropdown.Item>)
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};
