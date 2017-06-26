import _ from 'lodash';
import rootNavigation from '../constants/navigation';
import { isMenuActive } from '../navigation/utils';

function checkPermission(owns, wants) {
  return !wants || _.intersection(owns, wants).length > 0;
}

export function getAuthedNavigation(permissions = [], navigation) {
  return navigation.reduce((acc, menu) => {
    // Menu is not hidden and perm check passed
    if (checkPermission(permissions, menu.permissions)) {
      return acc.concat({
        ...menu,
        ...(menu.children ? {
          children: getAuthedNavigation(permissions, menu.children),
        } : {}),
      });
    }

    return acc;
  }, []);
}

export function getAuthedNavConfig() {
  return {
    ...rootNavigation,
    // children: getAuthedNavigation(permission, rootNavigation.children),
  };
}

const findFirstVisibleLink = nav => (nav.hidden
  ? undefined
  : (nav.link
    ? nav.link
    : nav.children
      ? (childrenWithLink => (
        childrenWithLink
          ? findFirstVisibleLink(childrenWithLink)
          : undefined
      ))(nav.children.find(findFirstVisibleLink))
      : undefined
  )
);

export function getFirstVisiblePath(permission) {
  const authedNavConfig = getAuthedNavConfig(permission);
  const hasVisibleNav = authedNavConfig.children.length > 0;

  return hasVisibleNav ? findFirstVisibleLink({ children: authedNavConfig.children }) : undefined;
}

export function checkPathVisible(path, permission) {
  const authedNavConfig = getAuthedNavConfig(permission);

  return isMenuActive(path, authedNavConfig);
}

