@IsTest private class FeatureFlagServiceTest {
  @IsTest static void testFlags() {
    System.assertEquals(true, FeatureFlagService.getFlags('preview').get('complexExprBeta'));
    System.assertEquals(false, FeatureFlagService.getFlags('standard').get('complexExprBeta'));
  }
}
