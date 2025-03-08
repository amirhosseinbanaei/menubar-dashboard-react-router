// import { useContext } from 'react';

import ContentSection, {
  ContentSectionButton,
  ContentSectionTitle,
} from '@/common/components/content-section';

// Components
// import { BouncingLoaderWithContainer } from '../components/Loaders/Bouncing';

// Custom Hooks
// import useReactQuery from '../hooks/useReactQuery';

// Data
// import { LanguageContext } from '../contexts/LanguageContext';
// import { getCategories } from '../services/Axios/Requests/Category';
// import Card from '../components/Card/Card';

export default function CategoriesPage() {
  // const { mainData, isLoading: isLoadingCategories } = useReactQuery(
  //   'Categories',
  //   getCategories,
  // );
  // const { language } = useContext(LanguageContext);
  return (
    <>
      {/* {isLoadingCategories ? (
        <BouncingLoaderWithContainer />
      ) : (
        <MainSection
          sectionTitle='دسته بندی ها'
          linkButton={{ title: 'اضافه کردن دسته بندی', href: '/category/add' }}>
          <div className='px-5 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-y-5 mt-10'>
            {mainData &&
              mainData.map((eachCategory) => {
                return (
                  <Card
                    key={eachCategory._id}
                    id={eachCategory._id}
                    name={eachCategory[language].name}
                    image={eachCategory.image}
                    href='categories'
                  />
                );
              })}
          </div>
        </MainSection>
      )} */}
      <ContentSection
        title={<ContentSectionTitle title='دسته بندی ها' />}
        button={
          <ContentSectionButton
            title='اضافه کردن دسته بندی'
            href='/category/add'
          />
        }>
        <h1>Hello</h1>
      </ContentSection>
    </>
  );
}
