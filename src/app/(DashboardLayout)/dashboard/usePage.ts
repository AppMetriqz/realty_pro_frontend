import React, { Dispatch, SetStateAction, useState } from 'react';
import { apiContacts, apiDesktop, apiSales } from '@/api';
import {
  CalendarEnumDto,
  GoogleCalendarDto,
  PaymentPlansToAssignDto,
  SalesToAssignDto,
} from '@/api/desktop';
import { UseQueryResult } from '@tanstack/react-query';
import { LineOptions } from '@/app/(DashboardLayout)/components/chart/chartsOptions';
import _ from 'lodash';
import { DateTime, Settings } from 'luxon';
import { SelectChangeEvent } from '@mui/material/Select';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { SellFormType } from '@/common/types/SellTypes';
import { useYupValidationResolver } from '@/common/utils/formHook';
import {
  createPaymentPlanDefaultValues,
  createPaymentPlanValidationSchema,
  CreateUpdatePaymentPlanType,
  sellFormDefaultValues,
  sellValidationSchema,
} from './core';
import { ExceptionCatchResponse } from '@/common/exceptions';
import { toast } from 'react-toastify';
import {
  CreatePaymentPlanDto,
  GetContactDto,
  GetSellDto,
  PaymentPlanToAssignDto,
} from '@/common/dto';
import { apiPaymentPlans } from '@/api/payment-plans';
import { formatCurrency } from '@/common/utils/numericHelpers';


export interface UsePageProps {
  times: keyof typeof CalendarEnumDto;
  handleChangeTimes: (e: SelectChangeEvent) => void;
  handleGoogleCalendarLogin: () => void;
  setSalesToAssignPageIndex: Dispatch<SetStateAction<number>>;
  setPaymentPlansToAssignPageIndex: Dispatch<SetStateAction<number>>;
  googleCalendar: UseQueryResult<GoogleCalendarDto, Error>;
  salesToAssign: UseQueryResult<SalesToAssignDto, Error>;
  paymentPlansToAssign: UseQueryResult<PaymentPlansToAssignDto, Error>;
  isGoogleCalendarLogin: boolean;
  isLoadingCalendar: boolean;
  lineOptions: any;
  salesToAssignPageIndex: number;
  salesToAssignPageSize: { value: number; label: string };
  paymentPlansToAssignPageIndex: number;
  openSellModal: boolean;
  paymentPlansToAssignPageSize: { value: number; label: string };
  onSubmitSell: SubmitHandler<SellFormType>;
  onCloseSellModal: () => void;
  onClickAssignSell: (sale: Partial<GetSellDto> & { id: number }) => void;
  sellHookForm: UseFormReturn<SellFormType>;
  sellerAutocompleteContacts: UseQueryResult<GetContactDto[], Error>;
  setClientDescription: Dispatch<SetStateAction<string>>;
  setSellerDescription: Dispatch<SetStateAction<string>>;
  clientAutocompleteContacts: UseQueryResult<GetContactDto[], Error>;
  openCreatePaymentPlanModal: boolean;
  onCloseCreatePaymentPlanModal: () => void;
  paymentPlanHookForm: UseFormReturn<
    CreateUpdatePaymentPlanType,
    any,
    undefined
  >;
  onClickPaymentPlan: (
    paymentPlan: Partial<PaymentPlanToAssignDto> & { id: number }
  ) => void;
  onSubmitPaymentPlan: SubmitHandler<CreateUpdatePaymentPlanType>;
  selectedPaymentToAssign:
    | (Partial<PaymentPlanToAssignDto> & { id: number })
    | null;
  changeSaleToAssignPageSize: (size: number) => void;
  changePaymentPlansToAssignPageSize: (size: number) => void;
}

export default function usePage(): UsePageProps {
  const [openSellModal, setOpenSellModal] = useState(false);
  const [openCreatePaymentPlanModal, setOpenCreatePaymentPlanModal] =
    useState(false);
  const [selectedUnitToAssign, setSelectedUnitToAssign] = useState<
    (Partial<GetSellDto> & { id: number }) | null
  >(null);
  const [selectedPaymentToAssign, setSelectedPaymentToAssign] = useState<
    (Partial<PaymentPlanToAssignDto> & { id: number }) | null
  >(null);
  const [times, setTimes] = useState<keyof typeof CalendarEnumDto>('today');

  const [salesToAssignPageIndex, setSalesToAssignPageIndex] =
    useState<number>(0);
  const [salesToAssignPageSize, setSalesToAssignPageSize] = useState({
    label: '50',
    value: 50,
  });

  const [paymentPlansToAssignPageIndex, setPaymentPlansToAssignPageIndex] =
    useState<number>(0);
  const [paymentPlansToAssignPageSize, setPaymentPlansToAssignPageSize] =
    useState({ label: '50', value: 50 });

  const [isGoogleCalendarLogin, setIsGoogleCalendarLogin] =
    useState<boolean>(false);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState<boolean>(true);
  const [lineOptions, setLineOptions] = useState<any>(LineOptions);
  const [sellerDescription, setSellerDescription] = useState('');
  const [clientDescription, setClientDescription] = useState('');

  const googleCalendarLogin = apiDesktop.useGoogleCalendarLogin();
  const googleCalendar = apiDesktop.useGoogleCalendar({ times: times });
  const sale = apiDesktop.useSale();
  const sellResolver = useYupValidationResolver(sellValidationSchema);
  const paymentPlanResolver = useYupValidationResolver(
    createPaymentPlanValidationSchema
  );

  const sellerAutocompleteContacts = apiContacts.useFindAllAutocomplete({
    description: sellerDescription,
  });
  const clientAutocompleteContacts = apiContacts.useFindAllAutocomplete({
    description: clientDescription,
  });
  const sellHookForm = useForm<SellFormType>({
    resolver: sellResolver,
    defaultValues: sellFormDefaultValues,
  });
  const paymentPlanHookForm = useForm<CreateUpdatePaymentPlanType>({
    resolver: paymentPlanResolver,
    defaultValues: createPaymentPlanDefaultValues,
  });

  const salesToAssign = apiDesktop.useSalesToAssign({
    pageIndex: salesToAssignPageIndex,
    pageSize:
      salesToAssignPageSize.value === -1 ? 100000 : salesToAssignPageSize.value,
  });
  const paymentPlansToAssign = apiDesktop.usePaymentPlansToAssign({
    pageIndex: paymentPlansToAssignPageIndex,
    pageSize:
      paymentPlansToAssignPageSize.value === -1
        ? 100000
        : paymentPlansToAssignPageSize.value,
  });

  const assignSale = apiSales.useUpdate();
  const createPaymentPlan = apiPaymentPlans.useCreate();

  React.useEffect(() => {
    (async () => {
      if (googleCalendar.isSuccess) {
        setIsGoogleCalendarLogin(!googleCalendar.data.isNeedLogin);
        setIsLoadingCalendar(false);
      }
      console.log("v0.1.6")
    })();
  }, [googleCalendar.isSuccess, googleCalendar.data]);

  React.useEffect(() => {
    if (sale.isSuccess) {
      const lineData = sale.data;
      const seriesLine = [
        {
          showInLegend: false,
          data: _.map(lineData, 'total'),
        },
      ];
      const xAxisLine = {
        categories: _.map(lineData, (item) => {
          const monthName = DateTime.fromObject({ month: item.month }).toFormat(
            'LLLL', {locale:'es'}
          );
          return `${monthName} ${item.year}`;
        }),
      };
      setLineOptions((prevState: any) => ({
        ...prevState,
        series: seriesLine,
        xAxis: xAxisLine,
      }));
    }
  }, [sale.isSuccess, sale.data]);

  const onCloseSellModal = () => {
    setSelectedUnitToAssign(null);
    setOpenSellModal(false);
    sellHookForm.reset();
  };

  const handleChangeTimes = (event: SelectChangeEvent) => {
    const value = event.target.value as keyof typeof CalendarEnumDto;
    setIsLoadingCalendar(true);
    setTimes(value);
  };

  const handleGoogleCalendarLogin = async () => {
    setIsLoadingCalendar(true);
    const result = await googleCalendarLogin.mutateAsync();
    window.open(result, '_blank');
    setIsLoadingCalendar(false);
  };

  const onSubmitSell: SubmitHandler<SellFormType> = async (data) => {
    try {
      let sale_values = {
        project_id: selectedUnitToAssign?.project?.project_id,
        sale_id: selectedUnitToAssign?.sale_id,
        unit_id: selectedUnitToAssign?.unit?.unit_id,
        client_id: data.client_id ? parseInt(data.client_id) : undefined,
        seller_id: parseInt(data.seller_id),
        commission: data.commission / 100,
        notes: data.notes,
      };

      const sale = await assignSale.mutateAsync(sale_values);
      if (!!sale) {
        toast.success(`Venta asignada.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        sellHookForm.reset();
        setOpenSellModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onClickAssignSell = (sale: Partial<GetSellDto> & { id: number }) => {
    if (sale.commission)
      sellHookForm.setValue('commission', sale.commission * 100);
    if (sale.notes) sellHookForm.setValue('notes', sale.notes);
    if (sale.client) {
      sellHookForm.setValue('client_id', sale.client.contact_id.toString());
      sellHookForm.setValue('client', {
        ...sale.client,
        client_id: sale.client?.contact_id,
      });
    }
    if (sale.seller) {
      sellHookForm.setValue('seller_id', sale.seller.contact_id.toString());
      sellHookForm.setValue('seller', {
        ...sale.seller,
        seller_id: sale.seller?.contact_id,
      });
    }
    setSelectedUnitToAssign(sale);
    setOpenSellModal(true);
  };

  const onClickPaymentPlan = (
    paymentPlan: Partial<PaymentPlanToAssignDto> & { id: number }
  ) => {
    if (paymentPlan.price)
      paymentPlanHookForm.setValue(
        'total_amount',
        formatCurrency(parseFloat(paymentPlan.price))
      );
    if (paymentPlan.sale_id)
      paymentPlanHookForm.setValue('sale_id', paymentPlan.sale_id);
    setSelectedPaymentToAssign(paymentPlan);
    setOpenCreatePaymentPlanModal(true);
  };

  const onCloseCreatePaymentPlanModal = () => {
    setSelectedPaymentToAssign(null);
    setOpenCreatePaymentPlanModal(false);
    paymentPlanHookForm.reset();
  };

  const onSubmitPaymentPlan: SubmitHandler<
    CreateUpdatePaymentPlanType
  > = async (data) => {
    try {
      let sale_values: CreatePaymentPlanDto = {
        sale_id: data.sale_id,
        separation_amount: parseFloat(
          data.separation_amount
            ? data.separation_amount.replaceAll(/[$,]/gi, '')
            : '0'
        ),
        separation_date: data.separation_date,
        payment_plan_numbers: data.payment_plan_numbers,
        separation_rate: data.separation_rate / 100,
        is_resale: data.is_resale,
      };

      if (data.is_resale) {
        sale_values.total_amount = data.total_amount
          ? parseFloat(data.total_amount)
          : undefined;
        sale_values.client_id = data.client_id
          ? parseInt(data.client_id)
          : undefined;
      }

      const sale = await createPaymentPlan.mutateAsync(sale_values);
      if (!!sale) {
        toast.success(`Plan de pago creado.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        paymentPlanHookForm.reset();
        setOpenCreatePaymentPlanModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const changeSaleToAssignPageSize = (size: number) => {
    setSalesToAssignPageSize({
      value: size,
      label: size === -1 ? 'Todos' : size.toString(),
    });
  };

  const changePaymentPlansToAssignPageSize = (size: number) => {
    setPaymentPlansToAssignPageSize({
      value: size,
      label: size === -1 ? 'Todos' : size.toString(),
    });
  };

  return {
    handleChangeTimes,
    times,
    isGoogleCalendarLogin,
    isLoadingCalendar,
    setSalesToAssignPageIndex,
    setPaymentPlansToAssignPageIndex,
    salesToAssignPageSize,
    paymentPlansToAssignPageSize,
    salesToAssignPageIndex,
    paymentPlansToAssignPageIndex,
    handleGoogleCalendarLogin,
    googleCalendar,
    salesToAssign,
    paymentPlansToAssign,
    lineOptions,
    openSellModal,
    onCloseSellModal,
    onSubmitSell,
    onClickAssignSell,
    sellHookForm,
    sellerAutocompleteContacts,
    setClientDescription,
    setSellerDescription,
    clientAutocompleteContacts,
    openCreatePaymentPlanModal,
    onCloseCreatePaymentPlanModal,
    paymentPlanHookForm,
    onClickPaymentPlan,
    onSubmitPaymentPlan,
    selectedPaymentToAssign,
    changeSaleToAssignPageSize,
    changePaymentPlansToAssignPageSize,
  };
}
