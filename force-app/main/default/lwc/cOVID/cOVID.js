import { LightningElement, api, wire } from 'lwc';
import { getRecord , getFieldValue } from 'lightning/uiRecordApi';
import COVID_POSITIVE  from '@salesforce/schema/Candidate__c.COVID_Positive__c';



export default class WireGetRecordProperty extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [COVID_POSITIVE] }) 
    record;
 
    
    get COVID_Positive() {
    return getFieldValue(this.record.data, COVID_POSITIVE);
    }
    get isLoaded() {
        return !!this.record.data;
    }

    

    
    

   

    
}