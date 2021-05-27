public with sharing class SearchController {
    
    @AuraEnabled
    
    public static List<sObject> search(String objectName, List<string> fields, string searchTerm){
            
        String searchKeyWord = searchTerm + '*';
        String returningQuery = '';
        returningQuery = objectName+' (Id, '+String.join(fields,',')+') ';
        String query = 'FIND :searchKeyWord IN ALL FIELDS RETURNING '+ returningQuery+' LIMIT 20';

        System.debug(' query' + query);
        List<List<sObject>> searchRecords = Search.Query(Query);
        return searchRecords.get(0);
         
    }
}
