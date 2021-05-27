import { LightningElement, track } from 'lwc';

export default class PawanMovies extends LightningElement {
    @track movie;

    get options() {
    return [
                { label: '1996', value: 'Akkada Ammayi Ikkada Abbayi' },
                { label: '1997', value: 'Gokulamlo Seeta' },
                { label: '1998', value: '1. Suswagatham 2. Tholi Prema' },
                { label: '1999', value: 'Thammudu' },
                { label: '2000', value: 'Badri' },
                { label: '2001', value: 'Kushi' },
                { label: '2003', value: 'Johnny' },
                { label: '2004', value: '1. Gudumba Shankar 2. Shankar Dada M.B.B.S ' },
                { label: '2005', value: 'Balu' },
                { label: '2006', value: '1. Bangaram 2. Annavaram' },
                { label: '2007', value: 'Shankar Dada Zindabad' },
                { label: '2008', value: 'Jalsa' },
                { label: '2010', value: 'Puli' },
                { label: '2011', value: '1. Teen Maar 2. Panjaa' },
                { label: '2012', value: '1. Gabbar Singh 2. Cameraman Ganga Tho Rambabu' },
                { label: '2013', value: 'Attarintiki Daredi' },
                { label: '2015', value: 'Gopala Gopala' },
                { label: '2016', value: 'Sardaar Gabbar Singh' },
                { label: '2017', value: 'Katamarayudu' },
                { label: '2018', value: 'Agnyaathavaasi' },
                { label: '2021', value: 'Vakeel Saab' },
                { label: '2022', value: 'Hari Hara Veera Mallu' } 
           ];
    }   
    handleChange(event) {
        this.movie = event.detail.value;
     }

     handleClick(event) {
         this.movie = " ";
     }
     pkUrl = PK_LOGO;
}
