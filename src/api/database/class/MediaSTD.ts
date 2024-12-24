import { IProductMedia } from '../../../types/portal/server';

export class MediaSTD {
  id: number;
  model_type: string;
  model_id: number;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  size: number;
  manipulations: string;
  custom_properties: string;
  responsive_images: string;
  order_column: number;
  created_at: string;
  updated_at: string;
  uuid: string;
  conversions_disk: string;
  generated_conversions: string;

  constructor(json: IProductMedia) {
    this.id = json.id;
    this.disk = json.disk;
    this.name = json.name;
    this.size = json.size;
    this.file_name = json.file_name;
    this.mime_type = json.mime_type;
    this.collection_name = json.collection_name;
    this.custom_properties = json.custom_properties;
    this.generated_conversions = json.generated_conversions;
  }
}
