import { Image } from 'react-native';
import type { BusinessIconImageProps } from '../businessTypes';

const dataUri =
  'data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cg%20transform%3D%22translate(-2.117652%20-2.117652)%20scale(1.176471)%22%3E%0A%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20%20%20d%3D%22M4%2010.5L12%203.5L20%2010.5V18.5C20%2019.0304%2019.7893%2019.5391%2019.4142%2019.9142C19.0391%2020.2893%2018.5304%2020.5%2018%2020.5H6C5.46957%2020.5%204.96086%2020.2893%204.58579%2019.9142C4.21071%2019.5391%204%2019.0304%204%2018.5V10.5Z%22%0A%20%20%20%20%20%20%20%20%20%20stroke%3D%22currentColor%22%0A%20%20%20%20%20%20%20%20%20%20stroke-width%3D%221.5%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linecap%3D%22round%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linejoin%3D%22round%22%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20%20%20d%3D%22M9%2015.5H15%22%0A%20%20%20%20%20%20%20%20%20%20stroke%3D%22currentColor%22%0A%20%20%20%20%20%20%20%20%20%20stroke-width%3D%221.5%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linecap%3D%22round%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linejoin%3D%22round%22%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A';

const HomeOutlined = ({ size = 24, width, height, source, ...props }: BusinessIconImageProps) => (
  <Image
    {...props}
    source={source ?? { uri: dataUri }}
    style={[{ width: width ?? size, height: height ?? size }, props.style]}
  />
);

export default HomeOutlined;
