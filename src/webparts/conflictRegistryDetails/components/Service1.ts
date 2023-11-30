import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/fields";
import "@pnp/sp/attachments";
import "@pnp/sp/files";


export default class Service {

    public mysitecontext: any;

    public constructor(siteUrl: string, Sitecontext: any) {
        this.mysitecontext = Sitecontext;


        sp.setup({
            sp: {
                baseUrl: siteUrl

            },
        });

    }




    // public async GetAllBussinessUnits():Promise<any>
    // {
 
    //  return await sp.web.lists.getByTitle("BusinessUnits").items.select('Title','ID').expand().get().then(function (data:any) {
 
    //  return data;
 
 
    //  });
 
 
    // }

    // public async GetAllgiftregistries():Promise<any>
    // {
 
    //  return await sp.web.lists.getByTitle("GiftRegistry").items.select('Title','ID','RequestType').expand().get().then(function (data:any) {
 
    //  return data;
 
 
    //  });
 
 
    // }

    // public async GetAllCurrencies():Promise<any>
    // {
 
    //  return await sp.web.lists.getByTitle("Currency").items.select('Title','ID').expand().get().then(function (data:any) {
 
    //  return data;
 
 
    //  });
 
 
    // }
  
  
    public async getUserByLogin(LoginName:string):Promise<any>{
        try{
            const user = await sp.web.siteUsers.getByLoginName(LoginName).get();
            return user;
        }catch(error){
            console.log(error);
        }
    }

    public async getCurrentUserSiteGroups(): Promise<any[]> {

        try {

            return (await sp.web.currentUser.groups.select("Id,Title,Description,OwnerTitle,OnlyAllowMembersViewMembership,AllowMembersEditMembership,Owner/Id,Owner/LoginName").expand('Owner').get());

        }
        catch {
            throw 'get current user site groups failed.';
        }

    }


    public async getItemByRecords(ItemID: any): Promise<any> {
        try {

    const selectedList = 'ConflictRegistrySubmissions';
    const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("*").filter("ID eq '" + ItemID + "'").get();
            return Item[0];
        } catch (error) {
            console.log(error);
        }
    }

   

   
    
    
}