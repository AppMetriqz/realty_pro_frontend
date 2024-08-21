import React, { FC } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import LocationIcon from '@/icons/LocationIcon';
import { useRouter } from 'next/navigation';
import routers from '@/common/constants/routes';
import { TypeOfUnit } from '@/common/constants/unit';
import { CardPropertyType } from '@/common/types/ProjectTypes';
import { PropertyType } from '@/common/constants';
import { formatCurrency } from '@/common/utils/numericHelpers';

type PropertyCardProps = {
  hasAction?: boolean;
  property: CardPropertyType;
  typeOfUnit: TypeOfUnit;
};

const PropertyCard: FC<PropertyCardProps> = ({
  hasAction = true,
  property,
  typeOfUnit,
}) => {
  const router = useRouter();
  const otherAndLandComponent = (
    <>
      <Box my={'12px'} display={'flex'}>
        <Typography variant="h4" mr={2}>
          Precio
        </Typography>
        <Typography variant="h3">
          {property.currency_type}
          {property.price}
        </Typography>
      </Box>
      <Box display={'flex'}>
        <Typography variant="h4" mr={2}>
          Metraje
        </Typography>
        <Typography variant="h3">{property.meters_of_land} mts2</Typography>
      </Box>
      <Box mt={'22px'} display={'flex'}>
        <LocationIcon />
        <Typography variant="h4" ml={2}>
          {property.address}
        </Typography>
      </Box>
    </>
  );
  const cardContent = {
    project: (
      <>
        <Box my={'12px'} display={'flex'}>
          <Typography variant="h4" mr={2}>
            Desde
          </Typography>
          <Typography variant="h3">
            {property.currency_type}
            {property.unit_from_price
              ? formatCurrency(parseFloat(property.unit_from_price))
              : ''}
          </Typography>
        </Box>
        <Box display={'flex'}>
          <Typography variant="h4" mr={2}>
            Hasta
          </Typography>
          <Typography variant="h3">
            {property.currency_type}
            {property.unit_to_price
              ? formatCurrency(parseFloat(property.unit_to_price))
              : ''}
          </Typography>
        </Box>
        <Box mt={'22px'} display={'flex'}>
          <LocationIcon />
          <Typography variant="h4" ml={2}>
            {property.address}
          </Typography>
        </Box>
        {property.creationDate ? (
          <Typography mt={'22px'} fontStyle={'italic'} variant="h5">
            Fecha de Creacion: {property.creationDate}
          </Typography>
        ) : null}
      </>
    ),
    plot: otherAndLandComponent,
    house: otherAndLandComponent,
    apartment: otherAndLandComponent,
  };
  return (
    <Card
      sx={{
        width: '100%',
        boxShadow: '0px 1px 4px 0px #E7E7E7',
        height: '100%',
      }}
    >
      {hasAction ? (
        <CardActionArea
          onClick={() => router.push(`${routers.project}/${property.id}`)}
        >
          <CardMedia
            sx={{ objectFit: 'contain', height: '100%' }}
            height="196"
            component="img"
            image={property.imageSrc}
            alt={property.name}
          />
        </CardActionArea>
      ) : (
        <CardMedia
          sx={{ objectFit: 'contain', height: '100%' }}
          component="img"
          height="196"
          image={property.imageSrc}
          alt={property.name}
        />
      )}
      <CardContent>
        <Box
          sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}
        >
          <Typography variant="h2">{property.name}</Typography>
          <Chip
            sx={{ fontWeight: 600 }}
            label={
              PropertyType.find((p) => p.value === property.type)?.label ??
              'N/A'
            }
          />
        </Box>
        {cardContent[typeOfUnit]}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
