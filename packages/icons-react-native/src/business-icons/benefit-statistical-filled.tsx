import { Image } from 'react-native';
import type { BusinessIconImageProps } from '../businessTypes';

const dataUri =
  'data:image/svg+xml;utf8,%3Csvg%0A%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20viewBox%3D%220%200%2024%2024%22%0A%20%20fill%3D%22var(--business-icon-primary-color)%22%0A%3E%0A%20%20%3Cg%20transform%3D%22translate(-0.241927%200.500008)%20scale(0.741935)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M32%2014V13.9751C32%206.25497%2025.7297%200%2018%200V14H32Z%22%20%2F%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20d%3D%22M15.5%2016.5258V2C7.4899%202%201%208.49421%201%2016.5V16.5258C1.01292%2024.523%207.49852%2031%2015.5%2031C23.5015%2031%2029.9871%2024.523%2030%2016.5258H15.5Z%22%0A%20%20%20%20%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A';

const BenefitStatisticalFilled = ({
  size = 24,
  width,
  height,
  source,
  ...props
}: BusinessIconImageProps) => (
  <Image
    {...props}
    source={source ?? { uri: dataUri }}
    style={[{ width: width ?? size, height: height ?? size }, props.style]}
  />
);

export default BenefitStatisticalFilled;
