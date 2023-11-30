import * as React from 'react';
import styles from './ConflictRegistryDetails.module.scss';
import { IConflictRegistryDetailsProps } from './IConflictRegistryDetailsProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {Stack,IStackStyles} from 'office-ui-fabric-react'; 
import { Dropdown,IDropdownStyles,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';

import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

import {Icon} from 'office-ui-fabric-react/lib/Icon';

import Service from './Service1';

const stackTokens = { childrenGap: 20 };
const stackStyles: Partial<IStackStyles> = { root: { padding: 10} };
const COIdrpYesorNo:IDropdownOption[]=[  { key: "Yes", text: "Yes"},  { key: "No", text: "No" }];  

const drpQunativeRisk:IDropdownOption[]=[  { key: "Yes", text: "Yes"},  { key: "No", text: "No" }];  

const drpQualitative:IDropdownOption[]=[  { key: "Yes", text: "Yes"},  { key: "No", text: "No" }];  

const drpRiskTeamReview:IDropdownOption[]=[  { key: "Accept", text: "Accept"},  { key: "Mitigate", text: "Mitigate" },{ key: "Not a Conflict", text: "Not a Conflict" },{ key: "Reject", text: "Reject" } ];  

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 350 },
};


let ReviewerName='';

let itemId='';



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
      QuantativeRisk:""

    };

    this._service = new Service(this.props.url, this.props.context);
    
    this.GlobalService1 = new Service(this.props.url, this.props.context);

         
    itemId = this.getParam('SID');

    this.GetData();
   
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

  this.setState({Bussinessunitval:ItemInfo1.BussinessUnitId});

  this.setState({ MyName: ItemInfo1.Name });

  this.setState({DoyowanttoRegisterWorkEmployment:ItemInfo1.DoYouwishtoRegister});

  this.setState({CompanyNameWorkEmployment:ItemInfo1.CompanyName});

  this.setState({TypeofcompanyorRegnumberWorkEmployment:ItemInfo1.TypeOfcompany});

  this.setState({PositionWorkEmployment:ItemInfo1.Position});

  this.setState({DetailsWorkEmployment:ItemInfo1.DetailsWorkEmployment});


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

  //End

}

private handleRiskTeam(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ RiskTeam:item.key });

}

private handleQunattaitveRisk(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ RiskTeam:item.key });

}

private handleQualitaveeRisk(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
  this.setState({ RiskTeam:item.key });

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


  public render(): React.ReactElement<IConflictRegistryDetailsProps> {
   
   return (


<Stack tokens={stackTokens} styles={stackStyles}>

<div>  

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Contact Information</label></b><br></br>

</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Name</label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.MyName == null ? 'N/A' : this.state.MyName}</label><br/><br/>

<b><label className={styles.labelsFonts}>Bussiness Unit</label></b><br/><br/>  
<label className={styles.ValueFonts}>{this.state.Bussinessunitval==null ? 'N/A' :this.state.Bussinessunitval}</label><br/><br/>

</div>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Work Employment / Activities</label></b><br></br>

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

<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Share Ownership</label></b><br></br>
</div>
<br></br>
<div>
<b><label className={styles.labelsFonts}>Do you maintain ownership of a company stock greater than 5%? </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.StockRange == null ? 'N/A' : this.state.StockRange}</label><br/><br/>
</div></div>

<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Insider Trading List Identification</label></b><br></br>

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

<b><label className={styles.HeadLable}>Other Conflicts</label></b><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Are there any other conflicts of interest? </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.ConflictYesNo == null ? 'N/A' : this.state.ConflictYesNo}</label><br/><br/>
<b><label className={styles.labelsFonts}>Details of Conflict </label></b><br/><br/>
<label className={styles.ValueFonts}>{this.state.ConflictDetails == null ? 'N/A' : this.state.ConflictDetails}</label><br/><br/>

</div>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Enterprise Risk Review</label></b><br></br>

</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Dose COI require future review by HR ?<label className={styles.recolorss}>*</label></label></b><br/><br/> 
<Dropdown className={styles.onlyFont}
  placeholder="Select Risk Team"
  options={drpRiskTeamReview}
  styles={dropdownStyles}
  selectedKey={this.state.RiskTeam ? this.state.RiskTeam : undefined} onChange={this.handleRiskTeam.bind(this)}/><br></br>


<div className={styles.myBackcolorTest}>  
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

<p className={styles.labelsFonts}>Qualitatively:</p><br></br>
<p className={styles.labelsFonts}>Quantitatively:</p>
</div>

<div className={styles.Divsection}>  

<b><label className={styles.labelsFonts}>Quantative Risk</label></b><br></br>

</div>

<div className={styles.Divsection}>  

<Dropdown className={styles.onlyFont}
  placeholder="Select Qualitative Risk"
  options={drpQualitative}
  styles={dropdownStyles}
  selectedKey={this.state.QualitativeRisk ? this.state.QualitativeRisk : undefined} onChange={this.handleQualitaveeRisk.bind(this)}/><br></br>

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
<b><label className={styles.labelsFonts}>Do you wish to register any outside of work employment or activities outlined within the acknowledgement above that you are involved in? <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<Dropdown className={styles.onlyFont}
  placeholder="Select  Yes or NO"
  options={COIdrpYesorNo}
  styles={dropdownStyles}
  selectedKey={this.state.hrrequired ? this.state.hrrequired : undefined} onChange={this.handlehrreview.bind(this)}/><br></br>
</div>

<div className={styles.Divsection}>

<b><label className={styles.labelsFonts}>COI Eveidence</label></b><br/>
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

</div>


</Stack>
    );
  }
}
