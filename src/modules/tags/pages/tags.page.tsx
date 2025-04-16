import { Link } from 'react-router';
import { Button } from '@/common/components/ui/button';
import { useTags } from '../hooks/useTags';
import { ContentSection } from '@/common/components/content-section';
import { useDeleteTag } from '../hooks/useDeleteTag';
import { Card, CardIconButton } from '@/common/components/ui/reusable-card';

export default function TagsPage() {
  const { data: tags, isLoading } = useTags();
  const { mutateAsync: deleteTag } = useDeleteTag();

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ContentSection title={'تگ ها'}>
          <Link to={'/tags/add'}>
            <Button variant={'primary'}>افزودن تگ</Button>
          </Link>

          <div className='my-8 h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl flex flex-col gap-5'>
            {tags.map((tag, index) => {
              return (
                <Card
                  key={`tag-card-${index}`}
                  image={tag.image}
                  title={tag.translations[0].name}
                  description={`توضیحات : ${tag.translations[0].description}`}
                  descriptionAlign='horizontal'
                  actions={
                    <>
                      <Link to={`/tags/${tag.id}`}>
                        <CardIconButton icon='Pencil' />
                      </Link>
                      <CardIconButton
                        icon='Trash'
                        onClick={async () => await deleteTag(tag.id)}
                      />
                    </>
                  }
                />
              );
            })}
          </div>
        </ContentSection>
      )}
    </>
  );
}
