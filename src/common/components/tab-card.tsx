import { cn } from '../lib/utils';

export default function TabCard({ index, id, name, onClick, isActive, image, title }) {
  return (
    <div
      key={`${name}-${id}`}
      onClick={() => onClick(index)}
      className={cn(
        `flex items-center gap-1 rounded-lg p-1 w-fit hover:cursor-pointer`,
        {
          'bg-primary text-white': isActive,
          'border border-primary text-text': !isActive,
        },
      )}>
      <div className='size-5 rounded-full'>
        {/* <ImageWithLoader src={`${categoryData.image}`} /> */}
        {/* <div className={`relative aspect-square h-full w-full`}>
          <Avatar className='h-full w-full rounded-sm'>
            <AvatarImage
              src={`${src}`}
              className='rounded-sm'
            />
            <AvatarFallback className='rounded-sm'>
              <Skeleton className='h-full w-full rounded-sm' />
            </AvatarFallback>
          </Avatar>
        </div> */}
      </div>
      <h1
        className={`tracking-none mx-2 flex-shrink-0 whitespace-nowrap text-xs font-semibold`}>
        {title}
      </h1>
    </div>
  );
}
