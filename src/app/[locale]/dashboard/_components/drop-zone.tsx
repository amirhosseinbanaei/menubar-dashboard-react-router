import { cn } from "@/lib/shadcn/utils";
import { useDropzone } from "react-dropzone";
import { DocumentIcon } from "@heroicons/react/24/outline";

export default function DropZone({
  files,
  accept,
  formKey,
  setFiles,
  maxFiles,
}: {
  accept: {};
  files: {}[] | string;
  formKey: string;
  maxFiles: number;
  setFiles: Function;
}) {
  const isMultipleFiles = maxFiles > 1 && typeof files === "object";
  const onDrop = (acceptedFiles: any) => {
    if (acceptedFiles?.length) {
      if (maxFiles > 1 && isMultipleFiles) {
        setFiles(formKey, [
          ...files,
          ...acceptedFiles.map((file: any) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]);
      } else {
        setFiles(
          formKey,
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          }),
        );
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept,
  });

  return (
    <div className="mb-5 flex w-full flex-col overflow-x-auto rounded-xs border border-dashed border-gray-900/25 p-5 md:gap-5 lg:flex-row">
      <div
        {...getRootProps()}
        className="flex h-56 w-full flex-col items-center justify-center rounded-xs border text-center lg:w-1/3"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto h-14 w-14 text-gray-300"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        )}
        <div className="mt-2 flex w-full flex-col items-center gap-y-1 text-sm">
          <p className="tracking-none text-base font-bold text-primary">
            انتخاب تصویر
          </p>
          <p className="tracking-none text-xs font-medium leading-7 text-text-light">
            تصاویر را انتخاب یا در این کادر رها کنید
          </p>
          <p className="tracking-none text-xs font-medium leading-7 text-text-light">
            حداکثر 5 عکس 5 مگابایتی
            <span className="mx-1 text-base text-destructive">*</span>
          </p>
        </div>
      </div>
      {/* Photos Layer Container */}
      <div className="mt-5 flex h-64 w-full flex-shrink-0 gap-5 overflow-x-auto lg:mt-0 lg:w-2/3">
        {isMultipleFiles
          ? files.map((file) => FilePreview(file))
          : files && FilePreview(files)}
      </div>
    </div>
  );
}

function FilePreview(file: any) {
  const isFileImage =
    (file && file.type?.includes("image")) ||
    file.includes(".png") ||
    file.includes(".jpeg");
  return (
    <>
      {file && (
        <div
          key={file?.name || file}
          className={cn(
            "flex h-56 w-56 flex-shrink-0 items-center justify-center rounded-xs",
            {
              "bg-gray-100": isFileImage === true,
              "border border-primary/50": isFileImage === false,
            },
          )}
        >
          {isFileImage ? (
            <img
              width={100}
              height={100}
              src={`${file?.preview || file}`}
              className="h-auto max-h-56 w-auto max-w-56 rounded-xs"
              alt={file?.name || file}
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-center">
              <div className="flex h-20 w-full items-center justify-center">
                <DocumentIcon className="h-14 w-14 text-gray-300" />
              </div>
              <div className="mx-auto mt-2 line-clamp-1 flex w-11/12 flex-wrap items-center justify-center gap-y-1 text-center text-sm">
                <p className="tracking-none text-xs font-medium leading-7 text-text-light">
                  {file.name}
                  {file}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
