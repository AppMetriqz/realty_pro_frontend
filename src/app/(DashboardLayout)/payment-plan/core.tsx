import {ColumnProps} from "@/common/components/UI/table/TableShared";
import {GetPaymentPlanDto} from "@/common/dto";
import {DateTime} from "luxon";
import { Typography} from "@mui/material";
import React from "react";

export type PaymentPlanDto= GetPaymentPlanDto & { id: number, phone_number_1:string, sale_type:string }

export const HeadCellsPaymentPlan: Array<ColumnProps<Partial<PaymentPlanDto>>> = [
    {
        key: 'payment_plan_detail_id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
        render: (_, record: Partial<PaymentPlanDto>) => record.payment_plan_detail_id??0,
    },
    {
        key: 'remaining_time',
        numeric: false,
        disablePadding: true,
        label: 'Dias Restantes',
        render: (_, record: Partial<PaymentPlanDto>) => {
            const remaining_time = record?.remaining_time ?? {days:0, hours:0}
            return (
                <Typography
                    fontWeight={record.status ==='pending' && remaining_time.days < 0?'bold':'normal'}
                    color={record.status ==='pending' && remaining_time.days < 0? 'red' : 'black'}>
                    {remaining_time.days} dias y {remaining_time.hours.toFixed(0)} horas
                </Typography>
            )
        }
    },
    {
        key: 'payment_date',
        numeric: false,
        disablePadding: true,
        label: 'Fecha de pago',
        render: (_, record: Partial<PaymentPlanDto>) =>
            DateTime.fromISO(record.payment_date??"").toLocaleString(),
    },
    {
        key: 'payment_amount',
        numeric: false,
        disablePadding: true,
        label: 'Monto',
        render: (_, record: Partial<PaymentPlanDto>) => record.payment_amount??0,
    },
    {
        key: 'project',
        numeric: false,
        disablePadding: true,
        label: 'Proyecto',
        render: (_, record: Partial<PaymentPlanDto>) => record.project?.name || '',
    },
    {
        key: 'unit',
        numeric: false,
        disablePadding: false,
        label: 'Unidad',
        render: (_, record: Partial<PaymentPlanDto>) => record.unit?.name || '',
    },
    {
        key: 'phone_number_1',
        numeric: false,
        disablePadding: true,
        label: 'Telefono',
        render: (_, record: Partial<PaymentPlanDto>) => record.phone_number_1 || "",
    },
    {
        key: 'sale_type',
        numeric: false,
        disablePadding: true,
        label: 'Tipo',
        render: (_, record: Partial<PaymentPlanDto>) => record.sale_type || "",
    },
];
