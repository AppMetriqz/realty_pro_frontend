import { DateTime } from 'luxon';
import { GetSellDto, GetUnitDto } from '../dto';
import { BASE_URL } from '@/config/api/api.config';
import { getCountry } from './project';
import { CardPropertyType } from '../types/ProjectTypes';
import { addCommasToAnumber, formatCurrency } from './numericHelpers';
import { SaleStages, UnitCondicionType, UnitStatus } from '../constants';
import { SellTableData } from '@/app/(DashboardLayout)/project/components/ProjectSells/ProjectSells';
import { AvailableTableData } from '@/app/(DashboardLayout)/project/components/ProjectAvailable/usePage';

export const mapUnitToProperty = (
  unit: GetUnitDto,
  currency_type?: string
): CardPropertyType => {
  return {
    id: unit.unit_id,
    name: unit.name,
    creationDate: DateTime.fromISO(unit.created_at).toLocaleString(),
    imageSrc: unit.cover_path
      ? `${BASE_URL}/${unit.cover_path}`
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

export const mapSellToSellTable = (sell: GetSellDto): SellTableData => {
  return {
    id: sell.sale_id,
    unitName: sell.unit.name,
    client: `${sell.client.first_name} ${sell.client.last_name}`,
    price: formatCurrency(parseFloat(sell.price) || 0),
    creationDate: DateTime.fromISO(sell.created_at).toLocaleString(),
    stage: SaleStages.find((stage) => stage.value === sell.stage)?.label ?? '',
    actions: sell.unit.unit_id,
  };
};

export const getConditionLabel = (conditionValue: string) =>
  UnitCondicionType.find((condition) => condition.value === conditionValue)
    ?.label ?? '';

export const getUnitStatus = (statusValue: string) =>
  UnitStatus.find((status) => status.value === statusValue)?.label ?? '';
