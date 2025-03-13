import { useNavigate } from 'react-router-dom';
import CategoryForm from '@/modules/categories/components/category-form';
import { toast } from '@/common/components/ui/toast';

export default function NewCategoryPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: CategoryFormValues) => {
    try {
      const formData = new FormData();
      
      // Append translations
      formData.append('translations', JSON.stringify(data.translations));
      
      // Append image
      if (data.images?.[0]) {
        formData.append('image', data.images[0]);
      }

      const response = await fetch('/api/categories', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      toast({
        title: "موفق",
        description: "دسته بندی با موفقیت ایجاد شد",
      });

      navigate('/categories');
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ایجاد دسته بندی پیش آمد",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">ایجاد دسته بندی جدید</h1>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
} 