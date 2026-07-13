import { Image } from 'react-native';
import type { BusinessIconImageProps } from '../businessTypes';

const dataUri =
  'data:image/svg+xml;utf8,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cpath%0A%20%20%20%20d%3D%22M3%204H5L6.5%2015H18L20%207.5H6%22%0A%20%20%20%20stroke%3D%22currentColor%22%0A%20%20%20%20stroke-width%3D%221.5%22%0A%20%20%20%20stroke-linecap%3D%22round%22%0A%20%20%20%20stroke-linejoin%3D%22round%22%0A%20%20%2F%3E%0A%20%20%3Cpath%0A%20%20%20%20d%3D%22M7.9999%2019.6C8.88356%2019.6%209.5999%2018.8837%209.5999%2018C9.5999%2017.1164%208.88356%2016.4%207.9999%2016.4C7.11625%2016.4%206.3999%2017.1164%206.3999%2018C6.3999%2018.8837%207.11625%2019.6%207.9999%2019.6Z%22%0A%20%20%20%20fill%3D%22currentColor%22%0A%20%20%2F%3E%0A%20%20%3Cpath%0A%20%20%20%20d%3D%22M16.9999%2019.6C17.8836%2019.6%2018.5999%2018.8837%2018.5999%2018C18.5999%2017.1164%2017.8836%2016.4%2016.9999%2016.4C16.1162%2016.4%2015.3999%2017.1164%2015.3999%2018C15.3999%2018.8837%2016.1162%2019.6%2016.9999%2019.6Z%22%0A%20%20%20%20fill%3D%22currentColor%22%0A%20%20%2F%3E%0A%3C%2Fsvg%3E%0A';

const CartWrap = ({ size = 24, width, height, source, ...props }: BusinessIconImageProps) => (
  <Image
    {...props}
    source={source ?? { uri: dataUri }}
    style={[{ width: width ?? size, height: height ?? size }, props.style]}
  />
);

export default CartWrap;
