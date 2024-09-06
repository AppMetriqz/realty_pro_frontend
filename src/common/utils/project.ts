import { DateTime } from 'luxon';
import { ProjectDto, ProjectSummaryDto } from '../dto';
import { BASE_URL } from '@/config/api/api.config';
import { Countries } from '../constants/countries';

export const getCountry = (code: string) => {
  return (
    Countries.find((country) => country.country_code === code)?.label ?? ''
  );
};

export const mapProjectToProperty = (project: ProjectDto) => {
  return {
    id: project.project_id,
    name: project.name,
    creationDate: DateTime.fromISO(project.created_at).toFormat('dd/LL/yyyy'),
    imageSrc: project.cover_path
      ? `${BASE_URL}/${project.cover_path}`
      : '/images/products/no_image.png',
    type: project.type,
    currency_type: project.currency_type,
    unit_from_price: project.unit_from_price ? project.unit_from_price : '0',
    unit_to_price: project.unit_to_price ? project.unit_to_price : '0',
    address: `${project.sector}, ${project.city}, ${getCountry(
      project.country_code
    )}`,
  };
};

export const mapProjectToCardProperty = (project: ProjectSummaryDto) => {
  return {
    name: project.name,
    imageSrc: project.cover_path
      ? `${BASE_URL}/${project.cover_path}`
      : '/images/products/no_image.png',
    address: `${project.sector}, ${project.city}, ${getCountry(
      project.country_code
    )}`,
    total_unit: project.total_unit,
    total_available_unit: project.total_available_unit,
    total_reserved_unit: project.total_reserved_unit,
    total_sold_unit: project.total_sold_unit,
    type: project.type,
    status: '',
    condition: '',
    unit_from_price: project.unit_from_price ? project.unit_from_price : '0',
    unit_to_price: project.unit_to_price ? project.unit_to_price : '0',
    unit_meters_from: project.unit_meters_from ? project.unit_meters_from : 0,
    unit_meters_to: project.unit_meters_to ? project.unit_meters_to : 0,
    property_features: project.property_features,
    currency_type: project.currency_type,
    country_code: project.country_code,
    description: project.description,
  };
};
