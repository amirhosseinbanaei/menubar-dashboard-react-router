export default function ContainerTitle({
  title,
}: {
  title: string;
}): JSX.Element {
  return <h1 className="mb-2 w-full mt-2 block text-lg font-bold">{title}</h1>;
}
