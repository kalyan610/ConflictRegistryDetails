import * as React from 'react';
import styles from './ConflictRegistryDetails.module.scss';
import { IConflictRegistryDetailsProps } from './IConflictRegistryDetailsProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {Stack,IStackStyles} from 'office-ui-fabric-react'; 
import { Dropdown,IDropdownStyles,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';

import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

import {Icon} from 'office-ui-fabric-react/lib/Icon';

import {PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import Service from './Service1';

const stackTokens = { childrenGap: 20 };

const stackButtonStyles: Partial<IStackStyles> = { root: { width: 10 } };


const stackStyles: Partial<IStackStyles> = { root: { padding: 10} };
const COIdrpYesorNo:IDropdownOption[]=[  { key: "Yes", text: "Yes"},  { key: "No", text: "No" }];  

const drpQunativeRisk:IDropdownOption[]=[  { key: "Low", text: "Low"},  { key: "Medium", text: "Medium" },{ key: "High", text: "High" }];  

const drpQualitative:IDropdownOption[]=[  { key: "Low", text: "Low"},  { key: "Medium", text: "Medium" },{ key: "High", text: "High" }];  

const drpRiskTeamReview:IDropdownOption[]=[  { key: "Accept", text: "Accept"},  { key: "Mitigate", text: "Mitigate" },{ key: "Not a Conflict", text: "Not a Conflict" },{ key: "Reject", text: "Reject" } ];  

const drpHrEmployeeStatus:IDropdownOption[]=[  { key: "Candidate was on-boarded", text: "Candidate was on-boarded"},  { key: "Candidate not on-boarded", text: "Candidate not on-boarded" },{ key: "Current Employee", text: "Current Employee" } ]; 

const drpHrReview:IDropdownOption[]=[  { key: "Accept", text: "Accept"},  { key: "Mitigate", text: "Mitigate" } ]; 

const drpFollowupActions:IDropdownOption[]=[  { key: "Yes", text: "Yes"},  { key: "No", text: "No" }];  

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 350 },
};

const HrdropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 250 },
};


let ReviewerName='';

let HRSign='';

let itemId='';

let Envval='';

export interface IConflictRegistrationDetails
{
  MyName:any;
  Bussinessunitval:any;
  MyListItems:any;
  DoyowanttoRegisterWorkEmployment:any;
  CompanyNameWorkEmployment:any;
  TypeofcompanyorRegnumberWorkEmployment:any;
  PositionWorkEmployment:any;
  DetailsWorkEmployment:any;

  PaidorUnpaidWorkEmployment:any;
  ActiveorDormamantCompanyWorkEmployment:any;
  CompanyInvolvedFinancialServicesWorkEmployment:any;
  SitonBoardoFDirectorsWorkEmployment:any;
  OBoardCapcoClientWorkEmployment:any;

  StockRange:any;

  //Section4
  
  HaveyoubeenaddedInsiderInformation:any;
  YourFullNameInsiderInformation:any;
  SelectDateInsiderInformation:any;
 ClientNameInsiderInformation:any;
 ClientProjectInsiderInformation:any;
 WhomesclatedInsiderInformation:any;
 InsiderDateInsiderInformation:any;
  //End

  //4
  ConflictYesNo:any;
  ConflictDetails:any;
  //end

  RiskTeam:any;
  ReviewerNameId:any;
  ReviewerComments:any;
  hrrequired:any;
  FileValue:any;
  disableFileUpload:boolean;
  QualitativeRisk:any;
  QuantativeRisk:any;

  RiskTeamStatus:any;
  RiskReviewverExsits:boolean;
  AttachmentFiles:any;
  RiskReviewervalue:any;
  HRExsits:boolean;

  //HR
  HREmployeeStatus:any;
  HRApprovalStatus:any;
  HRReview:any;
  MitigateComments:any;
  FollowupActions:any;
  FollowupComments:any;
  HRSignId:any;
  //End
  
  MyRecordId:any;
  MyBussinessValuetext:any;
}




export default class ConflictRegistryDetails extends React.Component<IConflictRegistryDetailsProps, IConflictRegistrationDetails> {
  
  public _service: any;
  public GlobalService1: any;
  protected ppl:any;

  public constructor(props:IConflictRegistryDetailsProps) {

    super(props);

    this.state={

      //Section1

      MyName:"",
      Bussinessunitval:"",

      //End

      MyListItems:[],
      //Section2

      DoyowanttoRegisterWorkEmployment:"",
      CompanyNameWorkEmployment:"",
      TypeofcompanyorRegnumberWorkEmployment:"",
      PositionWorkEmployment:"",
      DetailsWorkEmployment:"",
      PaidorUnpaidWorkEmployment:"",
      ActiveorDormamantCompanyWorkEmployment:"",
      CompanyInvolvedFinancialServicesWorkEmployment:"",
      SitonBoardoFDirectorsWorkEmployment:"",
      OBoardCapcoClientWorkEmployment:"",

      //End

      //Section3

      StockRange:"",

      //End

      //Section4

      HaveyoubeenaddedInsiderInformation:"",
      YourFullNameInsiderInformation:"",
      SelectDateInsiderInformation:"",
      ClientNameInsiderInformation:"",
      ClientProjectInsiderInformation:"",
      WhomesclatedInsiderInformation:"",
      InsiderDateInsiderInformation:"",

      //End

      ConflictYesNo:"",
      ConflictDetails:"",


      RiskTeam:"",
      ReviewerNameId:[],
      ReviewerComments:"",
      hrrequired:"",
      FileValue:[],
      disableFileUpload:false,
      QualitativeRisk:"",
      QuantativeRisk:"",
      RiskTeamStatus:"",
      RiskReviewverExsits:false,
      AttachmentFiles:[],
      RiskReviewervalue:"",
      HRExsits:false,
      HREmployeeStatus:"",
      HRApprovalStatus:"",
      HRReview:"",
      MitigateComments:"",
      FollowupActions:"",
      FollowupComments:"",
      HRSignId:[],
      MyRecordId:"",
      MyBussinessValuetext:""


    };

    this._service = new Service(this.props.url, this.props.context);
    
    this.GlobalService1 = new Service(this.props.url, this.props.context);

         
    itemId = this.getParam('SID');

    this.GetData();

    this.GetEnvironment();
   
  }



  public  getParam( name:any )
{
 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec(window.location.href);
 if( results == null )
 return "";
 else
 return results[1];
}

public async GetData()
{

  this.getReviewersGrouporNot();
  this.getHRGrouporNot();

  if(itemId!="")
  {
 
   this.GetMyRecords();
   
  }

}

public async GetMyRecords()
{

  let myitemId = this.getParam('SID');
 
 let ItemInfo1 = await this._service.getItemByRecords(myitemId);

  this.setState({ MyListItems: ItemInfo1 });

 
  this.setState({ MyName: ItemInfo1.Name });

  this.setState({DoyowanttoRegisterWorkEmployment:ItemInfo1.DoYouwishtoRegister});

  this.setState({CompanyNameWorkEmployment:ItemInfo1.CompanyName});

  this.setState({TypeofcompanyorRegnumberWorkEmployment:ItemInfo1.TypeOfcompany});

  this.setState({PositionWorkEmployment:ItemInfo1.Position});

  this.setState({DetailsWorkEmployment:ItemInfo1.DetailsWorkEmployment});

  this.setState({MyBussinessValuetext:ItemInfo1.BussinessValue});
  this.setState({PaidorUnpaidWorkEmployment:ItemInfo1.PaidorUnpaid});

  this.setState({ActiveorDormamantCompanyWorkEmployment:ItemInfo1.ActiveorDormamantCompany});

  this.setState({CompanyInvolvedFinancialServicesWorkEmployment:ItemInfo1.CompanyInvolvedFinancialServices});

  this.setState({SitonBoardoFDirectorsWorkEmployment:ItemInfo1.SitonBoardoFDirectors});

  this.setState({OBoardCapcoClientWorkEmployment:ItemInfo1.OBoardCapcoClient});

  this.setState({StockRange:ItemInfo1.CompanyStock});

  //Section4

  this.setState({HaveyoubeenaddedInsiderInformation:ItemInfo1.InsiderTraderAdded});
  this.setState({YourFullNameInsiderInformation:ItemInfo1.YourFullName});

   this.setState({SelectDateInsiderInformation:ItemInfo1.SelectDate});
   this.setState({ClientNameInsiderInformation:ItemInfo1.Clientname});
  this.setState({ClientProjectInsiderInformation:ItemInfo1.Projectname});
  this.setState({WhomesclatedInsiderInformation:ItemInfo1.WhomEsclated});
  this.setState({InsiderDateInsiderInformation:ItemInfo1.Anticpateddate});

  this.setState({ConflictYesNo:ItemInfo1.ConflictofIntrest});
  this.setState({ConflictDetails:ItemInfo1.DetailsofConflict});

  this.setState({HRApprovalStatus:ItemInfo1.HRStatus});
  this.setState({RiskTeamStatus:ItemInfo1.ReviewerStatus});

  //End

  //Riskteam

  if(ItemInfo1.ReviewerStatus=='Completed')

  {

  
  this.setState({RiskTeam:ItemInfo1.RiskTeamReview});
  //ReviewPending
  this.setState({QualitativeRisk:ItemInfo1.QualitativeRisk});
  this.setState({QuantativeRisk:ItemInfo1.QuantativeRisk});
  this.setState({ReviewerComments:ItemInfo1.ReviewerComments});
  this.setState({hrrequired:ItemInfo1.DoesItRequiresHRApproval});
  this.setState({AttachmentFiles:ItemInfo1.AttachmentFiles});
  this.setState({RiskReviewervalue:ItemInfo1.RiskTeamReviewer.EMail});
  

  }
  //END

  //HR

  

  if(ItemInfo1.HRStatus=='Completed' && ItemInfo1.ReviewerStatus=='Completed')

  {
    this.setState({RiskReviewervalue:ItemInfo1.RiskTeamReviewer.EMail});
    this.setState({HREmployeeStatus:ItemInfo1.EmploymentStatus});
    this.setState({HRReview:ItemInfo1.HRReview});
    this.setState({MitigateComments:ItemInfo1.MitigationComments});
    this.setState({FollowupActions:ItemInfo1.FollowUpActions});
    this.setState({FollowupComments:ItemInfo1.FollowUpComments});
    this.setState({HRSignId:ItemInfo1.HRSign.EMail});
    
  }

  //END

}

private handleRiskTeam(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ RiskTeam:item.key });

}

private handleHREmployeeStatus(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ HREmployeeStatus:item.key });

}

private handleHRReview(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ HRReview:item.key });

}

private handleFoolowupActions(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ FollowupActions:item.key });

}

private handleQunattaitveRisk(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ QuantativeRisk:item.key });

}

private handleQualitaveeRisk(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ QualitativeRisk:item.key });

}

private handlehrreview(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ hrrequired:item.key });

}

private async _getPeoplePickerItems(items: any[]) {
  console.log('Items:', items);

  if(items.length>0)
  {

    ReviewerName = items[0].text;

    let userInfo = this._service.getUserByLogin(items[0].loginName).then((info:any)=>{
    this.setState({ReviewerNameId:info});
    console.log(userInfo)
    console.log(ReviewerName)
    
});

  }

  else
  {

    this.setState({ReviewerNameId:null});
  }



}

private async _getPeoplePickerItems1(items: any[]) {
  console.log('Items:', items);

  if(items.length>0)
  {

    HRSign = items[0].text;

    let userInfo = this._service.getUserByLogin(items[0].loginName).then((info:any)=>{
    this.setState({HRSignId:info});
    console.log(userInfo)
    console.log(HRSign)
    
});

  }

  else
  {

    this.setState({ReviewerNameId:null});
  }



}

private Changecomments(data: any): void {

  this.setState({ ReviewerComments: data.target.value });

}


private changeFileupload(data: any) {

  let LocalFileVal= this.state.FileValue;
  
   LocalFileVal.push(data.target.files[0]);
  
  
  this.setState({FileValue:LocalFileVal});
  
  if(this.state.FileValue.length>2)
  {
  this.setState({disableFileUpload:true});
  
  }
  
  
  }

  private _removeItemFromDetail(Item: any) {
    console.log("itemId: " + Item.name); 
  
   let localFileValues=[];
  
   localFileValues=this.state.FileValue;
  
   if(localFileValues.length==1)
   {
  
    localFileValues=[];
   }
  
  
    for(var count=0;count<localFileValues.length;count++)
    {
  
      if(localFileValues[count].name==Item.name)
        {
          let Index=count;
  
          localFileValues.splice(Index,count);
  
        }
  
    }
  
    this.setState({FileValue:localFileValues,disableFileUpload:false});
  
  
  }


  private OnRiskTeamBtnClick():void{

   if(this.state.RiskTeam==''||this.state.RiskTeam==null)
   {

    alert('Please Select Risk Team')


  }

  else if(this.state.ReviewerNameId=='')
  {

    alert('Please Select RiskTeamReviewer')
  }

  else if(this.state.QualitativeRisk==''||this.state.QualitativeRisk==null)
  {

    alert('Please Select Qualitative Risk Value')
  }

  else if(this.state.QuantativeRisk==''||this.state.QuantativeRisk==null)
  {

    alert('Please Select Quantative Risk Value')
  }

  
  else if(this.state.hrrequired==null || this.state.hrrequired=='')
  {

    alert('Please Select COI Require future review by HR')
  }

  else if(this.state.FileValue.length==0)
  {

    alert('Please Select file to upload')
  }


  else
  {


    let myfiles=[];

    for(var count=0;count<this.state.FileValue.length;count++)
    {
      
      myfiles.push(this.state.FileValue[count]);
    }

   
    this._service.updateReviewrDetails(
      
    itemId,
    this.state.RiskTeam,
    (this.state.ReviewerNameId == null ? 0:this.state.ReviewerNameId.Id),
    this.state.QualitativeRisk,
    this.state.QuantativeRisk,
    this.state.ReviewerComments,
    this.state.hrrequired,
    myfiles

    ).then(function (data:any)
    {

      
  
      alert('Record updated successfully');

      window.location.replace(Envval);
  
 
  
    });
    
  }

  }

  private OnHRBtnClick():void{

  if(this.state.HREmployeeStatus=='' ||this.state.HREmployeeStatus==null)
  {
    alert('Please Select Employee Status')
  }

  else if(this.state.HRReview=='' || this.state.HRReview==null)
  {
    alert('Please Select HR Review')

  }

  else if(this.state.FollowupActions=='' || this.state.FollowupActions==null)
  {
    alert('Please Select FallowUpActions')

  }

  else
  {

    this._service.updateHRDetails(
      
itemId,
this.state.HREmployeeStatus,
this.state.HRReview,
this.state.MitigateComments,
this.state.FollowupActions,
this.state.FollowupComments,
(this.state.HRSignId == null ? 0:this.state.HRSignId.Id)
  
      
  
      ).then(function (data:any)
      {
         

        alert('Record updated successfully');

        window.location.replace(Envval);
    
   
    
      });
  }

   

 
   }

  public async getReviewersGrouporNot() {
    let mycurgroup= await this._service.getCurrentUserSiteGroups();
     console.log(mycurgroup.length);
     for (let grpcount = 0; grpcount < mycurgroup.length; grpcount++) {
  
      if(mycurgroup[grpcount].Title=='RiskReviewers')
      {
  
        this.setState({ RiskReviewverExsits: true });

        
       
  
      }

    }
  }

  public async getHRGrouporNot() {
    let mycurgroup= await this._service.getCurrentUserSiteGroups();
     console.log(mycurgroup.length);
     for (let grpcount = 0; grpcount < mycurgroup.length; grpcount++) {
  
      if(mycurgroup[grpcount].Title=='HRGroup')
      {
  
        this.setState({ HRExsits: true });

      }

    }
  }

  private ChangeMitigatecomments(data: any): void {

    this.setState({ MitigateComments: data.target.value });
  
  }

  private ChangeFollowUpcomments(data: any): void {

    this.setState({ FollowupComments: data.target.value });
  
  }

  public async GetEnvironment()
  {

    var data = await this._service.getEnvironment();

    console.log(data);

    var AllEnvironments: any = [];

    for (var k in data) {

      AllEnvironments.push({ key: data[k].ID, text: data[k].Title});

      Envval=data[0].Title;

      
    }

   
  }

  



  public render(): React.ReactElement<IConflictRegistryDetailsProps> {
   
   return (


<Stack tokens={stackTokens} styles={stackStyles}>

<div>  

<div className={styles.Divsection}> 

<b><label className={styles.HeadLable}>COI ID: {itemId} </label></b><br></br><br></br>

</div>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Contact Information</label></b><br></br><br></br>

</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Name</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.MyName == null ? 'N/A' : this.state.MyName}</label><br/><br/>

<b><label className={styles.labelsFonts}>Bussiness Unit</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.MyBussinessValuetext==null ? 'N/A' :this.state.MyBussinessValuetext}</label><br/><br/>

</div>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Work Employment / Activities</label></b><br></br><br></br>

</div>



<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Risk Team Review </label></b><br/><br/>
<label className={styles.ValueFonts}> {this.state.DoyowanttoRegisterWorkEmployment == null ? 'N/A' : this.state.DoyowanttoRegisterWorkEmployment}</label><br/><br/>
<b><label className={styles.labelsFonts}>Company Name</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.CompanyNameWorkEmployment == null ? 'N/A' : this.state.CompanyNameWorkEmployment}</label><br/><br/>
<b><label className={styles.labelsFonts}>Type of Company / Registration Number</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.TypeofcompanyorRegnumberWorkEmployment == null ? 'N/A' : this.state.TypeofcompanyorRegnumberWorkEmployment}</label><br/><br/>
<b><label className={styles.labelsFonts}>Position</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.PositionWorkEmployment == null ? 'N/A' : this.state.PositionWorkEmployment}</label><br/><br/>
<b><label className={styles.labelsFonts}>Details</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.DetailsWorkEmployment == null ? 'N/A' : this.state.DetailsWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>Paid / Unpaid / Voluntary</label></b><br/><br/>  
<label className={styles.ValueFonts}> {this.state.PaidorUnpaidWorkEmployment == null ? 'N/A' : this.state.PaidorUnpaidWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>Is this an active or dormant company?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.ActiveorDormamantCompanyWorkEmployment == null ? 'N/A' : this.state.ActiveorDormamantCompanyWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>Is the company involved in financial services included but not limited to: banking, hedge funds, real estate, private equity or financial technology?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.CompanyInvolvedFinancialServicesWorkEmployment == null ? 'N/A' : this.state.CompanyInvolvedFinancialServicesWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>Do you sit on the Board of Directors?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.SitonBoardoFDirectorsWorkEmployment == null ? 'N/A' : this.state.SitonBoardoFDirectorsWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>As a Board of Director, are you on a Board with a Capco client or an employee of a Capco client?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.OBoardCapcoClientWorkEmployment == null ? 'N/A' : this.state.OBoardCapcoClientWorkEmployment}</label><br/><br/>


</div>

<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Share Ownership</label></b><br></br><br></br>
</div>

<div className={styles.Divsection}>
<b><label className={styles.labelsFonts}>Do you maintain ownership of a company stock greater than 5%? </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.StockRange == null ? 'N/A' : this.state.StockRange}</label><br/><br/>
</div> 



<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Insider Trading List Identification</label></b><br></br><br></br>

</div>


<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Have you been added as part of an insider's trader list? </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.HaveyoubeenaddedInsiderInformation == null ? 'N/A' : this.state.HaveyoubeenaddedInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Your Full Name</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.YourFullNameInsiderInformation == null ? 'N/A' : this.state.YourFullNameInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Insider Date</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.InsiderDateInsiderInformation == null ? 'N/A' : this.state.InsiderDateInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Client Name</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.ClientNameInsiderInformation == null ? 'N/A' : this.state.ClientNameInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Client project name or code phrase</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.ClientProjectInsiderInformation == null ? 'N/A' : this.state.ClientProjectInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>To whom was this escalated?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.WhomesclatedInsiderInformation == null ? 'N/A' : this.state.WhomesclatedInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Anticipated date</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.InsiderDateInsiderInformation == null ? 'N/A' : this.state.InsiderDateInsiderInformation}</label><br/><br/>
</div>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Other Conflicts</label></b><br></br><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Are there any other conflicts of interest? </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.ConflictYesNo == null ? 'N/A' : this.state.ConflictYesNo}</label><br/><br/>
<b><label className={styles.labelsFonts}>Details of Conflict </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.ConflictDetails == null ? 'N/A' : this.state.ConflictDetails}</label><br/><br/>

</div>

{this.state.RiskTeamStatus == 'Pending' && this.state.RiskReviewverExsits==true &&

<div> 
<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Enterprise Risk Review</label></b><br></br><br></br>

</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Risk Team Review<label className={styles.recolorss}>*</label></label></b><br/><br/> 
<Dropdown className={styles.onlyFont}
  placeholder="Select Risk Team"
  options={drpRiskTeamReview}
  styles={dropdownStyles}
  selectedKey={this.state.RiskTeam ? this.state.RiskTeam : undefined} onChange={this.handleRiskTeam.bind(this)}/><br></br>

<b><label className={styles.labelsFonts}>Reviewer Sign<label className={styles.recolorss}>*</label></label></b><br/><br/> 
<div className={styles.myBackcolorTest1}>  
              <PeoplePicker 
                  context={this.props.context}
                  //titleText="User Name"
                  personSelectionLimit={1}
                  showtooltip={true}
                  required={true}
                  disabled={false}
                  onChange={this._getPeoplePickerItems.bind(this)}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  defaultSelectedUsers={(this.state.ReviewerNameId && this.state.ReviewerNameId.length) ? [this.state.ReviewerNameId] : []}
                  ref={c => (this.ppl = c)} 
                  resolveDelay={1000} />  

<br></br>

</div>

<br></br><br></br>

<div className={styles.Divsection}>  

<b><label className={styles.labelsFonts}>Risk Classification Descriptions</label></b><br></br>

</div>

<div className={styles.Divsection}>  

<p className={styles.labelsFonts}>Qualitatively:Would be reasonable to believe the private interests could influence Employee X's Perfomance of their job duites(for example,close affllations with people or organizations, or
personal assets or Investments,etc.);</p><br></br>
<p className={styles.labelsFonts}>Quantitatively:
Would be reasonable to believe the private interests could influence Employee X's Perfomance of their job duites(for example,a significant family business intrest,opprtunity to make a large
financial profit or avoid a large loss,etc).</p>
</div>

<div className={styles.Divsection}>  

<b><label className={styles.labelsFonts}>Qualitative Risk<label className={styles.recolorss}>*</label></label></b><br></br>

</div>

<div className={styles.Divsection}>  

<Dropdown className={styles.onlyFont}
  placeholder="Select Qualitative Risk"
  options={drpQualitative}
  styles={dropdownStyles}
  selectedKey={this.state.QualitativeRisk ? this.state.QualitativeRisk : undefined} onChange={this.handleQualitaveeRisk.bind(this)}/><br></br>

</div>

<div className={styles.Divsection}>  

<b><label className={styles.labelsFonts}>Quantative Risk<label className={styles.recolorss}>*</label></label></b><br></br>

</div>

<div className={styles.Divsection}>  

<Dropdown className={styles.onlyFont}
  placeholder="Select Quantative Risk"
  options={drpQunativeRisk}
  styles={dropdownStyles}
  selectedKey={this.state.QuantativeRisk ? this.state.QuantativeRisk : undefined} onChange={this.handleQunattaitveRisk.bind(this)}/><br></br>

</div>


<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Comments/Recommendations</label></b><br></br>

</div>

<div className={styles.Divsection}>  
<textarea id="txtDetails" value={this.state.ReviewerComments} onChange={this.Changecomments.bind(this)} className={styles.blockcolor}></textarea>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Does COI Require future review by HR ? <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<Dropdown className={styles.onlyFont}
  placeholder="Select  Yes or NO"
  options={COIdrpYesorNo}
  styles={dropdownStyles}
  selectedKey={this.state.hrrequired ? this.state.hrrequired : undefined} onChange={this.handlehrreview.bind(this)}/><br></br>
</div>

<div className={styles.Divsection}>

<b><label className={styles.labelsFonts}>COI Eveidence<label className={styles.recolorss}>*</label></label></b><br/>
             <div> 
  
            <input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileupload.bind(this)} disabled={this.state.disableFileUpload}/>
  
           
             {this.state.FileValue.map((item:any,index:any) =>(
  
              <div className={styles.padcss}>  
              
              {item.name} <Icon iconName='Delete'  onClick={(event:any) => {this._removeItemFromDetail(item)}}/>
  
              </div>
               
  
  ))}
  
</div>
</div>

</div>

<div className={styles.Divsection}> 

<PrimaryButton text="Submit" onClick={this.OnRiskTeamBtnClick.bind(this)} styles={stackButtonStyles} className={styles.welcomeImage} disabled={this.state.RiskReviewverExsits == true?false :true }/><br></br>

</div>

</div>

}

{this.state.RiskTeamStatus == 'Completed' &&

<div> 
<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Enterprise Risk Review</label></b><br></br><br></br>

</div>

<div className={styles.Divsection}> 

<b><label className={styles.labelsFonts}>Risk Team Review</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.RiskTeam == null ? 'N/A' : this.state.RiskTeam}</label><br/><br/>
<b><label className={styles.labelsFonts}>Risk Signature</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.RiskReviewervalue == null ? 'N/A' : this.state.RiskReviewervalue}</label><br/><br/>
<b><label className={styles.labelsFonts}>Quantative Risk</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.QuantativeRisk == null ? 'N/A' : this.state.QuantativeRisk}</label><br/><br/>
<b><label className={styles.labelsFonts}>Qualitative Risk</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.QualitativeRisk == null ? 'N/A' : this.state.QualitativeRisk}</label><br/><br/>
<b><label className={styles.labelsFonts}>Comments</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.ReviewerComments == null ? 'N/A' : this.state.ReviewerComments}</label><br/><br/>
<b><label className={styles.labelsFonts}>Does COI Require future review by HR ?</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.hrrequired == null ? 'N/A' : this.state.hrrequired}</label><br/><br/>
<b><label className={styles.labelsFonts}>COI Evidence</label></b><br/><br/>
{this.state.AttachmentFiles.length>0 && this.state.AttachmentFiles.map((item:any,index:any) =>( 
    <div><a href={item.ServerRelativeUrl} target="_blank">{item.FileName} </a></div>
   ))}


</div>
</div>

}

{this.state.RiskTeamStatus == 'Completed' && this.state.HRExsits==true && this.state.HRApprovalStatus=='Pending' &&

<div> 
<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>HR Review</label></b><br></br><br></br>

</div>

<div className={styles.Divsection}>  

<b><label className={styles.labelsFonts}>Details</label></b><br></br>

</div>
<div className={styles.Divsection}>  

<b><label className={styles.labelsFonts}>Employment Status<label className={styles.recolorss}>*</label></label></b><br/><br/>
<Dropdown className={styles.onlyFont}
  placeholder="Select Employee Status"
  options={drpHrEmployeeStatus}
  styles={HrdropdownStyles}
  selectedKey={this.state.HREmployeeStatus ? this.state.HREmployeeStatus : undefined} onChange={this.handleHREmployeeStatus.bind(this)}/><br></br>

<b><label className={styles.labelsFonts}>HR Review<label className={styles.recolorss}>*</label></label></b><br/><br/>
<Dropdown className={styles.onlyFont}
  placeholder="Select HR Review"
  options={drpHrReview}
  styles={HrdropdownStyles}
  selectedKey={this.state.HRReview ? this.state.HRReview : undefined} onChange={this.handleHRReview.bind(this)}/><br></br>
 </div>

<b><label className={styles.labelsFonts1}>HR Signature<label className={styles.recolorss}>*</label></label></b><br/><br/>
 <div className={styles.myBackcolorTest}>  
              <PeoplePicker 
                  context={this.props.context}
                  //titleText="User Name"
                  personSelectionLimit={1}
                  showtooltip={true}
                  required={true}
                  disabled={false}
                  onChange={this._getPeoplePickerItems1.bind(this)}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  defaultSelectedUsers={(this.state.HRSignId && this.state.HRSignId.length) ? [this.state.HRSignId] : []}
                  ref={c => (this.ppl = c)} 
                  resolveDelay={1000} />  

<br></br>

</div>

<br></br>

{this.state.HRReview == 'Mitigate' &&
<div>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Mitigate Comments</label></b><br></br>
</div>
<div className={styles.Divsection}> 
<textarea id="txtmitigatecomments" value={this.state.MitigateComments} onChange={this.ChangeMitigatecomments.bind(this)} className={styles.blockcolor}></textarea>
</div>
</div>

}

<div className={styles.Divsection}> 

<b><label className={styles.labelsFonts}>Follow-up Actions<label className={styles.recolorss}>*</label></label></b><br/><br/>
<Dropdown className={styles.onlyFont}
  placeholder="Select FollowUp-Actions"
  options={drpFollowupActions}
  styles={HrdropdownStyles}
  selectedKey={this.state.FollowupActions ? this.state.FollowupActions : undefined} onChange={this.handleFoolowupActions.bind(this)}/><br></br>
</div>

{this.state.FollowupActions == 'Yes' &&
<div>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Follow-up Comments</label></b><br></br>

</div>
<div className={styles.Divsection}> 
<textarea id="txtFollowupComments" value={this.state.FollowupComments} onChange={this.ChangeFollowUpcomments.bind(this)} className={styles.blockcolor}></textarea>
</div>
</div>
}

<PrimaryButton text="Submit" onClick={this.OnHRBtnClick.bind(this)} styles={stackButtonStyles} className={styles.welcomeImage}/><br></br>

</div>

}

{this.state.RiskTeamStatus == 'Completed' && this.state.HRApprovalStatus=='Completed' &&


<div>  

{/* <div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Contact Information</label></b><br></br><br></br>

</div>

<br></br>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Name</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.MyName == null ? 'N/A' : this.state.MyName}</label><br/><br/>

<b><label className={styles.labelsFonts}>Bussiness Unit</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.Bussinessunitval==null ? 'N/A' :this.state.Bussinessunitval}</label><br/><br/>

</div>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Work Employment / Activities</label></b><br></br><br></br>

</div>


<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Risk Team Review </label></b><br/><br/>
<label className={styles.ValueFonts}> {this.state.DoyowanttoRegisterWorkEmployment == null ? 'N/A' : this.state.DoyowanttoRegisterWorkEmployment}</label><br/><br/>
<b><label className={styles.labelsFonts}>Company Name</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.CompanyNameWorkEmployment == null ? 'N/A' : this.state.CompanyNameWorkEmployment}</label><br/><br/>
<b><label className={styles.labelsFonts}>Type of Company / Registration Number</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.TypeofcompanyorRegnumberWorkEmployment == null ? 'N/A' : this.state.TypeofcompanyorRegnumberWorkEmployment}</label><br/><br/>
<b><label className={styles.labelsFonts}>Position</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.PositionWorkEmployment == null ? 'N/A' : this.state.PositionWorkEmployment}</label><br/><br/>
<b><label className={styles.labelsFonts}>Details</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.DetailsWorkEmployment == null ? 'N/A' : this.state.DetailsWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>Paid / Unpaid / Voluntary</label></b><br/><br/>  
<label className={styles.ValueFonts}> {this.state.PaidorUnpaidWorkEmployment == null ? 'N/A' : this.state.PaidorUnpaidWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>Is this an active or dormant company?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.ActiveorDormamantCompanyWorkEmployment == null ? 'N/A' : this.state.ActiveorDormamantCompanyWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>Is the company involved in financial services included but not limited to: banking, hedge funds, real estate, private equity or financial technology?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.CompanyInvolvedFinancialServicesWorkEmployment == null ? 'N/A' : this.state.CompanyInvolvedFinancialServicesWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>Do you sit on the Board of Directors?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.SitonBoardoFDirectorsWorkEmployment == null ? 'N/A' : this.state.SitonBoardoFDirectorsWorkEmployment}</label><br/><br/>

<b><label className={styles.labelsFonts}>As a Board of Director, are you on a Board with a Capco client or an employee of a Capco client?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.OBoardCapcoClientWorkEmployment == null ? 'N/A' : this.state.OBoardCapcoClientWorkEmployment}</label><br/><br/>

</div>

<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Share Ownership</label></b><br></br><br></br>
</div>

<div className={styles.Divsection}>
<b><label className={styles.labelsFonts}>Do you maintain ownership of a company stock greater than 5%? </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.StockRange == null ? 'N/A' : this.state.StockRange}</label><br/><br/>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Insider Trading List Identification</label></b><br></br>

</div>
<br></br>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Have you been added as part of an insider's trader list? </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.HaveyoubeenaddedInsiderInformation == null ? 'N/A' : this.state.HaveyoubeenaddedInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Your Full Name</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.YourFullNameInsiderInformation == null ? 'N/A' : this.state.YourFullNameInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Insider Date</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.InsiderDateInsiderInformation == null ? 'N/A' : this.state.InsiderDateInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Client Name</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.ClientNameInsiderInformation == null ? 'N/A' : this.state.ClientNameInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Client project name or code phrase</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.ClientProjectInsiderInformation == null ? 'N/A' : this.state.ClientProjectInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>To whom was this escalated?</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.WhomesclatedInsiderInformation == null ? 'N/A' : this.state.WhomesclatedInsiderInformation}</label><br/><br/>
<b><label className={styles.labelsFonts}>Anticipated date</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.InsiderDateInsiderInformation == null ? 'N/A' : this.state.InsiderDateInsiderInformation}</label><br/><br/>
</div>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Other Conflicts</label></b><br></br><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Are there any other conflicts of interest? </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.ConflictYesNo == null ? 'N/A' : this.state.ConflictYesNo}</label><br/><br/>
<b><label className={styles.labelsFonts}>Details of Conflict </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.ConflictDetails == null ? 'N/A' : this.state.ConflictDetails}</label><br/><br/>

</div>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Enterprise Risk Review</label></b><br></br><br></br>

</div>

<div className={styles.Divsection}>  

<b><label className={styles.labelsFonts}>Risk Team Review</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.RiskTeam == null ? 'N/A' : this.state.RiskTeam}</label><br/><br/>
<b><label className={styles.labelsFonts}>Risk Signature</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.RiskReviewervalue == null ? 'N/A' : this.state.RiskReviewervalue}</label><br/><br/>
<b><label className={styles.labelsFonts}>Quantative Risk</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.QuantativeRisk == null ? 'N/A' : this.state.QuantativeRisk}</label><br/><br/>
<b><label className={styles.labelsFonts}>Qualitative Risk</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.QualitativeRisk == null ? 'N/A' : this.state.QualitativeRisk}</label><br/><br/>
<b><label className={styles.labelsFonts}>Comments</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.ReviewerComments == null ? 'N/A' : this.state.ReviewerComments}</label><br/><br/>
<b><label className={styles.labelsFonts}>Does COI Require future review by HR ?</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.hrrequired == null ? 'N/A' : this.state.hrrequired}</label><br/><br/>
<b><label className={styles.labelsFonts}>COI Evidence</label></b><br/><br/>
{this.state.AttachmentFiles.length>0 && this.state.AttachmentFiles.map((item:any,index:any) =>( 
    <div><a href={item.ServerRelativeUrl} target="_blank">{item.FileName} </a></div>
   ))}

</div> */}

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>HR Review</label></b><br></br><br></br>

</div>

<div className={styles.Divsection}> 

<b><label className={styles.labelsFonts}>Employee Status</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.HREmployeeStatus == null ? 'N/A' : this.state.HREmployeeStatus}</label><br/><br/>
<b><label className={styles.labelsFonts}>HRReview</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.HRReview == null ? 'N/A' : this.state.HRReview}</label><br/><br/>
<b><label className={styles.labelsFonts}>Mitigation Comments</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.MitigateComments == null ? 'N/A' : this.state.MitigateComments}</label><br/><br/>
<b><label className={styles.labelsFonts}>Follow-up Actions</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.FollowupActions == null ? 'N/A' : this.state.FollowupActions}</label><br/><br/>
<b><label className={styles.labelsFonts}>Follow-up Comments</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.FollowupComments == null ? 'N/A' : this.state.FollowupComments}</label><br/><br/>
<b><label className={styles.labelsFonts}>HR Signature</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.HRSignId == null ? 'N/A' : this.state.HRSignId}</label><br/><br/>
</div>
</div>

  
}

</div>

</Stack>
    );
  }
}
