import { Image } from 'react-native';
import type { BusinessIconImageProps } from '../businessTypes';

const dataUri =
  'data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cg%20transform%3D%22translate(-6.131349%20-5.114668)%20scale(1.454303)%22%3E%0A%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20%20%20d%3D%22M7.00006%205.2C8.10006%204.6%209.50006%204.9%2010.3001%205.9C10.9001%206.7%2010.8001%207.7%2010.2001%208.5C9.80006%209%209.90006%209.6%2010.4001%2010.4C11.1001%2011.5%2012.0001%2012.5%2013.1001%2013.4C13.9001%2014.1%2014.6001%2014.3%2015.2001%2014C16.1001%2013.5%2017.1001%2013.5%2017.9001%2014.1C19.0001%2014.9%2019.4001%2016.3%2018.8001%2017.4C18.1001%2018.6%2016.6001%2019%2015.4001%2018.3C10.5001%2015.6%207.00006%2011.2%205.90006%206.9C5.70006%206.2%206.20006%205.6%207.00006%205.2Z%22%0A%20%20%20%20%20%20%20%20%20%20stroke%3D%22currentColor%22%0A%20%20%20%20%20%20%20%20%20%20stroke-width%3D%221.5%22%0A%20%20%20%20%20%20%20%20%20%20stroke-linejoin%3D%22round%22%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A';

const CallingOutlined = ({
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

export default CallingOutlined;
