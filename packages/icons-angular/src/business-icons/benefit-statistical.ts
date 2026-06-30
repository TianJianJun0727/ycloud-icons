export const benefitStatisticalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
  <path d="M32 14V13.9751C32 6.25497 25.7297 0 18 0V14H32Z" />
  <path
    d="M15.5 16.5258V2C7.4899 2 1 8.49421 1 16.5V16.5258C1.01292 24.523 7.49852 31 15.5 31C23.5015 31 29.9871 24.523 30 16.5258H15.5Z"
  />
</svg>
`;
export const benefitStatisticalDataUri =
  'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20d%3D%22M32%2014V13.9751C32%206.25497%2025.7297%200%2018%200V14H32Z%22%20%2F%3E%0A%20%20%3Cpath%0A%20%20%20%20d%3D%22M15.5%2016.5258V2C7.4899%202%201%208.49421%201%2016.5V16.5258C1.01292%2024.523%207.49852%2031%2015.5%2031C23.5015%2031%2029.9871%2024.523%2030%2016.5258H15.5Z%22%0A%20%20%2F%3E%0A%3C%2Fsvg%3E%0A';
export const benefitStatisticalIcon = {
  name: 'benefit-statistical',
  colorMode: 'mono',
  svg: benefitStatisticalSvg,
  dataUri: benefitStatisticalDataUri,
} as const;

export default benefitStatisticalIcon;
