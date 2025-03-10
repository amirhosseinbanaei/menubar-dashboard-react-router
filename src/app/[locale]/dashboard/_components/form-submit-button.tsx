import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shadcn/utils";
import { SyntheticEvent } from "react";

export default function FormSubmitButton(props: {
  t: Function;
  buttonTitle: string;
  buttonClassname?: string;
  containerClassname?: string;
  onSubmit: (e: SyntheticEvent) => void;
}) {
  const { buttonTitle, onSubmit, t, containerClassname, buttonClassname } =
    props;
  return (
    <div className={cn("flex w-full justify-end", containerClassname)}>
      <Button
        // formState={form.formState}
        type="submit"
        className={cn("p-6", buttonClassname)}
        onClick={(e: SyntheticEvent) => onSubmit(e)}
      >
        {t(`${buttonTitle}`)}
      </Button>
    </div>
  );
}
