import { cn } from '@/common/lib/utils';
import { useDropzone, Accept } from 'react-dropzone';
import { DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

interface FileWithPreview extends File {
  preview: string;
}

interface DropZoneProps {
  files: FileWithPreview[] | string;
  accept: Accept;
  formKey: string;
  maxFiles: number;
  maxSize?: number; // in bytes
  setFiles: (key: string, files: FileWithPreview[] | FileWithPreview) => void;
  children?: ReactNode;
}

interface FilePreviewProps {
  file: FileWithPreview | string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  const isFileImage =
    typeof file === 'string'
      ? file.includes('.png') || file.includes('.jpeg')
      : file.type?.includes('image');

  const fileName = typeof file === 'string' ? file : file.name;
  const previewUrl = typeof file === 'string' ? file : file.preview;

  return (
    <div
      key={fileName}
      className={cn(
        'flex h-56 w-56 flex-shrink-0 items-center justify-center rounded-xs',
        {
          'bg-gray-100': isFileImage,
          'border border-primary/50': !isFileImage,
        },
      )}>
      {isFileImage ? (
        <img
          width={100}
          height={100}
          src={previewUrl}
          className='h-auto max-h-56 w-auto max-w-56 rounded-xs object-contain'
          alt={fileName}
        />
      ) : (
        <div className='flex h-full w-full flex-col justify-center'>
          <div className='flex h-20 w-full items-center justify-center'>
            <DocumentIcon className='h-14 w-14 text-gray-300' />
          </div>
          <div className='mx-auto mt-2 line-clamp-1 flex w-11/12 flex-wrap items-center justify-center gap-y-1 text-center text-sm'>
            <p className='tracking-none text-xs font-medium leading-7 text-text-light'>
              {fileName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function DropZone({
  files,
  accept,
  formKey,
  maxFiles,
  maxSize = 5 * 1024 * 1024, // 5MB default
  setFiles,
  children,
}: DropZoneProps) {
  const isMultipleFiles = maxFiles > 1 && Array.isArray(files);

  const onDrop = (acceptedFiles: File[]) => {
    if (!acceptedFiles?.length) return;

    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) }),
    ) as FileWithPreview[];

    if (isMultipleFiles) {
      setFiles(formKey, [...(files as FileWithPreview[]), ...filesWithPreview]);
    } else {
      setFiles(formKey, filesWithPreview[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept,
    maxSize,
  });

  return (
    <div className='flex w-full flex-col overflow-x-auto rounded-xs border border-dashed border-gray-900/25 p-5'>
      {/* Main Area */}
      <div className='flex w-full overflow-x-auto md:gap-5 lg:flex-row'>
        {/* Drop Zone Area */}
        <div
          {...getRootProps()}
          className='flex h-56 w-full flex-col items-center justify-center rounded-xs border text-center text-text-light lg:w-1/3'>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>فایل را اینجا رها کنید ...</p>
          ) : (
            <PhotoIcon className='mx-auto h-14 w-14 text-gray-300' />
          )}
          <div className='mt-2 flex w-full flex-col items-center gap-y-1 text-sm'>
            <p className='tracking-none text-base font-bold text-primary'>
              انتخاب تصویر
            </p>
            <p className='tracking-none text-xs font-medium leading-7 text-text-light'>
              تصاویر را انتخاب یا در این کادر رها کنید
            </p>
            <p className='tracking-none text-xs font-medium leading-7 text-text-light'>
              حداکثر {maxFiles} عکس {maxSize / (1024 * 1024)} مگابایتی
              <span className='mx-1 text-base text-destructive'>*</span>
            </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className='mt-5 flex w-full flex-shrink-0 gap-5 overflow-x-auto lg:mt-0 lg:w-2/3'>
          {isMultipleFiles
            ? (files as FileWithPreview[]).map((file) => (
                <FilePreview
                  key={file.name}
                  file={file}
                />
              ))
            : files && <FilePreview file={files as string} />}
          {children}
        </div>
      </div>
    </div>
  );
}
