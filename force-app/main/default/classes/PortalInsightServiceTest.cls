@IsTest private class PortalInsightServiceTest {
  @IsTest static void testTiles() {
    insert as user new Case(Subject = 'x', Status = 'New');
    List<PortalInsightService.Tile> tiles = PortalInsightService.getInsights();
    System.assertEquals(1, tiles.size());
    System.assertEquals(1, tiles[0].value);
  }
}
