import { useEffect, useRef } from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form';

function defaultCompare<T>(a: T, b: T): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
  }
  return JSON.stringify(a) === JSON.stringify(b);
}

interface UseDirtyFieldComparisonParams<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
> {
  fieldName: TFieldName;
  watch: UseFormWatch<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  compareFn?: (
    a: PathValue<TFieldValues, TFieldName>,
    b: PathValue<TFieldValues, TFieldName>,
  ) => boolean;
}

export function useDirtyFieldComparison<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
>({
  fieldName,
  watch,
  setValue,
  compareFn = defaultCompare,
}: UseDirtyFieldComparisonParams<TFieldValues, TFieldName>) {
  const initialValue = useRef<PathValue<TFieldValues, TFieldName>>(watch(fieldName));

  const currentValue = watch(fieldName);

  useEffect(() => {
    const isEqual = compareFn(initialValue.current, currentValue);
    setValue(fieldName, currentValue, { shouldDirty: !isEqual });
  }, [currentValue, compareFn, fieldName, setValue]);
}
