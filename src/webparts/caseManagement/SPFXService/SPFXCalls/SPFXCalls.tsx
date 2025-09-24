// ListService.ts

import { IItem } from "@pnp/sp/items";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
 
export default class ListService {
  private sp;
 
  constructor(context: WebPartContext) {
        this.sp = spfi().using(SPFx(context));
  }
 

  public async getListItems(listName: string,selectFields: any[] = ["Id", "Title"],
    expandFields: any[] = [],
    top: number = 5000
  ): Promise<IItem[]> {
    try {
      const items: IItem[] = await this.sp.web.lists
        .getByTitle(listName)
        .items.select(...selectFields)
        .expand(...expandFields)
        .top(top)();
 
      return items;
    } catch (error) {
      console.error("Error fetching list items:", error);
      throw error;
    }
  }
}
 