const DB = require('/opt/nodejs/test-sql-access.js')
const Point = require('/opt/nodejs/models/point.js')
DECLARE  @Geojson = ('@/src/assets/mapData/resturants.geojson')
importData(){

  await DB.connect()
  IMPORT INTO DB.point (mapId, name, description, visible, img, properties, layer_id)
  SELECT

  FROM (

    OPENJSON(@GEOJSON,'$.features')

      WITH(

        mapId  unsigned int(10) '$.mapID',
        name  varchar(225) '$.name',
        description varchar(2048) '$.description',
        img int() 'NULL',
        properties varchar(225) 'NULL',
        visible bit() '1',
        layer_id unsigned int(10) '1',
        osmType varchar(16) 'NULL'

        )
      );
}
