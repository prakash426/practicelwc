public with sharing class KnowledgeSearchController {
  public class ArticleHit {
    @AuraEnabled public Id recordId;
    @AuraEnabled public String title;
    @AuraEnabled public String summary;
    public ArticleHit(Id r, String t, String s) {
      recordId = r;
      title = t;
      summary = s;
    }
  }

  @AuraEnabled(cacheable=true)
  public static List<ArticleHit> search(String term) {
    if (String.isBlank(term) || term.length() < 2) {
      return new List<ArticleHit>();
    }
    String sosl = 'FIND :term IN ALL FIELDS RETURNING Knowledge__kav(Id, Title, Summary WHERE PublishStatus = \'Online\' WITH USER_MODE) LIMIT 10';
    List<List<SObject>> found = Search.query(sosl);
    List<ArticleHit> hits = new List<ArticleHit>();
    for (SObject so : found[0]) {
      hits.add(
        new ArticleHit(
          (Id) so.get('Id'),
          (String) so.get('Title'),
          (String) so.get('Summary')
        )
      );
    }
    return hits;
  }
}
