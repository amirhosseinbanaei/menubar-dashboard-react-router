import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";
import { ItemInterface } from "@/ts/interfaces/item.interface";

export async function filterExtraItems(
  apiResponseData: {}[],
  itemData: ItemInterface,
  lang: string,
) {
  const filteredExtraItems = [];
  await apiResponseData?.forEach((extraItem: ExtractItemInterface) => {
    if (itemData.extraItems.includes(extraItem._id)) {
      return filteredExtraItems.push({
        id: extraItem._id,
        name: extraItem.name[lang],
        price: extraItem.price,
      });
    }
  });
  filteredExtraItems.length && filterExtraItems;
}
