import {ColumnProps} from "@/common/components/table/TableShared";
import MenuShared from "@/common/components/menu/MenuShared";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {GetSellDto, GetUnitDto} from "@/common/dto";
import {formatCurrency} from "@/common/utils/numericHelpers";
import {DateTime} from "luxon";
import {PaymentPlansToAssignFindAllDto} from "@/api/desktop";

export interface SalesToAssignDto {
    id: string | number;
    project: string;
    unit: string;
    price: string;
    date: string;
    actions: string | number;
}


export const HeadCellsSalesToAssign: Array<ColumnProps<SalesToAssignDto>> = [
    {
        key: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        key: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Fecha',
    },
    {
        key: 'project',
        numeric: false,
        disablePadding: true,
        label: 'Proyecto',
    },
    {
        key: 'unit',
        numeric: false,
        disablePadding: false,
        label: 'Unidad',
    },
    {
        key: 'price',
        numeric: false,
        disablePadding: false,
        label: 'Monto',
    },
    {
        key: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'Acciones',
        render: (_, record: SalesToAssignDto) => (
            <div>
                <MenuShared
                    actions={[
                        {
                            id: record.id,
                            icon: <VisibilityIcon fontSize="small" />,
                            label: 'Asignar cliente',
                            onClick: () => {},
                        },
                        {
                            id: record.id,
                            icon: <DeleteIcon fontSize="small" />,
                            label: 'Borrar unidad',
                            onClick: () => {},
                        },
                    ]}
                />
            </div>
        ),
    },
];

export const mapSalesToAssignTable = (unit: GetUnitDto): SalesToAssignDto => {
    return {
        id: unit.unit_id,
        unit: unit.name,
        project: unit.project.name,
        price: formatCurrency(parseFloat(unit.price)),
        date: DateTime.fromISO(unit.created_at).toLocaleString(),
        actions: unit.unit_id,
    };
};


export interface PaymentPlansToAssignDto {
    id: string | number;
    project: string;
    unit: string;
    client: string;
    date: string;
    actions: string | number;
}

export const HeadCellsPaymentPlansToAssign: Array<ColumnProps<PaymentPlansToAssignDto>> = [
    {
        key: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        key: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Fecha',
    },
    {
        key: 'project',
        numeric: false,
        disablePadding: true,
        label: 'Proyecto',
    },
    {
        key: 'unit',
        numeric: false,
        disablePadding: false,
        label: 'Unidad',
    },
    {
        key: 'client',
        numeric: false,
        disablePadding: false,
        label: 'Cliente',
    },
    {
        key: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'Acciones',
        render: (_, record: PaymentPlansToAssignDto) => (
            <div>
                <MenuShared
                    actions={[
                        {
                            id: record.id,
                            icon: <VisibilityIcon fontSize="small" />,
                            label: 'Asignar Plan de Pago',
                            onClick: () => {},
                        },
                        {
                            id: record.id,
                            icon: <DeleteIcon fontSize="small" />,
                            label: 'Cancelar venta',
                            onClick: () => {},
                        },
                    ]}
                />
            </div>
        ),
    },
];

export const mapPaymentPlansToAssignTable = (sale: PaymentPlansToAssignFindAllDto): PaymentPlansToAssignDto => {
    return {
        id: sale.sale_id,
        project: sale.project.name,
        unit: sale.unit.name,
        client: `${sale.client.first_name} ${sale.client.last_name}`,
        date: DateTime.fromISO(sale.created_at).toLocaleString(),
        actions: sale.sale_id,
    };
};
