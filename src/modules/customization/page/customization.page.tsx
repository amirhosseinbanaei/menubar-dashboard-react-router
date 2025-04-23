import { ContentSection } from '@/common/components/content-section';
import { ColorDialog, ColorFormValues, ColorPalettes } from '../components';
import { useColorPalettes } from '../hooks/use-color-palettes';
import { useCallback, useState } from 'react';
import { Button } from '@/common/components/ui';
import { PlusIcon } from 'lucide-react';

export default function CustomizationPage() {
  const { data, isLoading } = useColorPalettes();
  const [activeTab, setActiveTab] = useState<'default' | 'custom'>('default');
  
  const handlePaletteSelect = useCallback((colors: ColorFormValues) => {
    console.log(colors);
  }, []);

  return (
    <ContentSection title='شخصی سازی منو'>
      <div className="flex items-center mb-8">
        <ColorDialog
          trigger={
            <Button variant={'primary'} className="flex items-center gap-2 justify-center">
              <PlusIcon size={16} />
              <span>پالت جدید</span>
            </Button>
          }
          title='اضافه کردن پالت جدید'
          description='پالت جدید خود را از طریق فرم زیر اضافه کنید.'
        />
      </div>
      
      <div className="mb-6">
        <div className="flex space-x-1 space-x-reverse border-b">
          <button
            onClick={() => setActiveTab('default')}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'default' 
                ? 'text-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            پالت‌های آماده
            {activeTab === 'default' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'custom' 
                ? 'text-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            پالت‌های من
            {activeTab === 'custom' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="transition-all">
          {activeTab === 'default' && data?.default_palettes && (
            <ColorPalettes
              onSelect={handlePaletteSelect}
              colors={data.default_palettes}
            />
          )}
          
          {activeTab === 'custom' && data?.custom_palettes && (
            data.custom_palettes.length > 0 ? (
              <ColorPalettes
                onSelect={handlePaletteSelect}
                colors={data.custom_palettes}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-gray-500 mb-2">هنوز پالت شخصی ندارید</p>
                <p className="text-sm text-gray-400">برای ایجاد پالت جدید از دکمه "پالت جدید" استفاده کنید</p>
              </div>
            )
          )}
        </div>
      )}
    </ContentSection>
  );
}
