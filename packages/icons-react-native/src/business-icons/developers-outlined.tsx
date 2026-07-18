import { Image } from 'react-native';
import type { BusinessIconImageProps } from '../businessTypes';

const dataUri =
  'data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cg%20transform%3D%22translate(-1.333332%20-1.333332)%20scale(1.111111)%22%3E%0A%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20%20%20d%3D%22M12%2021C16.9706%2021%2021%2016.9706%2021%2012C21%207.02944%2016.9706%203%2012%203C7.02944%203%203%207.02944%203%2012C3%2016.9706%207.02944%2021%2012%2021Z%22%0A%20%20%20%20%20%20%20%20%20%20stroke%3D%22currentColor%22%0A%20%20%20%20%20%20%20%20%20%20stroke-width%3D%221.5%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linecap%3D%22round%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linejoin%3D%22round%22%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20%20%20d%3D%22M8.57983%2014.6563L6.10913%2012.1857L8.57983%209.71497%22%0A%20%20%20%20%20%20%20%20%20%20stroke%3D%22currentColor%22%0A%20%20%20%20%20%20%20%20%20%20stroke-width%3D%221.5%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linecap%3D%22round%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linejoin%3D%22round%22%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20%20%20d%3D%22M15.4207%2014.6563L17.8914%2012.1857L15.4207%209.71497%22%0A%20%20%20%20%20%20%20%20%20%20stroke%3D%22currentColor%22%0A%20%20%20%20%20%20%20%20%20%20stroke-width%3D%221.5%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linecap%3D%22round%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linejoin%3D%22round%22%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20%20%20d%3D%22M12.8206%208.58081L11.1794%2015.4192%22%0A%20%20%20%20%20%20%20%20%20%20stroke%3D%22currentColor%22%0A%20%20%20%20%20%20%20%20%20%20stroke-width%3D%221.5%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linecap%3D%22round%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linejoin%3D%22round%22%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A';

const DevelopersOutlined = ({
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

export default DevelopersOutlined;
