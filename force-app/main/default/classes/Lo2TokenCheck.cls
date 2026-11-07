public with sharing class Lo2TokenCheck {
  @AuraEnabled(cacheable=true)
  public static Boolean canEmbed() {
    return UserInfo.getUserType() != 'Guest';
  }
}
