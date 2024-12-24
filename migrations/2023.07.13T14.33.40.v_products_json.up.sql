CREATE OR REPLACE VIEW v_product_media_json AS SELECT
   m.model_id,
   CONCAT(
       '[',
       GROUP_CONCAT(
           JSON_OBJECT(
               'id', id,
               'name', name,
               'file_name', file_name,
               'mime_type', mime_type,
               'collection_name', collection_name,
               'size', m.`size`,
               'disk', disk,
               'custom_properties', custom_properties,
               'generated_conversions', generated_conversions
           )
       ),
       ']'
   ) as 'json'
 FROM media m
 WHERE m.model_type = 'product'
 GROUP BY model_id;

CREATE OR REPLACE VIEW v_products_json AS SELECT
    REGEXP_REPLACE(p.name, '([[:space:]][0-9]{4})$', '') as name,
    CONCAT(
        '[',
        GROUP_CONCAT(
            JSON_OBJECT(
                'id', p.id,
                'media', m.json,
                'properties', vmp.json,
                'taxons', vmt.json,
                'name', p.name,
                'name_ru', p.name_ru,
                'name_en', p.name_en,
                'sku', p.sku,
                'sku2', p.sku2,
                'sku3', p.sku3,
                'slug', p.slug,
                'price', p.price,
                'bpl', p.bpl,
                'rf_price', p.rf_price,
                'brand_price', p.brand_price,
                'factory_price', p.factory_price,
                'dprice', p.dprice,
                'description', p.description,
                'discount', p.discount,
                'color_text', p.color_text,
                'smack_text', p.smack_text,
                'aroma_text', p.aroma_text,
                'food_text', p.food_text,
                'stock', p.stock,
                'in_stock', p.in_stock,
                'is_new', p.is_new,
                'is_hit', p.is_hit,
                'is_quanted', p.is_quanted,
                'reqcounter', p.reqcounter,
                'state', p.state,
                'created_at', UNIX_TIMESTAMP(p.created_at),
                'updated_at', UNIX_TIMESTAMP(p.updated_at),
                'deleted_at', UNIX_TIMESTAMP(p.deleted_at)
            )
        ),
        ']'
    ) as json
  FROM products p
    LEFT JOIN v_product_media_json m ON m.model_id = p.id
    LEFT JOIN v_model_properties_json vmp ON vmp.model_id = p.id
    LEFT JOIN v_model_taxons_json vmt ON vmt.model_id = p.id
  GROUP BY 1;
