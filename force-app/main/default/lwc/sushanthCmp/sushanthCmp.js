import { LightningElement } from "lwc";

export default class App extends LightningElement {
  value = [];

    get options() {
        return [
            { label: 'Pawan Kalyan', value: 'Thammudu, Khushi , Panja' },
            { label: 'Chiranjeevi', value: 'Indra' },
            { label: 'Venkatesh', value: 'Lakshmi' },
            { label: 'Nagarjuna', value: 'Super' },
            { label: 'Balakrishna', value: 'Simha' } 
        ];
    }

    get selected() {
        return this.value.length ? this.value : 'none';
    }

    handleChange(event){
      this.value  = event.detail.value;
    }
     
}
