trigger covidTrigger on Candidate__c (before insert, before update) {
    
    for(Candidate__c cand : Trigger.new){
        if (cand.SARS_CoV_2__c == 'Detected'){
            cand.COVID_Positive__c = TRUE;
        }
    }
}
