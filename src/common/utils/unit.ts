import { DateTime } from 'luxon';
import { GetUnitDto } from '../dto';
import { getCountry } from './project';
import { CardPropertyType } from '../types/ProjectTypes';
import { addCommasToAnumber, formatCurrency } from './numericHelpers';
import { UnitCondicionType, UnitStatus } from '../constants';
import { AvailableTableData } from '@/app/(DashboardLayout)/project/components/ProjectAvailable/usePage';

export const mapUnitToProperty = (
  unit: GetUnitDto,
  currency_type?: string
): CardPropertyType => {
  return {
    id: unit.unit_id,
    name: unit.name,
    creationDate: DateTime.fromISO(unit.created_at).toFormat('dd/LL/yyyy'),
    imageSrc: unit.cover_path
      ? unit.cover_path
      : '/images/products/no_image.png',
    type: unit.type,
    price: formatCurrency(parseFloat(unit.price)),
    rooms: unit.rooms ?? undefined,
    bathrooms: unit.bathrooms ?? undefined,
    level: unit.level ?? undefined,
    client: unit.client ?? undefined,
    meters_of_land: unit.meters_of_land,
    price_per_meter: unit.price_per_meter
      ? formatCurrency(parseFloat(unit.price_per_meter))
      : undefined,
    description: unit.description,
    meters: unit.meters_of_building,
    condition: unit.condition,
    status: unit.status,
    meters_of_building: unit.meters_of_building ?? undefined,
    currency_type: currency_type,
    address: `${unit.project.sector}, ${unit.project.city}, ${getCountry(
      unit.project.country_code
    )}`,
    property_features: unit.property_features,
    property_feature_ids: unit.property_feature_ids,
  };
};

export const mapUnitToAvailableTable = (
  availableUnit: GetUnitDto
): AvailableTableData => {
  return {
    id: availableUnit.unit_id,
    name: availableUnit.name,
    meters_of_building: `${addCommasToAnumber(
      parseFloat(availableUnit.meters_of_building ?? '0')
    )} mts2`,
    meters_of_land: `${addCommasToAnumber(
      parseFloat(availableUnit.meters_of_land)
    )} mts2`,
    price: formatCurrency(parseFloat(availableUnit.price)),
    price_per_meter: availableUnit.price_per_meter
      ? formatCurrency(parseFloat(availableUnit.price_per_meter))
      : '',
    condition:
      UnitCondicionType.find((t) => t.value === availableUnit.condition)
        ?.label ?? '',
    status:
      UnitStatus.find((status) => status.value === availableUnit.status)
        ?.label ?? '',
    actions: availableUnit.unit_id,
  };
};

export const getConditionLabel = (conditionValue: string) =>
  UnitCondicionType.find((condition) => condition.value === conditionValue)
    ?.label ?? '';

export const getUnitStatus = (statusValue: string) =>
  UnitStatus.find((status) => status.value === statusValue)?.label ?? '';
