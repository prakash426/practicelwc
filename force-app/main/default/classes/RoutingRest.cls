@RestResource(urlMapping='/route/*')
global with sharing class RoutingRest {
  @HttpPost
  global static void post() {
    Map<String, Object> body = (Map<String, Object>) JSON.deserializeUntyped(RestContext.request.requestBody.toString());
    RoutingService.routeCase((Id) body.get('caseId'), String.valueOf(body.get('skill')));
  }
}
