import { LanguagesResponse } from '@/modules/languages/interfaces/response-language.interface';
import { Translation } from '@/modules/languages/interfaces/translation.interface';

export interface WorkingHourResponse {
  day: string;
  open_time: string;
  close_time: string;
  is_open: boolean;
}

export interface SocialResponse {
  platform: string;
  url: string;
}

export interface RestaurantResponse {
  id: number;
  logo: string;
  created_at: Date;
  color_palette_id: number;
  languages: LanguagesResponse[];
  translations: Translation[];
  workingHours: WorkingHourResponse[];
  socials: SocialResponse[];
}
