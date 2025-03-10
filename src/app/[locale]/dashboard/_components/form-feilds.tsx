import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/shadcn/utils";

export function TextFeild({
  t,
  form,
  name,
  label,
  type,
  placeholder,
  defaultValue
}: {
  form: any;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  defaultValue?: string | undefined;
  t: Function;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t(`${label}`)}</FormLabel>
          <FormControl>
            <Input
              className="placeholder:text-text-light"
              placeholder={t(`${placeholder}`)}
              type={type ? type : "text"}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TextareaFeild({
  t,
  form,
  name,
  label,
  placeholder,
  className,
}: {
  form: any;
  t: Function;
  name: string;
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t(`${label}`)}</FormLabel>
          <FormControl>
            <textarea
              className={cn(
                "text-typography-700 placeholder:text-typography-500 my-2 block h-28 w-full resize-none rounded-sm border border-gray-200 bg-white px-5 py-3 text-sm leading-7 placeholder:text-sm placeholder:text-text-light focus:outline-primary focus:ring-0",
                className,
              )}
              placeholder={t(`${placeholder}`)}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectFeild({
  t,
  form,
  name,
  label,
  children,
  selectItems,
  placeholder = "انتخاب نشده",
  setCustomValue,
}: {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  children?: React.ReactNode;
  t: Function;
  selectItems: string[] | { id: string; value: string }[];
  setCustomValue?: any;
}) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{t(`${label}`)}</FormLabel>
            <Select
              dir="rtl"
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="w-full px-4">
                  <SelectValue placeholder={t(`${placeholder}`)} />
                  {/* {
                    setCustomValue
                  } */}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {children}
                {/* <SelectValue placeholder={t(`${placeholder}`)} /> */}

                {selectItems.length >= 1 &&
                  selectItems.map(
                    (item: string | { id: string; value: string }) => {
                      return (
                        <>
                          {typeof item === "string" ? (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ) : (
                            <SelectItem key={item.id} value={item.id}>
                              {item.value}
                            </SelectItem>
                          )}
                        </>
                      );
                    },
                  )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export function SwitchFeild({
  t,
  form,
  name,
  label,
}: {
  form: any;
  name: string;
  label: string;
  t: Function;
}) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex items-center">
          <FormControl>
            <div className="flex items-center gap-2">
              <p className="font-medium text-text-light">{t(`${label}`)}</p>
              <Switch
                dir="ltr"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
