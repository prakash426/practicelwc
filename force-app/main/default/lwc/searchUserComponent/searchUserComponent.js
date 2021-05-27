import { LightningElement } from 'lwc';

export default class SearchUserComponent extends LightningElement {
    fields = ["Name", "Username", "Phone"];
    displayFields = 'Name, Email, Phone'

    handleLookup(event){
        console.log( JSON.stringify( event.detail))
    }
}