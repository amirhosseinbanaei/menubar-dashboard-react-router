import { cn } from '@/common/lib/utils';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/common/components/ui/dialog';
import { Button } from '@/common/components/ui/button';
import { Card, CardIconButton } from '@/common/components/ui/reusable-card';
import { useTags } from '@/modules/tags/hooks/useTags';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ItemFormValues } from './item-form';
import { Tag } from '@/modules/tags/interfaces/tag.interface';

const formSetValueOptions = {
  shouldTouch: true,
  shouldDirty: true,
  shouldValidate: true,
};

function FormTagsSection({ form }: { form: UseFormReturn<ItemFormValues> }) {
  const existTags = useWatch({
    control: form.control,
    name: 'tags',
  });

  const addTag = (newTagData: Tag) => {
    form.setValue('tags', [...existTags, newTagData], formSetValueOptions);
  };

  const deleteTag = (tagId: number) => {
    const filterTags = existTags.filter((tag) => tag.id !== tagId);
    form.setValue('tags', filterTags, formSetValueOptions);
  };

  return (
    <div
      className={cn('col-span-full flex w-full flex-col', {
        'gap-5': existTags.length,
      })}>
      <span className='flex items-center'>
        <h1 className='px-3 text-text-light'>برچسب ها</h1>
        <FormTagSectionDialog
          existTags={existTags}
          addTag={addTag}
          deleteTag={deleteTag}
        />
      </span>
      <div className='grid w-full grid-cols-1 lg:grid-cols-3 gap-5'>
        {existTags.map((tag, index) => {
          return (
            <Card
              key={`tag-card-in-item-form:${index}`}
              image={tag.image}
              title={tag.translations[0].name}
              actions={
                <CardIconButton
                  icon='XMark'
                  onClick={() => deleteTag(tag.id)}
                />
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function FormTagSectionDialog({
  existTags,
  addTag,
  deleteTag,
}: {
  existTags: Tag[] | [];
  addTag: (newTag: Tag) => void;
  deleteTag: (tagId: number) => void;
}) {
  const { data: tags } = useTags();

  return (
    <Dialog>
      <DialogTrigger>
        <CardIconButton
          icon='Plus'
          size={'icon-sm'}
          variant={'outline-icon'}
          className='rounded-xs'
        />
      </DialogTrigger>

      <DialogContent className='max-w-none w-1/2'>
        <DialogHeader>
          <DialogTitle>برچسب ها</DialogTitle>
        </DialogHeader>

        {tags && (
          <div className='h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl flex flex-col gap-5'>
            {tags.map((tag, index) => {
              const currentTagExist = existTags.filter(
                (existTag) => existTag.id === tag.id,
              );
              return (
                <Card
                  key={`tag-card:${index}`}
                  image={tag.image}
                  title={tag.translations[0].name}
                  description={tag.translations[0].description}
                  descriptionAlign='vertical'
                  actions={
                    currentTagExist?.length ? (
                      <CardIconButton
                        icon='Trash'
                        onClick={() => deleteTag(tag.id)}
                      />
                    ) : (
                      <CardIconButton
                        icon='Plus'
                        onClick={() => addTag(tag)}
                      />
                    )
                  }
                />
              );
            })}
          </div>
        )}

        <DialogFooter>
          <DialogClose
            asChild
            className='w-1/2'>
            <Button
              type='button'
              className='w-full p-5'
              variant={'secondary'}>
              انصراف
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { FormTagsSection };
