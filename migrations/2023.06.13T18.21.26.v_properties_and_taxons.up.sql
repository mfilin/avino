CREATE OR REPLACE VIEW v_model_taxons AS
  SELECT
    t.id         as 'taxon_id',
    t.title_menu as 'title_menu',
    mt.model_id  as 'model_id',
    t2.slug      as 'taxonomy_slug',
    t2.name      as 'taxonomy_name',
    t.name       as 'taxon_name',
    t.slug       as 'taxon_slug',
    t.parent_id  as 'parent_id'
  FROM model_taxons mt
    LEFT JOIN taxons t ON t.id = mt.taxon_id
    LEFT JOIN taxonomies t2 ON t2.id = t.taxonomy_id;

CREATE OR REPLACE VIEW v_model_properties AS
  SELECT
    mpv.model_id as 'model_id',
    p.slug       as 'slug',
    p.name       as 'slug_name',
    pv.title     as 'value',
    pv.value     as 'value_slug',
    mpv.sorted   as 'sorted'
  FROM model_property_values mpv
    LEFT JOIN property_values pv ON pv.id = mpv.property_value_id
    LEFT JOIN properties p ON p.id = pv.property_id;

CREATE OR REPLACE VIEW v_model_properties_json AS
  SELECT
    v.model_id,
    CONCAT(
        '{',
        GROUP_CONCAT('"', slug, '":', json),
        '}') as 'json'
  FROM (
         SELECT
           v.model_id as 'model_id',
           v.slug     as 'slug',
           CONCAT(
               '[',
               GROUP_CONCAT(
                   '{"value":"', value, '","value_slug":"', value_slug, '","sorted":', sorted, "}"
                   ORDER BY slug
                   SEPARATOR ', '
               ),
               ']'
           )          as 'json'
         FROM v_model_properties v
         GROUP BY v.model_id, v.slug
       ) as v
  GROUP BY v.model_id;

CREATE OR REPLACE VIEW v_model_taxons_json AS
  SELECT
    v.model_id,
    CONCAT(
        '{',
        GROUP_CONCAT(
            CONCAT(
                '"',
                CASE WHEN v.parent_id IS NULL AND taxonomy_slug = 'category'
                  THEN 'root'
                ELSE taxonomy_slug END,
                '": { "value": "',
                CASE WHEN v.parent_id IS NULL AND taxonomy_slug = 'category'
                  THEN title_menu
                ELSE REPLACE(taxon_name, '"', '\\"') END,
                '", "slug": "', taxon_slug, '"}'
            )
        ),
        '}'
    ) as 'json'
  FROM v_model_taxons v
  GROUP BY v.model_id;