import ImageWithLoader from "@/components/skeleton-loaders";
import Container from "@/components/ui/container";
import ContainerTitle from "@/components/ui/container-title";
import useLanguageStore from "@/stores/language/language-store";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import { splitNumber } from "@/utils/spliteNumber";
import useExistingExtraItem from "../../_hooks/useExtistingExtraItems";

export default function ItemInformationDrawer({
  itemData,
}: {
  itemData: ItemInterface;
}) {
  const language = useLanguageStore((state) => state.language);
  const t = useLanguageStore((state) => state.tFunction);
  return (
    <>
      <div className="relative grid h-auto w-full grid-cols-12 gap-5 rounded-xl p-5">
        <div className="relative col-span-full w-full md:col-span-4 2xl:col-span-3">
          <div className="top-5 flex h-auto w-full flex-col gap-y-5 md:sticky">
            <ImageWithLoader src={`${itemData.image}`} />
          </div>
        </div>

        <div className="col-span-full mb-5 flex w-full flex-col gap-y-5 md:col-span-8 2xl:col-span-9">
          <Container>
            <div className="flex w-full flex-col gap-y-3">
              <span className="flex items-center justify-between">
                <h6 className="text-lg font-bold text-text">
                  {itemData.name[language]}
                </h6>
                <p className="font-bold">
                  {splitNumber(itemData.price)} {""}
                  <span className="mx-1 text-primary">
                    {t(`price.units.${itemData.unit}`)}
                  </span>
                </p>
              </span>

              <p className="whitespace-pre-line text-sm leading-7 text-text">
                {itemData.itemDescription[language]}
              </p>
            </div>
          </Container>
          <TagsDescription tags={itemData.tags} />
          {/* {currentItem.tags && currentItem.tags.length !== 0 && (
                  <TagsDescription tags={currentItem.tags} />
                )} */}
        </div>
      </div>
    </>
  );
}

function TagsDescription({ tags }: { tags: string[] | null[] }) {
  const t = useLanguageStore((state) => state.tFunction);
  return (
    <Container>
      <ContainerTitle title="توضیحات برچسب ها" />
      <div className="flex flex-col gap-y-5">
        {tags &&
          tags.length !== 0 &&
          tags.map((eachTag) => {
            return (
              <div className="flex w-full items-center gap-x-5" key={eachTag}>
                <div className="relative h-10 w-10">
                  <ImageWithLoader src="/default/no-preview.png" />
                </div>
                <p className="text-typography-500 tracking-none text-sm leading-7">
                  {t(`tags.${eachTag}`)}
                </p>
              </div>
            );
          })}
      </div>
    </Container>
  );
}
