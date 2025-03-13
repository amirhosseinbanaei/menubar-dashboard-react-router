import { ContentSection } from '@/common/components/content-section';
import {
  AddButton,
  ChangeOrderButton,
} from '@/common/components/renderer-buttons';
import { SortableList } from '@/common/components/stj';
import VerticalSortableCard from '@/common/components/vertical-sortable-card';
import { useState } from 'react';

// Components
// import { BouncingLoaderWithContainer } from '../components/Loaders/Bouncing';

// Custom Hooks
// import useReactQuery from '../hooks/useReactQuery';

// Data
// import { LanguageContext } from '../contexts/LanguageContext';
// import { getCategories } from '../services/Axios/Requests/Category';
// import Card from '../components/Card/Card';

export default function ItemsPage() {
  // const { mainData, isLoading: isLoadingCategories } = useReactQuery(
  //   'Categories',
  //   getCategories,
  // );
  // const { language } = useContext(LanguageContext);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project', completed: false },
    { id: 2, title: 'Review code', completed: true },
    { id: 3, title: 'Deploy to production', completed: false },
  ]);

  return (
    <>
      <ContentSection title={'محصولات'}>
        <div className='w-full h-20 flex bg-gray-200 mb-8'></div>
        <span className='mb-6 flex gap-x-5'>
          <AddButton
            title='افزودن محصول'
            href='/items/add'
          />
          <ChangeOrderButton />
        </span>

        <div className='my-3 h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl'>
          <SortableList
            name='items-card'
            items={tasks}
            onReorder={setTasks}
            className='flex h-auto w-auto flex-shrink-0 flex-col gap-5 bg-transparent md:w-full'
            renderItem={(item, index) => (
              <VerticalSortableCard
                data={item}
                index={index}
                shouldSort={false}
                editLink={`/categories/${item.id}`}
                dialogConfig={{
                  title: 'حذف محصول',
                  description: 'آیا از حذف محصول',
                }}
                onDelete={() => {
                  console.log('deleted');
                }}
              />
            )}
          />
        </div>
      </ContentSection>
    </>
  );
}
