// assets
import { IconSettings, IconBox, IconCash } from '@tabler/icons';
// constant
const icons = {
    IconSettings,
    IconBox,
    IconCash
};

// ==============================|| USERS MENU ITEMS ||============================== //

const userActions = {
    id: 'useractions',
    title: 'User Management',
    type: 'group',
    children: [{
            id: 'util-users-admin',
            title: 'Admin',
            type: 'item',
            url: '/utils/util-users-admin',
            icon: icons.IconSettings,
            breadcrumbs: false,
            props : {}
        },
        {
            id: 'util-users-stockist',
            title: 'Stockist',
            type: 'item',
            url: '/utils/util-users-stockist',
            icon: icons.IconBox,
            breadcrumbs: false
        },
        {
            id: 'util-users-cashier',
            title: 'Cashier',
            type: 'item',
            url: '/utils/util-users-cashier',
            icon: icons.IconCash,
            breadcrumbs: false
        },
    ]
};

export default userActions;
