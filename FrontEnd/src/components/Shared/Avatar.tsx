import { avatarColors } from '~/styles/AvatarColors';
import styled from 'styled-components';
import tw from 'twin.macro';

interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string;
  userName?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
}

export const Avatar = ({
  containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
  sizeClass = 'h-6 w-6 text-sm',
  radius = 'rounded-full',
  imgUrl,
  userName,
}: AvatarProps) => {
  const url = imgUrl || './profile.png';
  const name = userName || 'John Doe';
  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length);
    return avatarColors[backgroundIndex];
  };
  return (
    <S.AvatarContainer
      className={`${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
    >
      {url && (
        <img
          className={`absolute inset-0 w-full h-full object-cover ${radius}`}
          src={url}
          alt={name}
        />
      )}
      <span>{name[0]}</span>
    </S.AvatarContainer>
  );
};

const S = {
  AvatarContainer: styled.div`
    ${tw`relative inline-flex items-center justify-center flex-shrink-0 font-semibold uppercase shadow-inner text-neutral-100`}
  `,
};
