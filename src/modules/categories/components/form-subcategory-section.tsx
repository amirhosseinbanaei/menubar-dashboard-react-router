import { Card, CardIconButton } from '@/common/components/ui';
import { AddSubcategoryDialog } from './subcategory-dialog';
import { SubcategoryFormValues } from './subcategory-form';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { CategoryFormValues } from './category-form';
import { DragDrop } from '@/common/components/drag-drop/drag-drop';
import { useCallback } from 'react';

interface FormSubcategorySectionProps {
  categoryForm: UseFormReturn<CategoryFormValues>;
}

// Helper to generate unique IDs
function generateUniqueId() {
  return Math.floor(Math.random() * 100);
}

export function FormSubcategorySection({
  categoryForm,
}: FormSubcategorySectionProps) {
  const existSubcategories =
    useWatch({
      control: categoryForm.control,
      name: 'subcategories',
    }) || [];

  const addSubcategory = (
    subcategoryForm: UseFormReturn<SubcategoryFormValues>,
  ) => {
    const newSubcategoryData = subcategoryForm.getValues();
    // Assign a unique, stable id
    // lastIdRef.current += 1;

    const updatedSubcategories = [
      ...existSubcategories,
      {
        ...newSubcategoryData,
        id: generateUniqueId(),
        order: existSubcategories.length,
      },
    ];

    // Update order for all subcategories
    const orderedSubcategories = updatedSubcategories.map((item, index) => ({
      ...item,
      order: index,
    }));

    categoryForm.setValue('subcategories', orderedSubcategories, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    subcategoryForm.reset();
  };

  const deleteSubcategory = (index: number) => {
    const filtered = existSubcategories.filter((_, i) => i !== index);

    // Update order numbers after deletion
    const updatedSubcategories = filtered.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    categoryForm.setValue('subcategories', updatedSubcategories, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  // Ensure each subcategory has a valid id and order
  const subcategoriesWithId = existSubcategories.map((sub, index) => ({
    ...sub,
    id: typeof sub.id === 'number' ? sub.id : generateUniqueId(),
    order: typeof sub.order === 'number' ? sub.order : index,
  }));

  const handleDragDrop = useCallback(
    (items: (SubcategoryFormValues & { id: number; order: number })[]) => {
      // Update order numbers after reordering
      const reorderedItems = items.map((item, index) => ({
        ...item,
        order: index + 1,
      }));

      categoryForm.setValue('subcategories', reorderedItems, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
    },
    [categoryForm],
  );

  return (
    <div
      className={
        'col-span-full mt-8 flex w-full flex-col' +
        (existSubcategories.length ? ' gap-5' : '')
      }>
      <span className='flex items-center'>
        <h1 className='px-3 text-text-light'>زیر دسته‌ها</h1>
        <AddSubcategoryDialog
          trigger={
            <CardIconButton
              icon='Plus'
              size={'icon-sm'}
              variant={'outline-icon'}
              className='rounded-xs'
            />
          }
          onAdd={(_, form) => {
            addSubcategory(form);
          }}
        />
      </span>
      <DragDrop
        items={subcategoriesWithId}
        onChange={handleDragDrop}
        direction='grid'
        renderItem={(subcategory, dragHandleProps, _, index) => (
          <Card
            index={index + 1}
            dragHandle={dragHandleProps}
            dragHandleIcon='arrow'
            title={subcategory.translations[0]?.name || `زیر دسته ${index + 1}`}
            key={`subcategory-card-in-category-form:${subcategory.id}`}
            actions={
              <CardIconButton
                icon='XMark'
                onClick={() => deleteSubcategory(index)}
              />
            }
          />
        )}
      />
    </div>
  );
}
