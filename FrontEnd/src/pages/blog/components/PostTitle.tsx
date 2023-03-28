interface PostTitleProps {
  title: string;
}

export const PostTitle = ({ title }: PostTitleProps) => {
  return (
    <div className='text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl'>
      {title}
    </div>
  );
};
