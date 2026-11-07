public with sharing class FeatureFlagService {
  @AuraEnabled(cacheable=true)
  public static Map<String, Boolean> getFlags(String channel) {
    return new Map<String, Boolean>{ 'complexExprBeta' => channel == 'preview', 'stateMgmtGA' => true };
  }
}
