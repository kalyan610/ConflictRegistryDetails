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


    public test()
    {

       this.updateReviewrDetails(2,'','','','','','','');
       this.updateHRDetails(2,'','','','','','')
    }


    
  
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
    const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("*,Attachments,AttachmentFiles,RiskTeamReviewer/EMail,HRSign/EMail").expand("AttachmentFiles,RiskTeamReviewer,HRSign").filter("ID eq '" + ItemID + "'").get();
            return Item[0];
        } catch (error) {
            console.log(error);
        }
    }


    private async updateReviewrDetails(

        MyRecordId:number,
        RiskTeamValue:string,
        MyReviwerId:string,
        MyQualitavieRisk:string,
        MyQunatativeRisk:string,
        MyReviewerComments:string,
        MyDoesItRequiresHRApproval:string,
        MyAttachmanets:any
        
        )

      

    {

        let file=MyAttachmanets;

       let MyListTitle='ConflictRegistrySubmissions';

       let Myval='Completed';

       let MyHRstatus='';

        try
        {


        if(MyDoesItRequiresHRApproval=='Yes')
        {


            MyHRstatus='Pending'
        }

        else
        {

            MyHRstatus='Not Required'

        }
    
        let list = sp.web.lists.getByTitle(MyListTitle);
        let Varmyval = await list.items.getById(MyRecordId).update({

        //Emp Update
        
        Title:"Updated by Reviewer",
        RiskTeamReview :RiskTeamValue,
        RiskTeamReviewerId:MyReviwerId,
        QualitativeRisk:MyQualitavieRisk,
        QuantativeRisk:MyQunatativeRisk,
        ReviewerComments:MyReviewerComments,
        DoesItRequiresHRApproval:MyDoesItRequiresHRApproval,
        ReviewerStatus:'Approved',
        HRStatus:MyHRstatus
         
        
    }).then (async r => {
        // this will add an attachment to the item we just created to push t sharepoint list
  
      for(var count=0;count<file.length;count++)
      {
       await r.item.attachmentFiles.add(file[count].name, file[count]).then(result => {
      console.log(result);
  
        })
  
      }
  
      return Myval;
  
  
  
      })
  
        return Varmyval;

        }

    
      catch (error) {
        console.log(error);
      }
      

    }

    private async updateHRDetails(

        MyRecordId:number,
        MyHREmployeeStatus:string,
        MyHRReview:string,
       MyMitigateComments:string,
        MyFallowupActions:String,
        MyFallowUpComments:String,
        HRSignValue:string
        
        
        )
    {

       

       let MyListTitle='ConflictRegistrySubmissions';

       

        try
        {
    
        let list = sp.web.lists.getByTitle(MyListTitle);
        let Varmyval = await list.items.getById(MyRecordId).update({

        //Emp Update
        
        Title:"Approved by HR",
        EmploymentStatus:MyHREmployeeStatus,
        HRReview:MyHRReview,
        MitigationComments:MyMitigateComments,
        FollowUpActions:MyFallowupActions,
        FollowUpComments:MyFallowUpComments,
        HRSignId:HRSignValue,
        HRStatus:"Approved"
         
        
        });

        return Varmyval;
        }

   
      catch (error) {
        console.log(error);
      }
      
      

    }

    public async getEnvironment():Promise<any>
    {
    
    return await sp.web.lists.getByTitle("Environment").items.select('Title','ID').expand().get().then(function (data:any) {
     
    return data;
    
    });
   }     

   
    
}