import { LightningElement, track } from 'lwc';

export default class LwcCombobox extends LightningElement {
@track movie = 'inProgress';

    get options() {
    return [
             { label: '1992', value: 'Tholiprema' },
             { label: '1993', value: 'Badri' },
             { label: '1994', value: 'Kushi' },
           ];
    }   
    handleChange(event) {
        this.movie = event.detail.value;
     }
    }
