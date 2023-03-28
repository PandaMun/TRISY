import __authors from './jsons/__users.json';
import { AuthorType } from './types';
import avatar1 from '~/../public/mainImage/jeju.jpg';
import avatar2 from '~/../public/mainImage/jeju.jpg';
import avatar3 from '~/../public/mainImage/jeju.jpg';
import avatar4 from '~/../public/mainImage/jeju.jpg';
import avatar5 from '~/../public/mainImage/jeju.jpg';
import avatar6 from '~/../public/mainImage/jeju.jpg';
import avatar7 from '~/../public/mainImage/jeju.jpg';
import avatar8 from '~/../public/mainImage/jeju.jpg';
import avatar9 from '~/../public/mainImage/jeju.jpg';
import avatar10 from '~/../public/mainImage/jeju.jpg';
import avatar11 from '~/../public/mainImage/jeju.jpg';
import avatar12 from '~/../public/mainImage/jeju.jpg';
import avatar13 from '~/../public/mainImage/jeju.jpg';
import avatar14 from '~/../public/mainImage/jeju.jpg';
import avatar15 from '~/../public/mainImage/jeju.jpg';
import avatar16 from '~/../public/mainImage/jeju.jpg';
import avatar17 from '~/../public/mainImage/jeju.jpg';
import avatar18 from '~/../public/mainImage/jeju.jpg';
import avatar19 from '~/../public/mainImage/jeju.jpg';
import avatar20 from '~/../public/mainImage/jeju.jpg';

const imgs = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20,
];

const DEMO_AUTHORS: AuthorType[] = __authors.map((item, index) => ({
  ...item,
  avatar: imgs[index] || item.avatar,
}));

export { DEMO_AUTHORS };
