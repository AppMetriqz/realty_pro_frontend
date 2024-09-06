import { ColumnProps } from '@/common/components/UI/table/TableShared';
import { GetPaymentPlanDto } from '@/common/dto';
import { DateTime } from 'luxon';
import { Typography } from '@mui/material';
import React from 'react';
import { formatter } from '@/common/constants';
import _ from 'lodash';

export type PaymentPlanDto = Partial<GetPaymentPlanDto> & {
  id: number;
  phone_number_1: string;
  clientName: string;
  sale_type: string;
};

const getPendingPayment = (record: Partial<PaymentPlanDto>) => {
  const payment_amount = _.toNumber(record.payment_amount);
  const amount_paid = _.toNumber(record.amount_paid);
  return formatter.format(payment_amount - amount_paid);
};

export const HeadCellsPaymentPlan: Array<ColumnProps<PaymentPlanDto>> = [
  {
    key: 'payment_plan_detail_id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
    render: (_, record: Partial<PaymentPlanDto>) =>
      record.payment_plan_detail_id ?? 0,
  },
  {
    key: 'clientName',
    numeric: false,
    disablePadding: true,
    label: 'Cliente',
    render: (_, record: Partial<PaymentPlanDto>) => record.clientName ?? '',
  },
  {
    key: 'remaining_time',
    numeric: false,
    disablePadding: true,
    label: 'Dias Restantes',
    render: (_, record: Partial<PaymentPlanDto>) => {
      const remaining_time = record?.remaining_time ?? { days: 0, hours: 0 };
      return (
        <Typography
          fontWeight={
            record.status === 'pending' && remaining_time.days < 0
              ? 'bold'
              : 'normal'
          }
          color={
            record.status === 'pending' && remaining_time.days < 0
              ? 'red'
              : 'black'
          }
        >
          {remaining_time.days} dias y {remaining_time.hours.toFixed(0)} horas
        </Typography>
      );
    },
  },
  {
    key: 'payment_date',
    numeric: false,
    disablePadding: true,
    label: 'Fecha de pago',
    render: (_, record: Partial<PaymentPlanDto>) =>
      record.payment_date
        ? DateTime.fromISO(record.payment_date).toFormat('dd/LL/yyyy')
        : '-',
  },
  {
    key: 'payment_amount',
    numeric: false,
    disablePadding: true,
    label: 'Monto',
    render: (_, record: Partial<PaymentPlanDto>) =>
      (record.project?.currency_type ?? '') + getPendingPayment(record),
  },
  {
    key: 'project',
    numeric: false,
    disablePadding: true,
    label: 'Proyecto',
    render: (_, record: Partial<PaymentPlanDto>) => record.project?.name || '-',
  },
  {
    key: 'unit',
    numeric: false,
    disablePadding: false,
    label: 'Unidad',
    render: (_, record: Partial<PaymentPlanDto>) => record.unit?.name || '-',
  },
  {
    key: 'phone_number_1',
    numeric: false,
    disablePadding: true,
    label: 'Telefono',
    render: (_, record: Partial<PaymentPlanDto>) =>
      record.phone_number_1 || '-',
  },
  {
    key: 'sale_type',
    numeric: false,
    disablePadding: true,
    label: 'Tipo',
    render: (_, record: Partial<PaymentPlanDto>) => record.sale_type || '-',
  },
];

export const HeadCellsPaymentPlanFinancing: Array<ColumnProps<PaymentPlanDto>> =
  [
    {
      key: 'payment_plan_id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
      render: (_, record: Partial<PaymentPlanDto>) =>
        record.payment_plan_id ?? 0,
    },
    {
      key: 'clientName',
      numeric: false,
      disablePadding: true,
      label: 'Cliente',
      render: (_, record: Partial<PaymentPlanDto>) => record.clientName ?? '',
    },
    {
      key: 'remaining_time',
      numeric: false,
      disablePadding: true,
      label: 'Dias Restantes',
      render: (_, record: Partial<PaymentPlanDto>) => {
        const remaining_time = record?.remaining_time ?? { days: 0, hours: 0 };
        return (
          <Typography
            fontWeight={
              record.status === 'pending' && remaining_time.days < 0
                ? 'bold'
                : 'normal'
            }
            color={
              record.status === 'pending' && remaining_time.days < 0
                ? 'red'
                : 'black'
            }
          >
            {remaining_time.days} dias y {remaining_time.hours.toFixed(0)} horas
          </Typography>
        );
      },
    },
    {
      key: 'paid_at',
      numeric: false,
      disablePadding: true,
      label: 'Fecha de pago',
      render: (_, record: Partial<PaymentPlanDto>) =>
        record.paid_at
          ? DateTime.fromISO(record.paid_at).toFormat('dd/LL/yyyy')
          : '-',
    },
    {
      key: 'total_amount_paid',
      numeric: false,
      disablePadding: true,
      label: 'Monto',
      render: (_, record: Partial<PaymentPlanDto>) =>
        (record.project?.currency_type ?? '') +
        formatter.format(record.total_amount_paid ?? 0),
    },
    {
      key: 'project',
      numeric: false,
      disablePadding: true,
      label: 'Proyecto',
      render: (_, record: Partial<PaymentPlanDto>) =>
        record.project?.name || '-',
    },
    {
      key: 'unit',
      numeric: false,
      disablePadding: false,
      label: 'Unidad',
      render: (_, record: Partial<PaymentPlanDto>) => record.unit?.name || '-',
    },
    {
      key: 'phone_number_1',
      numeric: false,
      disablePadding: true,
      label: 'Telefono',
      render: (_, record: Partial<PaymentPlanDto>) =>
        record.phone_number_1 || '-',
    },
    {
      key: 'sale_type',
      numeric: false,
      disablePadding: true,
      label: 'Tipo',
      render: (_, record: Partial<PaymentPlanDto>) => record.sale_type || '-',
    },
  ];
