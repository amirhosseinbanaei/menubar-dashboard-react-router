"use client";
import ImageWithLoader from "@/components/skeleton-loaders";
import { cn } from "@/lib/shadcn/utils";
import useLanguageStore from "@/stores/language/language-store";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { splitNumber } from "@/utils/spliteNumber";

import useExistingItemInStorage from "../../_hooks/useExistingItemInStorage";
import ItemDrawer from "../drawer/itemDrawer";
import useNoteStore, { NotesInterface } from "@/stores/notes/note-store";

export default function ItemCard({
  itemData,
  openDrawer = true,
}: {
  itemData: ItemInterface;
  openDrawer?: boolean;
}) {
  const t = useLanguageStore((state) => state.tFunction);
  const language = useLanguageStore((state) => state.language);
  const direction = useLanguageStore((state) => state.dir);

  return (
    <>
      <ItemDrawer itemData={itemData}>
        <div
          className={cn(
            `duration-400 relative flex h-auto w-full justify-between gap-2 rounded-xl bg-white px-2 py-3 shadow-c-xl transition-all duration-700 hover:cursor-pointer hover:xl:scale-105`,
            {
              "opacity-60": !itemData.isAvailable,
            },
          )}
        >
          <div className="relative flex h-full max-w-24 items-center">
            <ImageWithLoader src={`${itemData.image}`} />
          </div>

          <div className="relative flex h-auto w-[calc(100%-96px)] flex-col justify-between">
            <span className="flex w-full flex-col gap-y-1 px-2 py-1">
              <div className="flex w-full items-center justify-between">
                <h1 className="tracking-none text-sm font-bold text-text md:text-base">
                  {itemData.name[language]}
                </h1>
                <span className="mb-1 flex gap-3">
                  {/* {itemData.tags &&
                  itemData.tags.length !== 0 &&
                  itemData.tags.map((eachTag) => {
                    return (
                      <img
                        key={eachTag}
                        className="z-990 h-7 w-7"
                        src={`${staticSources.tags[eachTag].image}`}
                      />
                    );
                  })} */}
                </span>
              </div>
              <p className="tracking-none line-clamp-1 w-11/12 text-[12.8px] leading-[23px] text-text-light md:text-[13.3px]">
                {itemData.itemDescription[language]}
              </p>
            </span>
            <div
              className={cn(`flex h-8 w-full items-center justify-between`, {
                "pr-3": direction === "rtl",
                "pl-3": direction === "ltr",
              })}
            >
              <div className="flex h-10 w-full items-center justify-between gap-x-2">
                {/* If Item is not available */}
                {!itemData.isAvailable && (
                  <p
                    className={cn(`text-primary`, {
                      "text-sm": !itemData.isAvailable,
                    })}
                  >
                    {t("price.finish")}
                  </p>
                )}

                {itemData.isAvailable && (
                  <>
                    <div className="flex h-full w-[calc(100%-80px)] items-center">
                      {itemData.discount == 0 ? (
                        <p className="mt-1 text-primary">
                          {splitNumber(itemData.price)}
                          <span className={`mx-1 text-[13px]`}>
                            {t(`price.units.${itemData.unit}`)}
                          </span>
                        </p>
                      ) : (
                        <div
                          className={cn(
                            "relative flex h-10 w-full items-center",
                            // {
                            //   "gap-x-2": !isExistingItem,
                            // },
                          )}
                        >
                          <p
                            className={cn(
                              "text-sm text-destructive line-through",
                              // {
                              //   "absolute -top-[6px] right-0": isExistingItem,
                              //   "mt-[2px]": !isExistingItem,
                              // },
                            )}
                          >
                            {splitNumber(Number(itemData.price))}
                          </p>
                          <span className="mt-1 flex w-full">
                            <p className="text-primary">
                              {splitNumber(
                                calculateDiscount(
                                  itemData.discount,
                                  itemData.price,
                                ),
                              )}
                              <span className={`mx-1 text-[13px]`}>
                                {t(`price.units.${itemData.unit}`)}
                              </span>
                            </p>
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex h-full min-w-10 max-w-20 items-center justify-center"></div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* <Link to={`/item/?id=${id}`} className='w-full absolute h-full'/> */}
        </div>
      </ItemDrawer>
    </>
  );
}
