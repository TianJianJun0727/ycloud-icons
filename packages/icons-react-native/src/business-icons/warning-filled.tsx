import { Image } from 'react-native';
import type { BusinessIconImageProps } from '../businessTypes';

const dataUri =
  'data:image/svg+xml;utf8,%3Csvg%0A%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20viewBox%3D%220%200%2024%2024%22%0A%20%20fill%3D%22var(--business-icon-primary-color)%22%0A%3E%0A%20%20%3Cg%20transform%3D%22translate(-2.793252%20-3.405015)%20scale(1.232771)%22%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20d%3D%22M4.47%2021h15.06c1.54%200%202.5-1.67%201.73-3L13.73%204.99c-.77-1.33-2.69-1.33-3.46%200L2.74%2018c-.77%201.33.19%203%201.73%203zM12%2014c-.55%200-1-.45-1-1v-2c0-.55.45-1%201-1s1%20.45%201%201v2c0%20.55-.45%201-1%201zm1%204h-2v-2h2v2z%22%0A%20%20%20%20%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A';

const WarningFilled = ({ size = 24, width, height, source, ...props }: BusinessIconImageProps) => (
  <Image
    {...props}
    source={source ?? { uri: dataUri }}
    style={[{ width: width ?? size, height: height ?? size }, props.style]}
  />
);

export default WarningFilled;
