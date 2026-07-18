import { Image } from 'react-native';
import type { BusinessIconImageProps } from '../businessTypes';

const dataUri =
  'data:image/svg+xml;utf8,%3Csvg%0A%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20viewBox%3D%220%200%2024%2024%22%0A%20%20fill%3D%22var(--business-icon-primary-color)%22%0A%3E%0A%20%20%3Cg%20transform%3D%22translate(-2.1%20-2.1)%20scale(1.175)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0V0z%22%20fill%3D%22none%22%20opacity%3D%22.87%22%20%2F%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20d%3D%22M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm4.3%2014.3c-.39.39-1.02.39-1.41%200L12%2013.41%209.11%2016.3c-.39.39-1.02.39-1.41%200-.39-.39-.39-1.02%200-1.41L10.59%2012%207.7%209.11c-.39-.39-.39-1.02%200-1.41.39-.39%201.02-.39%201.41%200L12%2010.59l2.89-2.89c.39-.39%201.02-.39%201.41%200%20.39.39.39%201.02%200%201.41L13.41%2012l2.89%202.89c.38.38.38%201.02%200%201.41z%22%0A%20%20%20%20%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A';

const ErrorFilled = ({ size = 24, width, height, source, ...props }: BusinessIconImageProps) => (
  <Image
    {...props}
    source={source ?? { uri: dataUri }}
    style={[{ width: width ?? size, height: height ?? size }, props.style]}
  />
);

export default ErrorFilled;
