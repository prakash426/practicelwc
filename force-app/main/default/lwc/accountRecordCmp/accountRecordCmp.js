import { LightningElement } from 'lwc';
import displayAccounts from '@salesforce/apex/AccountRecordController.displayAccounts';

export default class AccountRecordCmp extends LightningElement {
    accounts;
    error;
    connectedCallback(){
        displayAccounts()
        .then(result=>{
            this.accounts=result;
            this.error=undefined;
        })
        .catch(error=>{
            this.error=error;
            this.accounts=undefined;
        }); 
    }
    handleUpdate(event){
        let index = event.target.dataset.index;
        alert('===selected record details==='+JSON.stringify(this.accounts[index].Name));
    }
}