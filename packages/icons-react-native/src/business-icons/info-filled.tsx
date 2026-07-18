import { Image } from 'react-native';
import type { BusinessIconImageProps } from '../businessTypes';

const dataUri =
  'data:image/svg+xml;utf8,%3Csvg%0A%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20viewBox%3D%220%200%2024%2024%22%0A%20%20fill%3D%22var(--business-icon-primary-color)%22%0A%3E%0A%20%20%3Cg%20transform%3D%22translate(-2.1%20-2.1)%20scale(1.175)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0V0z%22%20fill%3D%22none%22%20%2F%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm0%2015c-.55%200-1-.45-1-1v-4c0-.55.45-1%201-1s1%20.45%201%201v4c0%20.55-.45%201-1%201zm1-8h-2V7h2v2z%22%0A%20%20%20%20%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A';

const InfoFilled = ({ size = 24, width, height, source, ...props }: BusinessIconImageProps) => (
  <Image
    {...props}
    source={source ?? { uri: dataUri }}
    style={[{ width: width ?? size, height: height ?? size }, props.style]}
  />
);

export default InfoFilled;
