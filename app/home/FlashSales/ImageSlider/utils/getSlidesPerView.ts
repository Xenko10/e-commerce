export const getSlidesPerView = (
  isSmartphone: boolean,
  isSmallScreen: boolean,
  isMediumScreen: boolean,
) => {
  if (isSmartphone) {
    return 1;
  }

  if (isSmallScreen) {
    return 2;
  }

  if (isMediumScreen) {
    return 3;
  }

  return 4;
};
