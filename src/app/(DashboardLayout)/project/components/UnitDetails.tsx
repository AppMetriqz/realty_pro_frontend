import React, { FC, ReactElement } from 'react';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import CheckIcon from '@/icons/CheckIcon';
import PropertyCard from '@/app/(DashboardLayout)/components/shared/PropertyCard';
import { TypeOfUnit } from '@/common/constants/unit';
import { CardPropertyType } from '@/common/types/ProjectTypes';
import {
  ButtonShared,
  DeleteButtonShared,
} from '@/common/components/button/ButtonShared';
import { addCommasToAnumber } from '@/common/utils/numericHelpers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getConditionLabel, getUnitStatus } from '@/common/utils/unit';
import { PropertyTypeDto } from '@/common/dto';

type UnitDetailType = {
  deleteLabel?: string;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
  editLabel?: string;
  typeOfUnit: keyof typeof PropertyTypeDto | 'project';
  property: CardPropertyType;
  onClickBack?: () => void;
};

const UnitDetails: FC<UnitDetailType> = ({
  deleteLabel,
  onClickDelete,
  onClickEdit,
  editLabel,
  typeOfUnit,
  property,
  onClickBack,
}) => {
  const houseAndApartment = (
    <>
      <Grid container spacing={'30px'}>
        <Grid item xs={6}>
          <Box display={'flex'}>
            <Typography variant="h4" mr={2}>
              Estatus:
            </Typography>
            <Typography variant="h3">
              {getUnitStatus(property.status ?? '')}&nbsp;
              {property.status === 'sold'
                ? `(${property.client?.first_name ?? ''} ${
                    property.client?.last_name ?? ''
                  })`
                : ''}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display={'flex'}>
            <Typography variant="h4" mr={2}>
              Metros del Terreno:
            </Typography>
            <Typography variant="h3">{property.meters_of_land}mt2</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display={'flex'}>
            <Typography variant="h4" mr={2}>
              Metros de Construcción:
            </Typography>
            <Typography variant="h3">
              {property.meters_of_building}mt2
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display={'flex'}>
            <Typography variant="h4" mr={2}>
              Condición:
            </Typography>
            <Typography variant="h3">
              {getConditionLabel(property.condition ?? '')}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display={'flex'}>
            <Typography variant="h4" mr={2}>
              Nivel:
            </Typography>
            <Typography variant="h3">{property.level}</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display={'flex'}>
            <Typography variant="h4" mr={2}>
              Habitaciones:
            </Typography>
            <Typography variant="h3">{property.rooms}</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display={'flex'}>
            <Typography variant="h4" mr={2}>
              Baños:
            </Typography>
            <Typography variant="h3">{property.bathrooms}</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
  const specificationContent: {
    project: ReactElement;
    plot: ReactElement;
    house: ReactElement;
    apartment: ReactElement;
    commercial: ReactElement;
  } = {
    project: (
      <>
        <Grid container spacing={'30px'}>
          <Grid item xs={3}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                Total:
              </Typography>
              <Typography variant="h3">{property.total_unit}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                Disponible:
              </Typography>
              <Typography variant="h3">
                {property.total_available_unit}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                Reservados:
              </Typography>
              <Typography variant="h3">
                {property.total_reserved_unit}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                Vendidos:
              </Typography>
              <Typography variant="h3">{property.total_sold_unit}</Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                Metraje desde:
              </Typography>
              <Typography variant="h3">
                {addCommasToAnumber(property.unit_meters_from ?? 0)} mts2
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                Metraje Hasta:
              </Typography>
              <Typography variant="h3">
                {addCommasToAnumber(property.unit_meters_to ?? 0)} mts2
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                Moneda:
              </Typography>
              <Typography variant="h3">
                {property.currency_type}$
                {property.currency_type === 'US' ? ' Dolar' : ' Peso'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography mt={4} variant="h3" fontWeight={600}>
          Descripcion:
        </Typography>
        <Divider sx={{ my: '21px', backgroundColor: '#E7E7E7' }} />
        <Grid container spacing={'30px'}>
          <Grid item xs={12}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                {property.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    ),
    plot: (
      <>
        <Grid container spacing={'30px'}>
          <Grid item xs={6}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                Estatus:
              </Typography>
              <Typography variant="h3">
                {getUnitStatus(property.status ?? '')}&nbsp;
                {property.status === 'sold'
                  ? `(${property.client?.first_name ?? ''} ${
                      property.client?.last_name ?? ''
                    })`
                  : ''}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display={'flex'}>
              <Typography variant="h4" mr={2}>
                Precio por metro:
              </Typography>
              <Typography variant="h3">
                {property.currency_type}
                {property.price_per_meter}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    ),
    house: houseAndApartment,
    apartment: houseAndApartment,
    commercial: houseAndApartment,
  };

  return (
    <>
      <Grid item xs={12}>
        {onClickBack ? (
          <Box display="flex" gap={'10px'} mb={2} alignItems={'center'}>
            <IconButton onClick={onClickBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h3" fontWeight={600}>
              Volver
            </Typography>
          </Box>
        ) : null}
      </Grid>
      <Grid item xs={3.5}>
        <Box
          display={'flex'}
          flexDirection="column"
          alignItems="flex-end"
          maxWidth={'349px'}
        >
          <PropertyCard
            hasAction={false}
            property={property}
            typeOfUnit={typeOfUnit}
          />
          <Box
            gap={'17px'}
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
              marginTop: '20px',
            }}
          >
            {deleteLabel ? (
              <DeleteButtonShared onClick={onClickDelete}>
                {deleteLabel}
              </DeleteButtonShared>
            ) : null}
            {editLabel ? (
              <ButtonShared onClick={onClickEdit}>{editLabel}</ButtonShared>
            ) : null}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={7.5}>
        <Typography variant="h3" fontWeight={600}>
          Especificationes
        </Typography>
        <Divider sx={{ my: '21px', backgroundColor: '#E7E7E7' }} />
        {specificationContent[typeOfUnit]}
        <Typography mt={8} variant="h3" fontWeight={600}>
          Caracteristicas del proyecto
        </Typography>
        <Divider sx={{ my: '21px', backgroundColor: '#E7E7E7' }} />
        <Grid container spacing={'30px'}>
          {property.property_features?.map((property) => (
            <Grid item xs={4} key={property.property_feature_id}>
              <Box display={'flex'} alignItems={'center'}>
                <CheckIcon />
                <Typography ml={1} fontSize={'14px'} variant="h3">
                  {property.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default UnitDetails;
