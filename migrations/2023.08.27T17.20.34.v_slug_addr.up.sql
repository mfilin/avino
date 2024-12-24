CREATE OR REPLACE VIEW v_taxons_parent_tree AS
  WITH RECURSIVE taxons_tree AS (
    SELECT
      t.id,
      t.id    as nextid,
      parent_id,
      t2.slug as taxomony,
      t.slug
    FROM taxons t
      LEFT JOIN taxonomies t2 ON t2.id = t.taxonomy_id
    UNION ALL
    SELECT
      tt.id,
      t.id    as nextid,
      t.parent_id,
      t2.slug as taxonomy,
      t.slug
    FROM taxons t
      LEFT JOIN taxonomies t2 ON t2.id = t.taxonomy_id
      JOIN taxons_tree AS tt ON tt.parent_id = t.id
  )
  SELECT
    tt.id,
    CONCAT('[',
           GROUP_CONCAT(
               JSON_OBJECT(
                   "addr", CONCAT("taxons.", tt.taxomony),
                   "slug", tt.slug
               )
           ),
           ']') as parent
  FROM taxons_tree tt
  GROUP BY tt.id;

CREATE OR REPLACE VIEW v_taxons_tree AS
  SELECT
    t1.parent_id  as id,
    t.slug        as slug,
    t.name        as name,
    t2.slug       as taxonomy,
    t1.ids        as ids,
    t1.slugs      as child_slugs,
    t1.names      as child_names,
    t1.taxonomies as child_taxonomies
  FROM
    (
      SELECT
        t.parent_id,
        CONCAT('[', GROUP_CONCAT(t.id), ']')                      as ids,
        CONCAT('["', GROUP_CONCAT(t.slug SEPARATOR '","'), '"]')  as slugs,
        CONCAT('["', GROUP_CONCAT(t.name SEPARATOR '","'), '"]')  as names,
        CONCAT('["', GROUP_CONCAT(t2.slug SEPARATOR '","'), '"]') as taxonomies
      FROM taxons t
        LEFT JOIN taxonomies t2 ON t2.id = t.taxonomy_id
      WHERE t.slug > ''
      GROUP BY t.parent_id
    ) as t1
    INNER JOIN taxons t on t1.parent_id = t.id
    LEFT JOIN taxonomies t2 ON t2.id = t.taxonomy_id
  ORDER BY t1.parent_id, t.parent_id;


CREATE OR REPLACE VIEW v_slug_addr AS
  SELECT
    t.slug                                                         as slug,
    CONCAT('[', GROUP_CONCAT('"', t.addr, '"' SEPARATOR ','), ']') as addr
  FROM (
         SELECT
           slug,
           addr
         FROM
           (SELECT
              t.slug                as slug,
              CONCAT(
                  'taxons.',
                  CASE WHEN t.parent_id IS NULL AND t2.slug = 'category'
                    THEN 'root'
                  ELSE t2.slug END) as addr
            FROM taxons t
              LEFT JOIN taxonomies t2 ON t2.id = t.taxonomy_id
            WHERE t.slug > '') as t1
         UNION ALL
         SELECT
           slug,
           addr
         FROM (SELECT
                 pv.value                      as slug,
                 CONCAT('properties.', p.slug) as addr
               FROM
                 property_values pv
                 LEFT JOIN properties p ON p.id = pv.property_id
               WHERE
                 pv.value > '') as t
         UNION ALL
         SELECT
           slug,
           addr
         FROM (SELECT
                 p.slug                   as slug,
                 CONCAT('product.', p.id) as addr
               FROM products p
               WHERE p.slug > '') as t
       ) as t
  GROUP BY t.slug